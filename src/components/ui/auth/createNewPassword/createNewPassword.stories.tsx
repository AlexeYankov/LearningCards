import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './createNewPassword'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/api/storybookDecorators.tsx'

const meta = {
  component: CreateNewPassword,
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'black', value: '#000' },
      ],
    },
  },
  tags: ['autodocs'],
  title: 'Components/auth/createNewPassword',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordDemo: Story = {
  args: {
    children: <CreateNewPassword />,
  },
  render: () => <CreateNewPassword />,
}
