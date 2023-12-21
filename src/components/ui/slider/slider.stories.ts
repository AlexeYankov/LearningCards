import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitialProps: Story = {
  args: {},
}
