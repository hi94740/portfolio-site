import useForm from "../utils/useForm"
import React, { useReducer, useEffect } from "react"
import { Work } from "../types/payload-generated-types"
import { applyVueInReact } from "veaury"
import { WorkCard as VueWorkCard } from "components"
import { WorkCardProps } from "components/dist/types/components/WorkCard/index.vue"
import { ReactFunctionComponent } from "../types/components"

const ReactWorkCard = applyVueInReact(
  VueWorkCard
) as ReactFunctionComponent<WorkCardProps>

const WorkCard = () => {
  const { formRef, getData } = useForm<Work>()
  const data = getData()

  const [, reRender] = useReducer((c: number) => c + 1, 0)
  useEffect(() => {
    formRef.current.addEventListener("change", reRender)
    setTimeout(reRender)
  }, [])

  return (
    <div
      className="border-box-all"
      style={{ marginBottom: "10px" }}
      onClick={reRender}
    >
      <ReactWorkCard work={data} />
    </div>
  )
}

export default WorkCard
