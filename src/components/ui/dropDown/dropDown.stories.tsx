import { DropDown, DropDownMenu, DropDownPackMenu } from '@/components/ui/dropDown'
import { Meta, StoryObj } from '@storybook/react'

import profileImage from './../../../asserts/profileImage.png'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  component: DropDown,
  tags: ['autodocs'],
  title: 'Components/DropDown',
  decorators: [ReduxStoreProviderDecorator, ThemeDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuDemo: Story = {
  args: {
    children: <DropDownMenu avatar={profileImage} email={'j&johnson@gmail.com'} />,
  },
  render: () => <DropDownMenu avatar={profileImage} email={'j&johnson@gmail.com'} />,
}

export const DropDownPackMenuDemo: Story = {
  args: {
    children: <DropDownPackMenu />,
  },
  render: () => <DropDownPackMenu />,
}
