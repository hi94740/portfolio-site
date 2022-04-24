import { CollectionConfig } from "payload/types"
import imagekitField from "../components/ImageKitField"
import webflowPageField from "../components/WebflowPageField"
import WorkCard from "../components/WorkCard"
import { Work } from "../types/payload-generated-types"

const Examples: CollectionConfig = {
  slug: "works",
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: "title"
  },
  versions: {
    drafts: {
      autosave: true
    }
  },
  fields: [
    {
      name: "cardPreview",
      type: "ui",
      admin: {
        components: {
          Field: WorkCard
        }
      }
    },
    {
      name: "slug",
      type: "text",
      required: true,
      validate(val) {
        return (
          /[\w\d\-\_]+/g.test(val) ||
          "Letters, numbers, slashes and dashes only!"
        )
      }
    },
    {
      name: "title",
      type: "text"
    },
    imagekitField("coverImageBackground"),
    {
      name: "contentType",
      type: "select",
      required: true,
      options: [
        {
          label: "None",
          value: "none"
        },
        {
          label: "Webflow Page",
          value: "webflow"
        }
      ],
      defaultValue: "none"
    },
    {
      ...webflowPageField("webflow"),
      label: "Webflow Page",
      admin: {
        condition: (data: Work) => data.contentType === "webflow"
      }
    }
  ]
}

export default Examples
