import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

import { SignIn } from './signIn'

const meta = {
  component: SignIn,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
  tags: ['autodocs'],
  title: 'components/auth/signIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
