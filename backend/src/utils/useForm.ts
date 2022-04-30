import { useForm } from "payload/components/forms"

export default <T = {}>() => {
  const form = useForm()
  return {
    ...form,
    getData: () =>
      ({
        ...form.getData(),
        ...Object.fromEntries([...new FormData(form.formRef.current).entries()])
      } as unknown as T)
  }
}
