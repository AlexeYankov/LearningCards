import { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './checkEmail'

const meta = {
  component: CheckEmail,
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
  title: 'Components/auth/checkEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailDemo: Story = {
  args: {
    children: <CheckEmail />,
  },
  render: () => <CheckEmail />,
}
