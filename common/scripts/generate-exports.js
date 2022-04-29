const fs = require("fs/promises")
const { resolve } = require("path")

/**
 * @param {string[]}  dirs - An array of relative paths
 * @param {string} dirname - __dirname
 * @param {string=""} subPath - Path to prepend to every export path
 */
module.exports = (dirs, dirname, subPath = "") =>
  Promise.all(
    dirs.map(async dir => {
      dir = resolve(dirname, dir)
      const fileNames = (await fs.readdir(dir)).filter(f => f !== "index.ts")
      const output = fileNames
        .map(f => {
          f = f.split(".")[0]
          return `export { default as ${f} } from "./${f + subPath}"\n`
        })
        .join("")
      await fs.writeFile(resolve(dir, "index.ts"), output)
    })
  )
