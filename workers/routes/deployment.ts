import { Router } from "itty-router"
import { fetchWithCors } from "../utils/fetchWithCors"

export default (router: Router) => {
  router.get(
    "/deployment/status",
    (
      req,
      env: {
        CLOUDFLARE_PAGES_PROJECT_INFO_URL: string
        CLOUDFLARE_EMAIL: string
        CLOUDFLARE_AUTH_KEY: string
      }
    ) =>
      fetchWithCors(env.CLOUDFLARE_PAGES_PROJECT_INFO_URL, {
        headers: {
          "X-Auth-Email": env.CLOUDFLARE_EMAIL,
          "X-Auth-Key": env.CLOUDFLARE_AUTH_KEY
        }
      })
  )
  router.get("/deployment/build", (req, env: { DEPLOY_HOOK: string }) =>
    fetchWithCors(env.DEPLOY_HOOK, { method: "POST" })
  )
}
