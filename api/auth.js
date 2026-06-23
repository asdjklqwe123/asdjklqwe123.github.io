// Vercel Function — GitHub OAuth for Decap CMS
export default function handler(req, res) {
  const code = req.query.code

  if (!code) {
    res.redirect(302, 'https://github.com/login/oauth/authorize?client_id=Ov23liIU4mZkrYxw3cr8&scope=repo,user')
    return
  }

  const https = require('https')
  const postData = JSON.stringify({
    client_id: 'Ov23liIU4mZkrYxw3cr8',
    client_secret: '27444f9c59784ef1f80fbafb508c5cd95c9fa4af',
    code
  })

  const options = {
    hostname: 'github.com',
    path: '/login/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const gitReq = https.request(options, (gitRes) => {
    let body = ''
    gitRes.on('data', (chunk) => { body += chunk })
    gitRes.on('end', () => {
      try {
        const data = JSON.parse(body)
        if (data.error) {
          res.status(400).send(data.error)
          return
        }
        res.setHeader('Content-Type', 'text/html')
        res.send(`<script>opener.postMessage({token:"${data.access_token}",provider:"github"},"*")</script>`)
      } catch (e) {
        res.status(500).send(e.message)
      }
    })
  })
  gitReq.on('error', (e) => res.status(500).send(e.message))
  gitReq.write(postData)
  gitReq.end()
}
