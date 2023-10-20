import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'black', value: '#000' },
      ],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
    IconID: 'log-out',
    height: '16',
    width: '16',
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const SecondaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
    IconID: 'log-out',
    height: '16',
    width: '16',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
