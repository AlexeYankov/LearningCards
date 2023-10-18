import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from '.'

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    IconID: 'checkbox-unselected',
    SelectedIconID: 'checkbox-selected',
    height: "24",
    width: "24",
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    IconID: 'checkbox-unselected',
    SelectedIconID: 'checkbox-selected',
    height: "24",
    width: "24",
    label: 'Check-box',
    disabled: false,
  },
}
