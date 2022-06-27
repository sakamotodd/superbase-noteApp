export const revalidateList = () => {
  fetch('/api/revalidated')
}
export const revalidateSingle = (id: string) => {
  fetch(`/api/revalidated/${id}`)
}
