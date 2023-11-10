import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '@/api/storybookDecorators.tsx'

const meta = {
  component: Slider,
  parameters: {
    backgrounds: {
      default: 'black',
      values: [{ name: 'black', value: '#000' }],
    },
  },
  tags: ['autodocs'],
  title: 'Components/Slider',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitialProps: Story = {
  args: {},
}
