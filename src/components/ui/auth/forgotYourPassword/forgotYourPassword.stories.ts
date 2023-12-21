import type { Meta, StoryObj } from '@storybook/react'

import { ForgotYourPassword } from '@/components/ui/auth/forgotYourPassword/forgotYourPassword'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  component: ForgotYourPassword,
  tags: ['autodocs'],
  title: 'components/auth/forgotYourPassword',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof ForgotYourPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
