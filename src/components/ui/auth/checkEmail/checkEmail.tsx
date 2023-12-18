import {Link, useParams} from 'react-router-dom'
import {EmailIcon} from '@/asserts/icons/components/EmailIcon.tsx'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Typography} from '@/components/ui/typography'
import s from './checkEmail.module.scss'


export const CheckEmail = () => {
    const {email} = useParams()
    return (
        <Card className={s.box}>
            <Typography as={'span'} className={s.title} variant={'large'}>
                Check Email
            </Typography>
            <div className={s.icon}>
                <EmailIcon/>
            </div>
            <Typography as={'p'} className={s.text} variant={'body2'}>
                We’ve sent an Email with instructions to {email && email || 'email'}
            </Typography>
            <Button className={s.button} fullWidth variant={'primary'}>
                <Typography as={Link} to={'/login'} variant={'subtitle2'}>
                    Back to Sign In
                </Typography>
            </Button>
        </Card>
    )
}
