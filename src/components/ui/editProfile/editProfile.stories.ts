import { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './editProfile'

const meta = {
  component: EditProfile,
  parameters: {
    backgrounds: {
      default: 'black',
      values: [{ name: 'black', value: '#000' }],
    },
  },
  tags: ['autodocs'],
  title: 'Components/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileEdit: Story = {
  args: {
    name: 'Ivan',
  },
}
