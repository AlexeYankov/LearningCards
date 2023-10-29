export const setPageHandler = (
  arrowID: string,
  reversedArrowID: string,
  page: number,
  pages: number,
  id: string,
  setPage: (value: number) => void
) => {
  if (page !== 1 && id === arrowID) {
    setPage(page - 1)
  }
  if (page !== pages && id === reversedArrowID) {
    setPage(page + 1)
  }
}
