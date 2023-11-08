import { Delete } from '@/asserts/icons/components/Delete'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { SliderDemo } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'

export const PageBar = () => {
  return (
    <div className={f.container__pageBar}>
      <div className={f.container__textField}>
        <TextField label={'placeholder'} placeholder={'Input search'} search />
      </div>

      <div style={{ position: 'relative' }}>
        <Label label={'Show packs cards'} style={{ position: 'absolute', top: '-25px' }} />
        <Tabs title={['My Cards', 'All Cards']} />
      </div>

      <div style={{ position: 'relative' }}>
        <Label label={'Number of cards'} style={{ position: 'absolute', top: '-25px' }} />
        <SliderDemo />
      </div>
      <div>
        <Button icon={<Delete />} variant={'secondary'}>
          <Typography variant={'body2'}>Clear Filter</Typography>
        </Button>
      </div>
    </div>
  )
}
