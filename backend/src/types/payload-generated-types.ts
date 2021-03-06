/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "lists".
 */
export interface List {
  id: string
  slug: string
  label?: string
  works?: {
    work: string | Work
    id?: string
  }[]
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "works".
 */
export interface Work {
  id: string
  _status?: "draft" | "published"
  slug: string
  title?: string
  tags?: (string | Tag)[]
  coverImageBackground?: string
  contents?: (
    | {
        url: string
        id?: string
        blockName?: string
        blockType: "webflow"
      }
    | {
        url: string
        id?: string
        blockName?: string
        blockType: "fullPageEmbed"
      }
    | {
        websiteUrl?: string
        sourceCodeUrl?: string
        description?: {
          [k: string]: unknown
        }[]
        cover?: string
        id?: string
        blockName?: string
        blockType: "mobileWebsite"
      }
    | {
        url: string
        id?: string
        blockName?: string
        blockType: "youtube"
      }
  )[]
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string
  slug: string
  label: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  email?: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
}

interface PayloadGeneratedTypes {
  config: Config
  lists: List
  works: Work
  tags: Tag
  users: User
}

export default PayloadGeneratedTypes
