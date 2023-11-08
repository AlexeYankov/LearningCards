import { DropDown, DropDownMenu, DropDownPackMenu } from '@/components/ui/dropDown/dropDown'
import { Meta, StoryObj } from '@storybook/react'

import profileImage from './../../../asserts/profileImage.png'

const meta = {
  component: DropDown,
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
  title: 'Components/DropDown',
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuDemo: Story = {
  args: {
    children: (
      <DropDownMenu avatar={profileImage} email={'j&johnson@gmail.com'} name={'12312312'} />
    ),
  },
  render: () => (
    <DropDownMenu avatar={profileImage} email={'j&johnson@gmail.com'} name={'12312312'} />
  ),
}

export const DropDownPackMenuDemo: Story = {
  args: {
    children: <DropDownPackMenu />,
  },
  render: () => <DropDownPackMenu />,
}
