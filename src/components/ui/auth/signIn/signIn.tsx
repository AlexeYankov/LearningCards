import { useForm } from 'react-hook-form'

import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signIn.module.scss'

import { Button } from '../../button'
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
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmailSignUp'}
        />
        <ControlledInput
          IconID={'eye-outline'}
          className={s.inputPassword}
          placeholder={'Password'}
          control={control}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
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
          className={s.checkbox}
          control={control}
          height={'24'}
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
          children={<Typography children={'Sign In'} variant={'subtitle2'} />}
          className={s.button}
          type={'submit'}
          variant={'primary'}
          fullWidth
          children={<Typography children={'Sign In'} variant={'subtitle2'} as={'p'} />}
        />
      </form>

      <Typography
        children={"Don't have an account?"}
        className={s.linkDontHaveAccount}
        variant={'body2'}
        as={'p'}
      />
      <Button
        className={s.linkSignUp}
        type={'button'}
        variant={'link'}
        children={<Typography children={'Sign Up'} variant={'subtitle2'} as={'p'} />}
        onClick={goToRegistration}
      />
    </Card>
  )
}
