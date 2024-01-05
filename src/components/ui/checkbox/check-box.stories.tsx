import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { ThemeDecorator } from '@/decorators'

import { CheckBox } from './check-box'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: CheckBox,
  decorators: [ThemeDecorator],
  tags: ['autodocs'],
  title: 'Components/CheckBox',
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    height: '24',
    variant: 'primary',
    width: '24',
  },
  render: args => {
    const [isCheck, setIsCheck] = useState(false)

    return (
      <>
        <CheckBox
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          checked={isCheck}
          onChange={() => setIsCheck(!isCheck)}
          {...args}
        />
      </>
    )
  },
}

export const Secondary: Story = {
  args: {
    height: '24',
    label: 'Check-box',
    variant: 'primary',
    width: '24',
  },
  render: args => {
    const [isCheck, setIsCheck] = useState(false)

    return (
      <>
        <CheckBox
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          checked={isCheck}
          onChange={() => setIsCheck(!isCheck)}
          {...args}
        />
      </>
    )
  },
}
