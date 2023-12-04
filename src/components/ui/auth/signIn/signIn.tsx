import s from './signIn.module.scss'
import { Typography } from '@/components/ui/typography'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '../../controlled/controlled-input'
import { ControlledCheckbox } from '../../controlled/controlled-checkbox'
import { Button } from '../../button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation, useMeQuery } from '@/api/auth-api/auth.api.ts'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})
export const SignIn = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const [login, {isSuccess, isLoading}] = useLoginMutation()
  const navigate = useNavigate()
  if (isLoading) {
    return <Loader/>
  }
  if (isSuccess) {
    navigate('/')
  }

  const onSubmit = (data: FormValues) => {
    login(data)
  }

  return (
    <Card className={s.signIn}>
      <Typography className={s.label} children={'Sign In'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          placeholder={'Email'}
          control={control}
          name={'email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmailSignUp'}
        />
        <ControlledInput
          placeholder={'Password'}
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
          password
          inputId={'inputPasswordSignUp'}
        />
        <div className={s.checkboxContainer}>
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
        </div>
        <div className={s.linkContainer}>
          <Typography
            className={s.forgotPassLink}
            children={'Forgot PasswordIcon?'}
            variant={'body2'}
            as={Link}
            to={'/forgotYourPassword'}
          />
        </div>
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
        className={s.btnSignUp}
        type={'button'}
        variant={'link'}
        children={
          <Typography
            className={s.linkSignUp}
            children={'Sign Up'}
            variant={'subtitle2'}
            to={'/signUp'}
            as={Link}
          />
        }
      />
    </Card>
  )
}
