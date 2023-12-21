import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './signUp'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'components/auth/signUp',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
