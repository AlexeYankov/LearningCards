import { Meta, StoryObj } from '@storybook/react'

// eslint-disable-next-line import/extensions
import { EditProfile } from './EditProfile.tsx'

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
