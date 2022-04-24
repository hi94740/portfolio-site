import ImageKit from "imagekit-javascript"
import { UrlOptions } from "imagekit-javascript/dist/src/interfaces"

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/shenjiaweb"
})

export default (path: string, options?: Partial<UrlOptions>) =>
  imagekit.url({ path, ...(options || {}) } as UrlOptions)

const imagekitCrop = (c: string, path: string, w: number, h?: number) =>
  imagekit.url({
    path,
    transformation: [
      {
        c,
        ...(w ? { w: w.toString() } : {}),
        ...(h ? { h: h.toString() } : {})
      }
    ]
  })

export const imagekitAtMax = (path: string, w: number, h?: number) =>
  imagekitCrop("at_max", path, w, h)
export const imagekitCover = (path: string, w: number, h?: number) =>
  imagekitCrop("at_least", path, w, h)

export const imagekitResponsiveCssCover = (
  path: string,
  w: number,
  h?: number
) => {
  const imgSet = [1, 2, 3]
    .map(x => `url("${imagekitCover(path, w * x, (h || 0) * x)}") ${x}x`)
    .join(",")
  // return [
  //   `url("${imagekitCover(path, w, h)}")`,
  //   `-webkit-image-set(${imgSet})`,
  //   `image-set(${imgSet})`
  // ]
  return `image-set(${imgSet})`
}
