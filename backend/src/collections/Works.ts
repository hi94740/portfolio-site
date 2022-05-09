import { CollectionConfig } from "payload/types"
import imagekitField from "../components/ImageKitField"
import WorkCard from "../components/WorkCard"
import slugField from "../utils/slugField"

const Works: CollectionConfig = {
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
    slugField,
    {
      name: "title",
      type: "text"
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true
    },
    imagekitField("coverImageBackground"),
    {
      name: "contents",
      type: "blocks",
      blocks: [
        {
          slug: "webflow",
          fields: [
            {
              name: "url",
              type: "text",
              required: true
            }
          ]
        },
        {
          slug: "fullPageEmbed",
          fields: [
            {
              name: "url",
              type: "text",
              required: true
            }
          ]
        },
        {
          slug: "mobileWebsite",
          fields: [
            {
              name: "websiteUrl",
              type: "text"
            },
            {
              name: "sourceCodeUrl",
              type: "text"
            },
            {
              name: "description",
              type: "richText"
            },
            imagekitField("cover")
          ]
        },
        {
          slug: "youtube",
          fields: [
            {
              name: "url",
              type: "text",
              required: true
            }
          ]
        }
      ]
    }
  ]
}

export default Works
