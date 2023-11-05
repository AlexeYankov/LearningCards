import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './signUp'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'components/auth/signUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
