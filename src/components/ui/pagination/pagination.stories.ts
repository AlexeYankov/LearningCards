import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    arrowColor: 'white',
    arrowID: 'arrow-ios-back',
    reversedArrowID: 'arrow-ios-forward',
    variant: 'primary',
    totalItems: 10,
    totalPages: 100,
  },
}

export const Secondary: Story = {
  args: {
    arrowColor: 'white',
    arrowID: 'arrow-ios-back',
    reversed: false,
    reversedArrowID: 'arrow-ios-forward',
    variant: 'secondary',
    totalItems: 10,
    totalPages: 100,
  },
}
