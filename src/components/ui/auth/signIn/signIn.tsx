import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signIn.module.scss'

import { Button } from '../../button'
import { ControlledCheckbox } from '../../controlled/controlled-checkbox'
import { ControlledInput } from '../../controlled/controlled-input'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export const SignIn = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<FormValues>({
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
      <Typography children={'Sign In'} className={s.label} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputEmail}
          control={control}
          inputId={'inputEmailSignUp'}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
          type={'text'}
        />
        <ControlledInput
          className={s.inputPassword}
          control={control}
          inputId={'inputPasswordSignUp'}
          label={'Password'}
          name={'password'}
          password
          placeholder={'Password'}
          type={'password'}
        />
        <ControlledCheckbox
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          checkboxId={'ControlledCheckboxSignIn'}
          className={s.checkbox}
          control={control}
          height={'24'}
          label={'Remember me'}
          name={'rememberMe'}
          width={'24'}
        />
        <Typography
          as={'p'}
          children={'Forgot Password?'}
          className={s.forgotPassLink}
          onClick={goToForgotPassword}
          variant={'body2'}
        />
        <Button
          children={<Typography as={'p'} children={'Sign In'} variant={'subtitle2'} />}
          className={s.button}
          fullWidth
          type={'submit'}
          variant={'primary'}
        />
      </form>

      <Typography
        as={'p'}
        children={"Don't have an account?"}
        className={s.linkDontHaveAccount}
        variant={'body2'}
      />
      <Button
        children={<Typography as={'p'} children={'Sign Up'} variant={'subtitle2'} />}
        className={s.linkSignUp}
        onClick={goToRegistration}
        type={'button'}
        variant={'link'}
      />
    </Card>
  )
}
