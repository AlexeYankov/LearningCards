import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    // width: "24",
    arrowColor: 'white',
    arrowID: 'arrow-ios-back',
    pages: 4,
    options: [10, 20, 30, 50, 100],
    placeholder: 100,
    // height: "24",
    reversedArrowID: 'arrow-ios-forward',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    // width: "24",
    arrowColor: 'white',
    arrowID: 'arrow-ios-back',
    pages: 21,
    placeholder: 100,
    options: [10, 20, 30, 50, 100],
    // height: "24",
    reversedArrowID: 'arrow-ios-forward',
    variant: 'secondary',
  },
}
