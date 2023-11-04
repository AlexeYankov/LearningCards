import s from './pages.module.scss'

import sprite from '@/asserts/sprite.svg'
import { PagesForRender } from './pagesForRender'
import { setPageHandler } from '../utils/counter'

type PagesType = {
  arrowID: string
  color?: string
  reversedArrowID: string
  startPagesFrom?: number
  itemsPerPage?: number
  currentPage?: number
  totalPages?: number
  onPaginationClick: (page: number) => void
}

export const Pages = ({
  arrowID,
  color,
  reversedArrowID,
  onPaginationClick,
  totalPages = 20,
  currentPage = 1,
}: PagesType) => {
  // const [query, setQuery] = useState<any>(undefined)
  //
  // const { data } = useGetDecksQuery(query)
  //
  // const { currentPage, totalPages }: PaginationResponseType = {
  //   currentPage: data?.pagination?.currentPage || 1,
  //   itemsPerPage: data?.pagination?.itemsPerPage || 10,
  //   totalItems: data?.pagination?.totalItems || 100,
  //   totalPages: data?.pagination?.totalPages || 20,
  // }
  //
  // const handlePaginationClick = (page: number) => {
  //   setQuery({ currentPage: page })
  // }

  const setCurrentPage = (callbackIconID: string) => {
    setPageHandler(
      arrowID,
      reversedArrowID,
      currentPage,
      totalPages,
      callbackIconID,
      onPaginationClick
    )
  }

  return (
    <div className={s.pagesContainer}>
      <svg
        fill={color || 'black'}
        onClick={() => setCurrentPage(arrowID)}
        style={currentPage === 1 ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${arrowID}`} />
      </svg>

      <PagesForRender page={currentPage} pages={totalPages} setPage={onPaginationClick} />

      <svg
        fill={color || 'black'}
        onClick={() => setCurrentPage(reversedArrowID)}
        style={currentPage === totalPages ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${reversedArrowID}`} />
      </svg>
    </div>
  )
}
