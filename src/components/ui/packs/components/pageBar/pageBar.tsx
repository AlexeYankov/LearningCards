import { Delete } from '@/asserts/icons/components/Delete'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { SliderDemo } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../packsPage.module.scss'
import { FC } from 'react'
import { PaginationResponseType } from '@/api/common.api'

type PageBarProps = {
  onQueryPaginationValueChange?: (newValues: Partial<PaginationResponseType>) => void
}

export const PageBar: FC<PageBarProps> = ({ onQueryPaginationValueChange }) => {
  return (
    <div className={f.container__pageBar}>
      <div>
        <TextField className={f.container__textField} placeholder={'Input search'} search />
      </div>

      <div style={{ position: 'relative' }}>
        <Label label={'Show packs cards'} style={{ position: 'absolute', top: '-25px' }} />
        <Tabs title={['My Cards', 'All Cards']} />
      </div>

      <div style={{ position: 'relative' }}>
        <Label label={'Number of cards'} style={{ position: 'absolute', top: '-25px' }} />
        <SliderDemo onQueryPaginationValueChange={onQueryPaginationValueChange} />
      </div>
      <div>
        <Button className={f.button} icon={<Delete />} variant={'secondary'}>
          <Typography variant={'body2'}>Clear Filter</Typography>
        </Button>
      </div>
    </div>
  )
}
