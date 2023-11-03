import { Button } from '@/components/ui/button'
import { SliderDemo } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { Label } from '@/components/ui/label'

import f from '../../packsPage.module.scss'
import { Delete } from '@/asserts/icons/components/Delete'
import { Typography } from '@/components/ui/typography'

export const PageBar = () => {
  return (
    <div className={f.container__pageBar}>
      <div>
        <TextField
          placeholder="Input search"
          search
          label="placeholder"
          className={f.container__textField}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <Label style={{ position: 'absolute', top: '-25px' }} label="Show packs cards" />
        <Tabs title={['My Cards', 'All Cards']} />
      </div>

      <div style={{ position: 'relative' }}>
        <Label style={{ position: 'absolute', top: '-25px' }} label="Number of cards" />
        <SliderDemo />
      </div>

      <Button icon={<Delete />} variant="secondary">
        <Typography variant="body2">Clear Filter</Typography>
      </Button>
    </div>
  )
}
