import type { Meta, StoryObj } from '@storybook/react'

import { ForgotYourPassword } from '@/components/ui/auth/forgotYourPassword/forgotYourPassword'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/api/storybookDecorators'

const meta = {
  component: ForgotYourPassword,
  tags: ['autodocs'],
  title: 'components/auth/forgotYourPassword',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof ForgotYourPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
