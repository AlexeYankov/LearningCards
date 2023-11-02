import type { Meta, StoryObj } from '@storybook/react'
import {ForgotYourPassword} from "@/components/ui/auth/forgotYourPassword/forgotYourPassword.tsx";

const meta = {
    title: 'components/auth/forgotYourPassword',
    component: ForgotYourPassword,
    tags: ['autodocs'],
} satisfies Meta<typeof ForgotYourPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}