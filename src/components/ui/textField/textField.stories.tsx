import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'
import { ThemeDecorator } from '@/decorators'

const meta = {
  argTypes: {
    type: ['text', 'password'],
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
  decorators: [ThemeDecorator],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    inputId: 'inputIdDefault',
    label: 'Input',
    placeholder: 'Input',
    type: 'text',
  },
}

export const Error: Story = {
  args: {
    errorMessage: 'Error!',
    inputId: 'inputIdError',
    label: 'Input',
    placeholder: 'Error',
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    inputId: 'inputIdPassword',
    label: 'Input password',
    password: true,
    placeholder: 'password',
    type: 'password',
  },
}

export const Search: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField
          inputId={'inputIdSearch'}
          label={'Input Search'}
          onChange={e => setText(e.currentTarget.value)}
          onClearClick={() => setText('')}
          placeholder={'search'}
          search
          value={text}
        />
      </>
    )
  },
}
