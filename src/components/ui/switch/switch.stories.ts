import { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'
import { SwitchLang } from './switch'

const meta = {
  component: SwitchLang,
  tags: ['autodocs'],
  title: 'Components/Switch',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof SwitchLang>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitialProps: Story = {
  args: {},
}
