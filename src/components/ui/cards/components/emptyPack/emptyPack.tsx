import {FC} from 'react'
import s from './emptyPack.module.scss'
import {Typography} from '@/components/ui/typography'
import {AddCard} from '@/components/ui/cards/components/addCard/addCard'
import {useParams} from "react-router-dom";

type EmptyPackPropsType = {
  packTitle: string
}

export const EmptyPack: FC<EmptyPackPropsType> = ({ packTitle }) => {
    const { id } = useParams()
  // const [isOpen, setIsOpen] = useState(false)
  // const handleButtonClick = () => {
  //   setIsOpen(!isOpen)
  //
  // }
  return (
    <>
      <Typography as={'h1'} variant={'large'} className={s.title}>
        {packTitle}
      </Typography>
      <Typography as={'p'} variant={'body1'} className={s.description}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      {/*<Button onClick={handleButtonClick} className={s.button}>*/}
      {/*  Add New Card*/}
      {/*</Button>*/}
        <div className={s.button}>
            <AddCard id={id}/>
        </div>
      {/*{isOpen && <AddCard />}*/}
    </>
  )
}
