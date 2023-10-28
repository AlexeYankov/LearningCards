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
    options: ['Select-box', 'Select-box', 'Select-box'],
    placeholder: 'Select-box',
    label: 'Select-box Primary',
    selectId: 'Select-box Primary',
    reversed: true,
  },
}
export const Secondary: Story = {
  args: {
    variant: 'Secondary',
    // width: "24",
    options: ['Select-box', 'Select-box', 'Select-box'],
    placeholder: 'Select-box',
    reversed: true,
    label: 'Select-box Secondary',
    selectId: 'Select-box Secondary',
    // height: "24",
  },
}
export const Thirtery: Story = {
  args: {
    variant: 'Thirtery',
    options: ['Select-box', 'Select-box', 'Select-box'],
    placeholder: 'Select-box',
    reversed: true,
    label: 'Select-box Thirtery',
    selectId: 'Select-box Thirtery',
    disabled: true,
  },
}
