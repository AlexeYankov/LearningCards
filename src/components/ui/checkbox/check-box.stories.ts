import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from '.'

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
  args: {
    IconID: 'checkbox-unselected',
    SelectedIconID: 'checkbox-selected',
    disabled: false,
    height: '24',
    variant: 'primary',
    width: '24',
  },
}

export const Secondary: Story = {
  args: {
    IconID: 'checkbox-unselected',
    SelectedIconID: 'checkbox-selected',
    disabled: false,
    height: '24',
    label: 'Check-box',
    variant: 'secondary',
    width: '24',
  },
}
