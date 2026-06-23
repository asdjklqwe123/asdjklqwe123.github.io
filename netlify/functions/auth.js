// Netlify Function — GitHub OAuth 回调
// 部署到: https://chenlmj128.netlify.app/.netlify/functions/auth
//
// 需要在 Netlify 环境变量中设置:
//   GITHUB_CLIENT_ID     — GitHub OAuth App 的 Client ID
//   GITHUB_CLIENT_SECRET — GitHub OAuth App 的 Client Secret

exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {}

  // 没有 code → 第一步：重定向到 GitHub 授权页
  if (!code) {
    const clientId = process.env.GITHUB_CLIENT_ID
    const scope = event.queryStringParameters?.scope || 'repo,user'
    const redirectUri = 'https://chenlmj128.netlify.app/.netlify/functions/auth'

    const authUrl = 'https://github.com/login/oauth/authorize?' +
      `client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`

    return {
      statusCode: 302,
      headers: { Location: authUrl }
    }
  }

  // 有 code → 第二步：用 code 换 token
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      })
    })

    const data = await response.json()

    if (data.error) {
      return {
        statusCode: 400,
        body: `OAuth Error: ${data.error_description || data.error}`
      }
    }

    // 返回 postMessage HTML，将 token 传回 Decap CMS
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<!DOCTYPE html>
<html><body><script>
(function() {
  if (window.opener) {
    window.opener.postMessage(
      { token: "${data.access_token}", provider: "github" },
      "*"
    );
  }
  // 也通过 localStorage 备用
  try {
    localStorage.setItem('decap-cms-github-token', '${data.access_token}');
  } catch(e) {}
  document.body.innerHTML = '<p style="text-align:center;padding-top:50px;font-family:sans-serif;">✅ 授权成功！正在返回编辑器...</p>';
})();
</script></body></html>`
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: `Server Error: ${error.message}`
    }
  }
}
