import { CollectionConfig } from "payload/types"
import slugField from "../utils/slugField"

const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "label"
  },
  access: {
    read: () => true
  },
  fields: [
    slugField,
    {
      name: "label",
      type: "text",
      required: true
    }
  ]
}

export default Tags
