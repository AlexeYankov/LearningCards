import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/api/storybookDecorators.tsx'

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
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    arrowColor: 'white',
    arrowID: 'arrow-ios-back',
    options: ['10', '20', '30', '50', '100'],
    placeholder: '100',
    reversedArrowID: 'arrow-ios-forward',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    arrowColor: 'white',
    arrowID: 'arrow-ios-back',
    options: ['10', '20', '30', '50', '100'],
    placeholder: '100',
    reversed: false,
    reversedArrowID: 'arrow-ios-forward',
    variant: 'secondary',
  },
}
