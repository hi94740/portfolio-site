import React, { useEffect, useState } from "react"

const BackendBuildTime = () => {
  const [buildTimeLabel, setBuildTimeLabel] = useState("")
  useEffect(() => {
    // @ts-ignore
    import("env").then(env =>
      setBuildTimeLabel(
        "Built at: " + new Date(env.BUILD_TIMESTAMP).toLocaleString()
      )
    )
  }, [])
  return <div>{buildTimeLabel}</div>
}

export default BackendBuildTime
