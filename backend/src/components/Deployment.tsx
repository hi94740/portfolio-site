import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const fetchStatus = (baseUrl: string) =>
  baseUrl
    ? fetch(baseUrl + "deployment/status")
        .then(res => res.json())
        .then(({ result }) => result.latest_deployment)
    : new Promise(r => r(null))

const DeploymentStatus = () => {
  const [baseUrl, setBaseUrl] = useState("")
  const [data, setData] = useState<any>()
  const [refreshInterval, setRefreshInterval] = useState(60000)
  useEffect(() => {
    // @ts-ignore
    import("env").then(env => {
      setBaseUrl(env.CLOUDFLARE_WORKERS_BASE_URL)
    })
  }, [])
  useEffect(() => {
    const refreshData = () =>
      baseUrl &&
      fetchStatus(baseUrl).then((res: any) => {
        setRefreshInterval(
          res?.latest_stage?.name !== "deploy" ||
            ["idle", "active"].includes(res?.latest_stage?.status)
            ? 1000
            : 60000
        )
        setData(res)
      })
    refreshData()
    const si = setInterval(refreshData, refreshInterval)
    return () => clearInterval(si)
  }, [baseUrl, refreshInterval])

  if (!data) return <></>
  return (
    <div className="deployment-section">
      <span className="nav__label">Deployment</span>
      <button
        className="deployment-status"
        onClick={async () => {
          if (!confirm("Confirm Deploy?")) return
          await fetch(baseUrl + "deployment/build")
          setRefreshInterval(1000)
        }}
        disabled={
          data?.latest_stage?.name !== "deploy" ||
          ["idle", "active"].includes(data?.latest_stage?.status)
        }
      >
        <b>
          {data.latest_stage.name === "deploy" &&
          data.latest_stage.status === "success"
            ? "Deployed"
            : ["failure", "canceled"].includes(data.latest_stage.status)
            ? "Failed"
            : "Building"}
        </b>
        {dayjs(data.created_on).fromNow()}
      </button>
    </div>
  )
}

export default DeploymentStatus
