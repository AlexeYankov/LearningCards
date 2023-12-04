import {Link, useParams} from 'react-router-dom'
import {useGetCardsQuery} from '@/api/common.api'
import f from './cardsPage.module.scss'
import {PageName} from './components/pageName/pageName'
import {tableHeadCardsData} from './tableData'
import {ArrowBack} from '@/asserts/icons/components/ArrowBack'
import {EmptyPack} from '@/components/ui/cards/components/emptyPack/emptyPack'
import {Table} from '@/components/ui/table'
import {PageBar} from '@/components/ui/cards/components/pageBar/pageBar'
import {Pagination} from '@/components/ui/pagination'
import {useAppDispatch, useAppSelector} from '@/api/store.ts'
import {changeCurrentPage, changeItemsPerPage} from '@/api/decks/pagination.reducer'
import {useEffect} from 'react'
import {changeCardsCurrentPage, changeCardsItemsPerPage} from '@/api/cards/cards.ts'
import {useMeQuery} from "@/api/auth-api/auth.api.ts";

export const CardsPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.pagination.currentPage)
    const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)
    const {data, isLoading} = useGetCardsQuery({
        id: id!,
        currentPage,
        itemsPerPage,
    })
    const {data: me} = useMeQuery()

    const flag = me?.id==id

    const resetFilterDecks = () => {
        dispatch(changeCardsCurrentPage({currentPage: 1}))
        dispatch(changeCurrentPage({currentPage: 1}))
        dispatch(changeItemsPerPage({itemsPerPage: 10}))
        dispatch(changeCardsItemsPerPage({itemsPerPage: 10}))
    }

    useEffect(() => {
        resetFilterDecks()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className={f.container}>
            <Link className={f.backLink} to={'/'} onClick={resetFilterDecks}>
                <ArrowBack/>
                Back to Packs List
            </Link>

            {!data?.items?.length ? (
                <EmptyPack packTitle={'Name Pack'}/>
            ) : (
                <>
                    <PageName id={id} isMyDeck={flag}/>
                    <PageBar/>
                    <Table
                        bodyCell={data?.items || []}
                        className={f.container__common}
                        headCell={tableHeadCardsData}
                        tableName={'Cards'}
                        isMyDeck={flag}
                    />
                </>
            )}
            {data?.pagination?.totalPages! > 1 && (
                <Pagination
                    arrowColor={'white'}
                    arrowID={'arrow-ios-back'}
                    options={['10', '20', '30', '50', '100']}
                    placeholder={'100'}
                    reversedArrowID={'arrow-ios-forward'}
                    totalPages={data?.pagination?.totalPages}
                />
            )}
        </div>
    )
}
