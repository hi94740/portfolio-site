import { Router } from "itty-router"
import * as routes from "./routes"

const router = Router()

router.options("*", request => {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = (request as any).headers as Headers
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.

    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
        // Allow all future content Request headers to go back to browser
        // such as Authorization (Bearer) or X-Client-Name-Version
        "Access-Control-Allow-Headers":
          headers.get("Access-Control-Request-Headers") || ""
      }
    })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS"
      }
    })
  }
})

Object.values(routes).forEach(r => r(router))

export default {
  fetch: router.handle
} as ExportedHandler
