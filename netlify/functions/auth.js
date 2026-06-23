// Netlify Function - GitHub OAuth handler for Decap CMS
// Deployed at https://chenlmj.netlify.app/.netlify/functions/auth

exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {}

  if (!code) {
    return {
      statusCode: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?client_id=Ov23liIU4mZkrYxw3cr8&scope=repo,user`
      }
    }
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: 'Ov23liIU4mZkrYxw3cr8',
        client_secret: '27444f9c59784ef1f80fbafb508c5cd95c9fa4af',
        code
      })
    })

    const data = await response.json()

    if (data.error) {
      return { statusCode: 400, body: JSON.stringify(data) }
    }

    // Post message to opener window (Decap CMS callback)
    const html = `<!doctype html><html><body><script>
      window.opener.postMessage(
        { token: "${data.access_token}", provider: "github" },
        "https://asdjklqwe123.github.io"
      );
      window.close();
    </script></body></html>`

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
