import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
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
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    IconID: 'log-out',
    children: 'Primary Button',
    disabled: false,
    height: '16',
    variant: 'primary',
    width: '16',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'link',
  },
}
export const SecondaryWithIcon: Story = {
  args: {
    IconID: 'log-out',
    children: 'Secondary Button',
    disabled: false,
    height: '16',
    variant: 'secondary',
    width: '16',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
