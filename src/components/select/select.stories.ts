import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '.'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Select,
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
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'Primary',
    options: ["Select-box", "Select-box", "Select-box"],
    width: '100px',
    placeholder: 'Select-box',
    padding: '5px',
    label: 'Select-box',
    reversed: true,
  },
}
export const Secondary: Story = {
  args: {
    variant: 'Secondary',
    // width: "24",
    options: ["Select-box", "Select-box", "Select-box"],
    width: '210px',
    padding: '12px',
    placeholder: 'Select-box',
    reversed: true,
    label: 'Select-box',
    // height: "24",
  },
}
export const Thirtery: Story = {
  args: {
    variant: 'Thirtery',
    options: ["Select-box", "Select-box", "Select-box"],
    width: '210px',
    padding: '12px',
    placeholder: 'Select-box',
    reversed: true,
    label: 'Select-box',
    disabled: true,
  },
}
