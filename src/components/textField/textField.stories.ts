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
    label: 'Input',
    placeholder: 'Input',
    inputId: 'inputIdDefault',
    type: 'text',
    password: false,
    search: false,
  },
}

export const Error: Story = {
  args: {
    disabled: false,
    errorMessage: 'Error!',
    label: 'Input',
    inputId: 'inputIdError',
    placeholder: 'Error',
    type: 'text',
    value: 'error value',
    password: false,
    search: false,
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    label: 'Input password',
    inputId: 'inputIdPassword',
    placeholder: 'password',
    type: 'password',
    value: 'some password',
    password: true,
  },
}

export const Search: Story = {
  args: {
    disabled: false,
    label: 'Input search',
    inputId: 'inputIdSearch',
    placeholder: 'search',
    search: true,
  },
}
