import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  argTypes: {
    type: ['text', 'password', 'search'],
  },
  component: TextField,
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
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Input',
    placeholder: 'Input',
    type: 'text',
  },
}

export const Error: Story = {
  args: {
    disabled: false,
    error: 'Error!',
    label: 'Input',
    placeholder: 'Error',
    type: 'text',
    value: 'error value',
  },
}

export const Password: Story = {
  args: {
    IconID: 'eye-outline',
    disabled: false,
    height: '20',
    label: 'Input',
    placeholder: 'password',
    type: 'password',
    value: 'some password',
    width: '20',
  },
}

export const Search: Story = {
  args: {
    IconEnd: 'close-outline',
    IconStart: 'search-outline',
    disabled: false,
    height: '16',
    label: 'Input',
    placeholder: 'Input search',
    type: 'search',
    width: '16',
  },
}
