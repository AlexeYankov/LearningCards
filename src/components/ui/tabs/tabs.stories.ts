import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from '.'
import { ReduxStoreProviderDecorator, ThemeDecorator } from '@/api/storybookDecorators.tsx'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
  decorators: [ThemeDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: ['Switcher', 'Switcher'],
  },
}
