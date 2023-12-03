import { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './checkEmail'
import {
  BrowserRouterDecorator,
  ReduxStoreProviderDecorator,
  ThemeDecorator,
} from '@/api/storybookDecorators'

const meta = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Components/auth/checkEmail',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailDemo: Story = {
  args: {
    children: <CheckEmail />,
  },
  render: () => <CheckEmail />,
}
