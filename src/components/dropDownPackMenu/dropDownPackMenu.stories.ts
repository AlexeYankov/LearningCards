import { Meta, StoryObj } from '@storybook/react'

import { DropDownPackMenu } from './dropDownPackMenu'

const meta = {
  component: DropDownPackMenu,
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
  title: 'Components/DropDownPackMenu',
} satisfies Meta<typeof DropDownPackMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownPactMenu: Story = {}
