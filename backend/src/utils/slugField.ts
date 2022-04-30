import { TextField } from "payload/dist/fields/config/types"

export default {
  name: "slug",
  type: "text",
  required: true,
  validate(val: string) {
    return (
      /[\w\d\-\_]+/g.test(val) || "Letters, numbers, slashes and dashes only!"
    )
  }
} as TextField
