import { InjectionKey } from "vue"
import { Work } from "~~/../backend/src/types/payload-generated-types"

const _ = Symbol as <T>() => InjectionKey<T>

export default {
  works: _<Work[]>(),
  webflowPages: _<Map<string, string>>()
}
