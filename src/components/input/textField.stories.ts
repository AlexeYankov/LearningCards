import { TextField } from './'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: ['text', 'password', 'search'],
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    disabled: false,
    label: 'Input',
    placeholder: 'Input',
  },
}

export const Error: Story = {
  args: {
    type: 'text',
    disabled: false,
    label: 'Input',
    placeholder: 'Error',
    error: 'Error!',
    value: 'error value',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    disabled: false,
    label: 'Input',
    placeholder: 'password',
    value: 'some password',
    IconID: 'eye-outline',
    width: '20',
    height: '20',
  },
}
