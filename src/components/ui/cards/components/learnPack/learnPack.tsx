import {Card} from '@/components/ui/card'
import {Typography} from '@/components/ui/typography'
import {Radio} from '@/components/ui/radio-group'
import s from './learnPack.module.scss'
import {Button} from '@/components/ui/button'
import {useGetDecksByIdQuery, useLearnRandomCardQuery, useLearnRandomPostMutation} from '@/api/decks/decks.api.ts'
import {Link, useParams} from 'react-router-dom'
import {useState} from 'react'
import {ArrowBackIcon} from '@/asserts/icons/components/ArrowBackIcon.tsx'
import {Loader} from '@/components/ui/loader/loader.tsx'

const options = [
    {value: 'Did not know'},
    {value: 'Forgot'},
    {value: 'A lot of thought'},
    {value: 'Сonfused'},
    {value: 'Knew the answer'},
]

export const LearnPack = () => {
    const {id} = useParams()
    const {data, isFetching} = useLearnRandomCardQuery(id!)
    const {data: deckById} = useGetDecksByIdQuery(id!)
    const [learn, {isLoading}] = useLearnRandomPostMutation()
    const [show, setShow] = useState(false)
    const [value, setValue] = useState('Did not know')
    const [gradeValue, setGradeValue] = useState(1)
    const onChangeValue = (value: string) => {
        setValue(value)
        let index = options.findIndex(el => el.value === value) + 1
        setGradeValue(index)
    }
    if (isLoading) return <Loader/>
    if (isFetching) return <Loader/>
    const sendHandler = () => {
        learn({id, grade: gradeValue, cardId: data?.id})
            .unwrap()
            .then(() => setShow(false))
    }
    const onShowAnswer = () => {
        setShow(true)
    }
    return (
        <>
            <Link className={s.backLink} to={`/${id}`}>
                <ArrowBackIcon/>
                Back to Packs List
            </Link>
            <Card>
                <Typography className={s.Title} variant={'large'}>
                    Learn {deckById?.name ||"Pack Name"}
                </Typography>
                <div className={s.MainBlock}>
                    <Typography className={s.Question} variant={'subtitle1'}>
                        Question: <Typography variant={'body1'}>{data?.question || 'NameQuestion'}</Typography>
                    </Typography>
                    <p className={s.Text}>Количество попыток ответов на вопрос: {data?.shots || ''}</p>
                    {data?.questionImg && <img className={s.Image} src={data?.questionImg} alt=""/>}
                </div>
                {show ? (
                    <>
                        <div className={s.MainBlock}>
                            <p className={s.Answer}>
                                Answer: <Typography variant={'body1'}>{data?.answer || ''}</Typography>
                            </p>
                            {data?.questionImg && <img className={s.Image} src={data?.answerImg} alt=""/>}
                            <p className={s.Rate}>Rate yourself:</p>
                            <Radio
                                value={value}
                                onChange={e => onChangeValue(e)}
                                className={s.Radio}
                                options={options}
                            />
                        </div>
                        <Button autoFocus onClick={sendHandler} className={s.Button} fullWidth>
                            <Typography variant={'subtitle2'}>Next Question</Typography>
                        </Button>
                    </>
                ) : (
                    <Button autoFocus onClick={onShowAnswer} className={s.Button} fullWidth>
                        <Typography variant={'subtitle2'}>Show Answer</Typography>
                    </Button>
                )}
            </Card>
        </>
    )
}
