import f from './packsPage.module.scss'

import { PageName } from './components/pageName/pageName'
import { PageBar } from './components/pageBar/pageBar'
import { Header } from './components/header/header'

export const PacksPage = () => {
  return (
    <>
      <Header />
      <div className={f.container}>
        <PageName />
        <PageBar />
        <PageBar />
      </div>
    </>
  )
}
