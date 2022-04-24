const fs = require("fs/promises")
const { resolve } = require("path")

const dataTypeFilePath = resolve(
  __dirname,
  "../src/types/payload-generated-types.ts"
)

fs.readFile(dataTypeFilePath, "utf8").then(async input => {
  const typeNames = [...input.matchAll(/export interface (.+) {/g)].map(
    g => g[1]
  )
  const typeSlugs = [
    "config",
    ...[...input.matchAll(/\* via the `definition` "(.+)"./g)].map(g => g[1])
  ]
  // console.log(typeSlugs)
  const output = `
interface PayloadGeneratedTypes {
  ${typeNames.map((t, i) => typeSlugs[i] + ": " + t).join("\n  ")}
}

export default PayloadGeneratedTypes
`
  // console.log(output)
  await fs.appendFile(dataTypeFilePath, output)
})
