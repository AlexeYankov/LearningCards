import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'
import { Meta, StoryObj } from '@storybook/react'

import { SwitchLang } from './switchLang.tsx'

const meta = {
  component: SwitchLang,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
  tags: ['autodocs'],
  title: 'Components/Switch',
} satisfies Meta<typeof SwitchLang>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitialProps: Story = {
  args: {},
}
