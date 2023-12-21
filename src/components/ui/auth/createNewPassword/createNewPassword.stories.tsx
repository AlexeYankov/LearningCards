import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './createNewPassword'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Components/auth/createNewPassword',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordDemo: Story = {
  args: {
    children: <CreateNewPassword />,
  },
  render: () => <CreateNewPassword />,
}
