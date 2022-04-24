import { UseFetchOptions } from "nuxt/dist/app/composables"
import type { FetchRequest } from "ohmyfetch"
import type { FetchResult } from "nuxt/dist/app/composables"
import type { _Transform, KeyOfRes } from "nuxt/dist/app/composables/asyncData"
import DataTypes from "backend/src/types/payload-generated-types"
import type { PaginatedDocs } from "payload/dist/mongoose/types"

export default <
  Collection extends keyof DataTypes,
  ResT = PaginatedDocs<DataTypes[Collection]>,
  ReqT extends FetchRequest = string,
  _ResT = ResT extends void ? FetchResult<ReqT> : ResT,
  Transform extends (res: _ResT) => any = (res: _ResT) => _ResT,
  PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>
>(
  collection: Collection,
  options?: UseFetchOptions<_ResT, Transform, PickKeys>
) =>
  useFetch<ResT, string, _ResT, Transform, PickKeys>(collection, {
    baseURL: useRuntimeConfig().public.apiBase,
    ...options
  })
