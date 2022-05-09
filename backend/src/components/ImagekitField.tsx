import React, { useEffect } from "react"
import { TextField } from "payload/dist/fields/config/types"
import { useField } from "payload/components/forms"
import type IKMediaLibraryWidget from "imagekit-media-library-widget"
import { imagekitAtMax } from "common/imagekit"

const imagekitField: (name: string) => TextField = name => ({
  name,
  type: "text",
  admin: {
    components: {
      Field: (props: { label: string; path: string }) => {
        const { value, setValue } = useField<string>({ path: props.path })
        // console.log(props)
        const id = props.path.replaceAll(".", "-")
        const containerid = "IKcontainer-" + id
        const buttonid = "IKbutton-" + id
        useEffect(() => {
          import("imagekit-media-library-widget").then(
            async ({ default: ik }: { default: IKMediaLibraryWidget }) => {
              await new Promise(res => {
                const si = setInterval(() => {
                  clearInterval(si)
                  document.querySelector("#" + containerid) && res(null)
                }, 100)
              })
              new ik(
                {
                  container: "#" + containerid, // the element in which the Media Library Widget will be rendered
                  className: "media-library-widget",
                  dimensions: {
                    height: "100%",
                    width: "100%"
                  },
                  renderOpenButton: true // false | true (default)
                },
                ({ data: [data] }: { data: { filePath: string }[] }) => {
                  // console.log(data)
                  setValue(data.filePath)
                }
              )
              const button = document.querySelector(
                `#${containerid} > button`
              ) as HTMLButtonElement
              button.setAttribute("type", "button")
              button.classList.add(
                "btn",
                "btn--size-small",
                "btn--style-secondary"
              )
              button.id = buttonid
              // if (value) button.style.display = "none"
              button.style.margin = "10px 0"
              const iframe = document.querySelector(`#${containerid} iframe`)
              iframe.setAttribute(
                "sandbox",
                iframe.getAttribute("sandbox") +
                  " allow-popups allow-popups-to-escape-sandbox"
              )
              // iframe.removeAttribute("sandbox")
            }
          )
        }, [])
        // useEffect(() => {
        //   const button = document.querySelector(
        //     `#${containerid} > button`
        //   ) as HTMLButtonElement
        //   if (button) button.style.display = value ? "none" : ""
        // }, [value])
        return (
          <div>
            <label htmlFor={buttonid}>
              {props.label}
              {value ? (
                <img
                  src={imagekitAtMax(value, 600, 300)}
                  alt="Click to choose a new one"
                  title="Click to choose a new one"
                />
              ) : null}
            </label>
            <div id={containerid} />
            <input
              type="text"
              name={props.path}
              value={value || ""}
              style={{ display: "none" }}
              onChange={() => {}}
            />
          </div>
        )
      }
    }
  }
})

export default imagekitField
