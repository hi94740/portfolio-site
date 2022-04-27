import express from "express"
import payload from "payload"
import https from "https"
import fs from "fs"
import superagent from "superagent"

require("dotenv").config()
const app = express()

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin")
})

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL:
    process.env.MONGODB_URI || process.env.AZURE_COSMOS_CONNECTIONSTRING,

  // Only needed to deploy publicly. Get free Personal license at https://payloadcms.com.
  ...(process.env.PAYLOAD_LICENSE_KEY
    ? { license: process.env.PAYLOAD_LICENSE_KEY }
    : {}),

  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  }
})

// Add your own express routes here
app.use("/proxy", (req, res) => {
  const url = req.query.text as string
  superagent(url)
    .then(r => {
      res.type(r.type)
      res.send(r.text)
    })
    .catch(() => res.send(""))
})
app.disable("etag")

if (process.env.SSL_KEY && process.env.SSL_CERT)
  https
    .createServer(
      {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT)
      },
      app
    )
    .listen(parseInt(process.env.PORT || "80"), "0.0.0.0")
else app.listen(parseInt(process.env.PORT || "80"), "0.0.0.0", () => {})
