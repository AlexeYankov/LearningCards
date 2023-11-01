import s from './signUp.module.scss'
import { Typography } from '@/components/ui/typography'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '../../controlled/controlled-input'
import { Button } from '../../button'
import { Card } from '@/components/ui/card'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
})
export const SignUp = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  return (
    <Card className={s.signUp}>
      <Typography className={s.label} children={'Sign Up'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputEmail}
          placeholder={'Email'}
          control={control}
          name={'email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmail'}
        />
        <ControlledInput
          className={s.inputPassword}
          placeholder={'Password'}
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
          password
          inputId={'inputPassword'}
        />
        <ControlledInput
          className={s.inputConfirmPassword}
          placeholder={'Confirm Password'}
          control={control}
          name={'confirmPassword'}
          type={'password'}
          label={'Confirm Password'}
          password
          inputId={'inputConfirmPassword'}
        />
        <Button
          className={s.button}
          type={'submit'}
          variant={'primary'}
          fullWidth
          children={<Typography children={'Sign Up'} variant={'subtitle2'} as={'p'} />}
        />
      </form>

      <Typography
        className={s.linkAlreadyHaveAccount}
        children={'Already have an account?'}
        variant={'body2'}
        as={'p'}
      />
      <Typography className={s.linkSignIn} children={'Sign In'} variant={'body1'} as={'p'} />
    </Card>
  )
}
