import { TextField } from './'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: ['text', 'password', 'search'],
  },
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'black', value: '#000' },
      ],
    },
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

export const Search: Story = {
  args: {
    type: 'search',
    disabled: false,
    label: 'Input',
    placeholder: 'Input search',
    IconStart: 'search-outline',
    IconEnd: 'close-outline',
    width: '16',
    height: '16',
  },
}
