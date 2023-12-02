import {Card} from "@/components/ui/card";
import {Typography} from "@/components/ui/typography";
import {Radio} from "@/components/ui/radio-group";
import s from './learnPack.module.scss'
import {Button} from "@/components/ui/button";
import {Modal} from "@/components/ui/modal";
import {useLearnRandomCardQuery} from "@/api/decks/decks.api.ts";
import {useParams} from "react-router-dom";
import {CardsResponsType} from "@/api/common.api.ts";

type Props = {
    data?: CardsResponsType
}
export const LearnPack = ({data}: Props) => {
    return (
        <Card>
            <Typography className={s.Title} variant={'large'}>Learn “Pack Name”</Typography>
            <div className={s.MainBlock}>
                <Typography className={s.Question} variant={'subtitle1'}>Question:{data?.question}</Typography>
                <p className={s.Text}>Количество попыток ответов на вопрос:{data?.shots}</p>
                <p className={s.Answer}>Answer:{data?.answer}</p>
                <p className={s.Rate}>Rate yourself:</p>
                <Radio className={s.Radio}
                       options={[{value: "Did not know"}, {value: "Forgot"},
                           {value: "A lot of thought"}, {value: "Сonfused"},
                           {value: "Knew the answer"}]}/>
            </div>
            <Button className={s.Button} fullWidth>
                <Typography variant={'subtitle2'}>Next Question</Typography>
            </Button>
        </Card>
    );
};


export const Learn1 = () => {
    const {id} = useParams()
    const {data} = useLearnRandomCardQuery(id!)
    return (
        <Card>
            <Typography className={s.Title} variant={'large'}>Learn “Pack Name”</Typography>
            <div className={s.MainBlock}>
                <Typography className={s.Question} variant={'subtitle1'}>Question:{data?.question}</Typography>
                <p className={s.Text}>Количество попыток ответов на вопрос:{data?.shots}</p>
            </div>
            <Modal
                triggerName={
                    <Button className={s.Button} fullWidth>
                        <Typography variant={'subtitle2'}>Show Answer</Typography>
                    </Button>
                }
            >
                <LearnPack data={data}/>
            </Modal>
        </Card>
    );
};




