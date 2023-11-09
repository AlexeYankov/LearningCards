import { TextField } from '@/components/ui/textField'

import f from '../../cardsPage.module.scss'

export const PageBar = () => {
  return (
    <div className={f.container__pageBar}>
      <TextField placeholder={'Input search'} search />
    </div>
  )
}
