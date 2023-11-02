import { Meta, StoryObj } from '@storybook/react'

import { DropDownMenu } from './dropDownMenu'

const meta = {
  component: DropDownMenu,
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'black', value: '#000' },
      ],
    },
  },
  tags: ['autodocs'],
  title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuDemo: Story = {
  args: {
    children: 'Large',
  },
}
