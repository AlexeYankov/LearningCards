import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from '.'
import { useState } from 'react'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: CheckBox,
  tags: ['autodocs'],
  title: 'Components/CheckBox',
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => {
    const [isCheck, setIsCheck] = useState(false)

    return (
      <>
        <CheckBox
          checkboxId={'checkboxId'}
          checked={isCheck}
          onChange={() => setIsCheck(!isCheck)}
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          {...args}
        />
      </>
    )
  },
  args: {
    height: '24',
    variant: 'primary',
    width: '24',
  },
}

export const Secondary: Story = {
  render: args => {
    const [isCheck, setIsCheck] = useState(false)

    return (
      <>
        <CheckBox
          checkboxId={'checkboxIdSecondary'}
          checked={isCheck}
          onChange={() => setIsCheck(!isCheck)}
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          {...args}
        />
      </>
    )
  },
  args: {
    height: '24',
    variant: 'primary',
    width: '24',
    label: 'Check-box',
  },
}
