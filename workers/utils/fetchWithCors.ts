export const fetchWithCors: typeof fetch = async (...args) => {
  const res = await fetch(...args)
  const corsRes = new Response(res.body, res)
  corsRes.headers.set("Access-Control-Allow-Origin", "*")
  return corsRes
}
