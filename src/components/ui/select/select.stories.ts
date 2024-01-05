import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/decorators'

import { Select } from '.'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Select,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    options: ['Select-box', 'Select-box', 'Select-box'],
    reversed: true,
    selectId: 'Select-box Primary',
    variant: 'Primary',
  },
}
export const Secondary: Story = {
  args: {
    // width: "24",
    options: ['Select-box', 'Select-box', 'Select-box'],
    reversed: true,
    selectId: 'Select-box Secondary',
    variant: 'Secondary',
    // height: "24",
  },
}
export const Thirtery: Story = {
  args: {
    disabled: true,
    options: ['Select-box', 'Select-box', 'Select-box'],
    reversed: true,
    selectId: 'Select-box Thirtery',
    variant: 'Thirtery',
  },
}
