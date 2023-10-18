import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    arrowID: 'arrow-ios-back',
    reversedArrowID: 'arrow-ios-forward',
    // height: "24",
    // width: "24",
    arrowColor: 'white',
    pages: 21,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    arrowID: 'arrow-ios-back',
    reversedArrowID: 'arrow-ios-forward',
    // height: "24",
    // width: "24",
    arrowColor: 'white',
    pages: 20,
  },
}
