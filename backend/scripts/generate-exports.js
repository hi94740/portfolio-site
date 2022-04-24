const fs = require("fs/promises")
const { resolve } = require("path")

const dirs = ["../src/collections"]

Promise.all(
  dirs.map(async dir => {
    dir = resolve(__dirname, dir)
    const fileNames = (await fs.readdir(dir)).filter(f => f !== "index.ts")
    const output = fileNames
      .map(f => {
        f = f.split(".")[0]
        return `export { default as ${f} } from "./${f}"\n`
      })
      .join("")
    await fs.writeFile(resolve(dir, "index.ts"), output)
  })
)
