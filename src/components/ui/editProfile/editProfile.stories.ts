import { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './editProfile'
import { ReduxStoreProviderDecorator, ThemeDecorator } from '@/api/storybookDecorators.tsx'

const meta = {
  component: EditProfile,
  tags: ['autodocs'],
  title: 'Components/EditProfile',
  decorators: [ReduxStoreProviderDecorator, ThemeDecorator],
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileEdit: Story = {
  args: {
    name: 'Ivan',
  },
}
