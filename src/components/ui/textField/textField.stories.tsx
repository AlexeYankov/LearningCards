import { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'
import { useState } from 'react'

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
    placeholder: 'password',
    type: 'password',
    password: true,
  },
}

export const Search: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField
          search={true}
          placeholder={'search'}
          inputId={'inputIdSearch'}
          label={'Input Search'}
          value={text}
          onChange={e => setText(e.currentTarget.value)}
          onClearClick={() => setText('')}
        />
      </>
    )
  },
}
