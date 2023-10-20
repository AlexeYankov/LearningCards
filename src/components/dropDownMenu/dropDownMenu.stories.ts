import { Meta, StoryObj } from '@storybook/react'
import { DropDownMenu } from './dropDownMenu.tsx'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'black', value: '#000' },
      ],
    },
  },
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuDemo: Story = {
  args: {
    children: 'Large',
  },
}
