import React from "react"
import { GroupField } from "payload/dist/fields/config/types"
import { useField } from "payload/components/forms"
import useForm from "../utils/useForm"
import { encode } from "js-base64"

const webflowPageField: (name: string) => GroupField = name => ({
  name,
  type: "group",
  fields: [
    {
      name: "url",
      type: "text",
      required: true
    },
    {
      name: "html",
      type: "text",
      admin: {
        components: {
          Field: ({ path }: { path: string }) => {
            const { getData } = useForm()
            const { value, setValue } = useField<string>({ path })
            const sync = async () =>
              setValue(
                "data:text/html;base64," +
                  encode(
                    (
                      await (
                        await fetch(
                          "https://preview.shenjiaweb.com/proxy?url=" +
                            getData()[path.replace(/\.html$/, ".url")]
                        )
                      ).text()
                    ).replace(
                      "</head>",
                      "<script>document.querySelectorAll('link').forEach(l=>{const u=new URL(l.href);if(u.protocol==='http:'){u.protocol='https:';l.href=u.toString()}})</script><style>a.w-webflow-badge{display: none !important;}</style></head>"
                    )
                  )
              )
            return (
              <>
                <button
                  onClick={sync}
                  type="button"
                  className="btn btn--size-small btn--style-secondary"
                >
                  Sync
                </button>
                {value ? (
                  <iframe
                    src={value}
                    frameBorder="0"
                    style={{
                      width: "100%",
                      height: "600px"
                    }}
                  />
                ) : null}
              </>
            )
          }
        }
      }
    }
  ]
})

export default webflowPageField
