// Vercel Serverless Function — GitHub OAuth for Decap CMS
// Deployed at https://asdjklqwe123-github-io.vercel.app/api/auth

export default async function handler(req, res) {
  const { code } = req.query

  if (!code) {
    // Step 1: Redirect to GitHub for authorization
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=Ov23liIU4mZkrYxw3cr8&scope=repo,user`
    res.writeHead(302, { Location: redirectUrl })
    return res.end()
  }

  try {
    // Step 2: Exchange code for access token
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
      res.status(400).json(data)
      return
    }

    // Step 3: Return token to Decap CMS via postMessage
    const html = `<!doctype html><html><body><script>
      window.opener.postMessage(
        { token: "${data.access_token}", provider: "github" },
        "*"
      );
    </script></body></html>`

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
