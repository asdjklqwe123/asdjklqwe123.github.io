// Vercel Function — GitHub OAuth for Decap CMS
export default async function handler(req) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")

  if (!code) {
    return Response.redirect(
      "https://github.com/login/oauth/authorize?client_id=Ov23liIU4mZkrYxw3cr8&scope=repo,user",
      302
    )
  }

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        client_id: "Ov23liIU4mZkrYxw3cr8",
        client_secret: "27444f9c59784ef1f80fbafb508c5cd95c9fa4af",
        code
      })
    })
    const data = await res.json()
    if (data.error) return new Response(JSON.stringify(data), { status: 400 })

    return new Response(
      `<!doctype html><script>window.opener.postMessage({token:"${data.access_token}",provider:"github"},"*")</script>`,
      { headers: { "Content-Type": "text/html" } }
    )
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}