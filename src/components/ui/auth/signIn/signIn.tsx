import s from './signIn.module.scss'
import { Typography } from '@/components/ui/typography'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '../../controlled/controlled-input'
import { ControlledCheckbox } from '../../controlled/controlled-checkbox'
import { Button } from '../../button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})
export const SignIn = () => {
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
    navigate('/')
  }

  const goToRegistration = () => {
    navigate('/signup')
  }
  const goToForgotPassword = () => {
    navigate('/forgotPassword')
  }

  return (
    <Card className={s.signIn}>
      <Typography className={s.label} children={'Sign In'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputEmail}
          placeholder={'Email'}
          control={control}
          name={'email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmailSignUp'}
        />
        <ControlledInput
          className={s.inputPassword}
          placeholder={'Password'}
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
          password
          inputId={'inputPasswordSignUp'}
        />
        <ControlledCheckbox
          control={control}
          name={'rememberMe'}
          className={s.checkbox}
          width={'24'}
          height={'24'}
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          label={'Remember me'}
          checkboxId={'ControlledCheckboxSignIn'}
        />
        <Typography
          className={s.forgotPassLink}
          children={'Forgot Password?'}
          variant={'body2'}
          as={'p'}
          onClick={goToForgotPassword}
        />
        <Button
          className={s.button}
          type={'submit'}
          variant={'primary'}
          fullWidth
          children={<Typography children={'Sign In'} variant={'subtitle2'} as={'p'} />}
        />
      </form>

      <Typography
        className={s.linkDontHaveAccount}
        children={"Don't have an account?"}
        variant={'body2'}
        as={'p'}
      />
      <Button
        className={s.button}
        type={'button'}
        variant={'link'}
        fullWidth
        children={<Typography children={'Sign Up'} variant={'subtitle2'} as={'p'} />}
        onClick={goToRegistration}
      />
    </Card>
  )
}
