import { Meta, StoryObj } from '@storybook/react'

import { Switch } from './switch'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  component: Switch,
  tags: ['autodocs'],
  title: 'Components/Switch',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitialProps: Story = {
  args: {},
}
