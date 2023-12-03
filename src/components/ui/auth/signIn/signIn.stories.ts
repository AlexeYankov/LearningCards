import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './signIn'
import {
  BrowserRouterDecorator,
  ReduxStoreProviderDecorator,
  ThemeDecorator,
} from '@/api/storybookDecorators.tsx'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'components/auth/signIn',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
