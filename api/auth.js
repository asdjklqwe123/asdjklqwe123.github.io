// Vercel Function — GitHub OAuth for Decap CMS
module.exports = async (req, res) => {
  const code = req.query.code

  if (!code) {
    res.writeHead(302, { Location: 'https://github.com/login/oauth/authorize?client_id=Ov23liIU4mZkrYxw3cr8&scope=repo,user' })
    return res.end()
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: 'Ov23liIU4mZkrYxw3cr8',
        client_secret: '27444f9c59784ef1f80fbafb508c5cd95c9fa4af',
        code
      })
    })
    const data = await response.json()
    if (data.error) {
      res.statusCode = 400
      return res.end(JSON.stringify(data))
    }

    res.setHeader('Content-Type', 'text/html')
    res.end(`<script>opener.postMessage({token:"${data.access_token}",provider:"github"},"*")</script>`)
  } catch (e) {
    res.statusCode = 500
    res.end(JSON.stringify({ error: e.message }))
  }
}
