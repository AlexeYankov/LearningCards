import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  argTypes: {
    type: ['text', 'password'],
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
    inputId: 'inputIdDefault',
    label: 'Input',
    password: false,
    placeholder: 'Input',
    search: false,
    type: 'text',
  },
}

export const Error: Story = {
  args: {
    disabled: false,
    errorMessage: 'Error!',
    inputId: 'inputIdError',
    label: 'Input',
    password: false,
    placeholder: 'Error',
    search: false,
    type: 'text',
    value: 'error value',
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    inputId: 'inputIdPassword',
    label: 'Input password',
    password: true,
    placeholder: 'password',
    type: 'password',
    value: 'some password',
  },
}

export const Search: Story = {
  args: {
    disabled: false,
    inputId: 'inputIdSearch',
    label: 'Input search',
    placeholder: 'search',
    search: true,
  },
}
