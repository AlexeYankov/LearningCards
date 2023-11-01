import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import f from '../../packsPage.module.scss'

export const PageName = () => {
  return (
    <div className={f.container__pageName}>
      <Typography style={{ color: 'red' }}>Packs list</Typography>
      <Button>Add New Pack</Button>
    </div>
  )
}
