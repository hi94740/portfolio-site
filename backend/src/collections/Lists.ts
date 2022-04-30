import { CollectionConfig } from "payload/types"
import slugField from "../utils/slugField"

const Lists: CollectionConfig = {
  slug: "lists",
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
      type: "text"
    },
    {
      name: "works",
      type: "array",
      fields: [
        {
          name: "work",
          type: "relationship",
          relationTo: "works",
          required: true
        }
      ]
    }
  ]
}

export default Lists
