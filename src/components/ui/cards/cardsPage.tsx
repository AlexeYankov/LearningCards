import { useParams } from 'react-router-dom'
import { useGetCardsQuery } from '@/api/common.api'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { changeCurrentPage, changeItemsPerPage } from '@/api/decks/pagination.reducer'
import { useEffect } from 'react'
import { changeCardsCurrentPage, changeCardsItemsPerPage } from '@/api/cards/cards.ts'
import { Column } from '@/components/ui/table/types.ts'
import { Body, Cell, Head, HeadCell, Root, Row } from '@it-incubator/ui-kit'
import s from './cardsPage.module.scss'
import { Edit } from '@/asserts/icons/components/Edit.tsx'

export const CardsPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)
  const { data: cards, isLoading } = useGetCardsQuery({
    id: id!,
    currentPage,
    itemsPerPage,
  })

  const resetFilterDecks = () => {
    dispatch(changeCardsCurrentPage({ currentPage: 1 }))
    dispatch(changeCurrentPage({ currentPage: 1 }))
    dispatch(changeItemsPerPage({ itemsPerPage: 10 }))
    dispatch(changeCardsItemsPerPage({ itemsPerPage: 10 }))
  }

  useEffect(() => {
    resetFilterDecks()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const columns: Column[] = [
    { key: 'question', sortable: true, title: 'Question' },
    { key: 'answer', sortable: true, title: 'Answer' },
    { key: 'updated', sortable: true, title: 'Updated' },
    { key: 'grade', sortable: true, title: 'Grade' },
    { key: 'actions', sortable: false, title: '' },
  ]

  return (
    // <div className={f.container}>
    //   <Link className={f.backLink} to={'/'} onClick={resetFilterDecks}>
    //     <ArrowBack />
    //     Back to Packs List
    //   </Link>
    //
    //   {!data?.items?.length ? (
    //     <EmptyPack packTitle={'Name Pack'} />
    //   ) : (
    //     <>
    //       <PageName isMyDeck={flag} />
    //       <PageBar />
    //       <Table
    //         bodyCell={data?.items || []}
    //         className={f.container__common}
    //         headCell={tableHeadData}
    //         tableName={'Cards'}
    //         isMyDeck={flag}
    //       />
    //     </>
    //   )}
    //   {data?.pagination?.totalPages! > 1 && (
    //     <Pagination
    //       arrowColor={'white'}
    //       arrowID={'arrow-ios-back'}
    //       totalItems={data?.pagination?.totalItems}
    //       reversedArrowID={'arrow-ios-forward'}
    //       reversed
    //       totalPages={data?.pagination?.totalPages}
    //     />
    //   )}
    //
    //
    // </div>
    <div className={s.container}>
      <Root className={'w-full'}>
        <Head className={s.tableHead}>
          {/*<Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>*/}
          <Row className={s.cardsRow}>
            {columns.map(({ title, key }) => {
              return (
                <HeadCell key={key}>
                  {/*<HeadCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>*/}
                  {title}
                  {/*{sort?.key === key ? <ArrowUp /> : ''}*/}
                </HeadCell>
              )
            })}
          </Row>
        </Head>
        <Body>
          {cards?.items?.map(card => (
            <Row key={card.id}>
              <Cell>{card.question}</Cell>
              <Cell>{card.answer}</Cell>
              <Cell>{'day'}</Cell>
              <Cell>{card.rating}</Cell>
              <Cell className={'flex gap-4 items-center'}>
                <Edit />
                {/*<button className={'unset'}>/!*<FaEdit />*!/</button>*/}
                {/*<button*/}
                {/*  className={'unset'}*/}
                {/*  // onClick={() => {*/}
                {/*  //   deleteCard({ cardId: card.id })*/}
                {/*  // }}*/}
                {/*>*/}
                {/*  /!*<FaTrash />*!/*/}
                {/*</button>*/}
              </Cell>
            </Row>
          ))}
        </Body>
      </Root>
    </div>
  )
}
