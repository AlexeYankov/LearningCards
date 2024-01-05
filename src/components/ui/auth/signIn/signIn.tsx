import s from './signIn.module.scss'
import { Typography } from '@/components/ui/typography'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '@/api/auth'
import { Progress } from '@/components/ui/loader'
import { TextField } from '@/components/ui/textField'
import { CheckBox } from '@/components/ui/checkbox'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})
export const SignIn = () => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = (data: FormValues) => {
    login(data).then(() => {
      navigate('/')
    })
  }

  if (isLoading) {
    return <Progress />
  }

  return (
    <Card className={s.signIn}>
      <Typography className={s.label} children={'Sign In'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder={'Email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmailSignUp'}
          errorMessage={errors.email && errors.email?.message}
          {...register('email')}
        />
        <TextField
          placeholder={'Password'}
          type={'password'}
          label={'Password'}
          password
          inputId={'inputPasswordSignUp'}
          errorMessage={errors.password && errors.password?.message}
          {...register('password')}
        />
        <div className={s.checkboxContainer}>
          <CheckBox
            className={s.checkbox}
            width={'24'}
            height={'24'}
            IconID={'checkbox-unselected'}
            SelectedIconID={'checkbox-selected'}
            label={'Remember me'}
            checkboxId={'ControlledCheckboxSignIn'}
            {...register('rememberMe')}
          />
        </div>
        <div className={s.linkContainer}>
          <Typography
            className={s.forgotPassLink}
            children={'Forgot Password?'}
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
