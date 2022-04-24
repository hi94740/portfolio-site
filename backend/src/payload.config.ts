import { buildConfig } from "payload/config"
import { resolve } from "path"
import * as collections from "./collections"
import Providers from "./components/Providers"

let serverURL = `${process.env.PROTOCOL}://${process.env.HOST}${
  process.env.PUBLIC_PORT ? ":" + process.env.PUBLIC_PORT : ""
}`
if (process.title === "browser") {
  serverURL = location.href.split("/").slice(0, 3).join("/")
}

export default buildConfig({
  serverURL,
  admin: {
    user: collections.Users.slug,
    components: {
      providers: [Providers]
    },
    css: resolve(__dirname, "./style.css")
  },
  collections: Object.values(collections),
  typescript: {
    outputFile: resolve(__dirname, "./types/payload-generated-types.ts")
  },
  indexSortableFields: true,
  cors: process.env.CORS_ORIGIN?.split(",") || "*"
})
