import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '.'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/api/storybookDecorators.tsx'

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
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Select-box Primary',
    options: ['Select-box', 'Select-box', 'Select-box'],
    placeholder: 'Select-box',
    reversed: true,
    selectId: 'Select-box Primary',
    variant: 'Primary',
  },
}
export const Secondary: Story = {
  args: {
    label: 'Select-box Secondary',
    // width: "24",
    options: ['Select-box', 'Select-box', 'Select-box'],
    placeholder: 'Select-box',
    reversed: true,
    selectId: 'Select-box Secondary',
    variant: 'Secondary',
    // height: "24",
  },
}
export const Thirtery: Story = {
  args: {
    disabled: true,
    label: 'Select-box Thirtery',
    options: ['Select-box', 'Select-box', 'Select-box'],
    placeholder: 'Select-box',
    reversed: true,
    selectId: 'Select-box Thirtery',
    variant: 'Thirtery',
  },
}
