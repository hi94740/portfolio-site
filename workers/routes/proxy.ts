import { Router } from "itty-router"
import { fetchWithCors } from "../utils/fetchWithCors"

export default (router: Router) => {
  router.all("/proxy", async req => {
    const url = new URL(req.url).searchParams.get("url")
    if (url) return fetchWithCors(url, req)
    else return new Response()
  })
}
