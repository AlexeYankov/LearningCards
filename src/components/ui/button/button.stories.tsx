import type { Meta, StoryObj } from '@storybook/react'

import { DeleteIcon, LogoutIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { ThemeDecorator } from '@/decorators'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  decorators: [ThemeDecorator],
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    fullWidth: false,
    variant: 'primary',
  },
  render: args => <Button {...args} />,
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    fullWidth: false,
    variant: 'secondary',
  },
  render: args => <Button {...args} />,
}

export const PrimaryWithIcon: Story = {
  args: {
    children: 'Primary With Icon Button',
    disabled: false,
    fullWidth: false,
    variant: 'primary',
  },
  render: args => <Button icon={<DeleteIcon />} {...args} />,
}

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    fullWidth: false,
    variant: 'tertiary',
  },
  render: args => <Button {...args} />,
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    disabled: false,
    fullWidth: false,
    variant: 'link',
  },
  render: args => <Button {...args} />,
}

export const SecondaryWithIcon: Story = {
  args: {
    children: 'Secondary With Icon Button',
    disabled: false,
    fullWidth: false,
    variant: 'secondary',
  },
  render: args => <Button icon={<LogoutIcon />} {...args} />,
}

export const FullWidthButton: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
  render: args => <Button {...args} />,
}
