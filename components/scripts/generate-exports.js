const fs = require("fs/promises")
const { resolve } = require("path")

const componentsDir = resolve(__dirname, "../src/components")

fs.readdir(componentsDir).then(componentNames =>
  fs.writeFile(
    resolve(componentsDir, "./index.ts"),
    componentNames
      .filter(c => c !== "index.ts")
      .map(c => `export { default as ${c} } from "./${c}/index.vue"\n`)
      .join("")
  )
)
