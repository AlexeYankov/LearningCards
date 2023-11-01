import { Logout } from '@/asserts/icons/components/Logout'
import { Button } from '@/components/ui/button'
import { SliderDemo } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'

import f from '../../packsPage.module.scss'
import { Label } from '@/components/ui/label'

export const PageBar = () => {
  return (
    <div className={f.container__pageName}>
      <div className={f.container__textField}>
        <TextField />
      </div>

      <div>
        <Label className={f.labelCalssName}>Number of cards</Label>
        <Tabs title={['My Cards', 'All Cards']} />
      </div>

      <div>
        <Label>Number of cards</Label>
        <SliderDemo />
      </div>

      <Button icon={<Logout />} variant="secondary">
        Clear Filter
      </Button>
    </div>
  )
}
