import type { Meta, StoryObj } from '@storybook/react'

import { Table } from '.'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'thirty', 'fourty', 'fivety'],
    },
  },
  component: Table,
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
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    headCell: [{ headCellName: 'Name', id: crypto.randomUUID() }],
    variant: 'Primary',
  },
}
export const Secondary: Story = {
  args: {
    bodyCell: [
      {
        bodyCellName: 'Name',
        id: crypto.randomUUID(),
      },
    ],
    variant: 'Thirtery',
  },
}
export const Thirtery: Story = {
  args: {
    bodyCell: [
      {
        bodyCellName: 'Name',
        checkBox: true,
        id: crypto.randomUUID(),
      },
    ],
    variant: 'Secondary',
  },
}

export const Fourty: Story = {
  args: {
    bodyCell: [
      {
        bodyCellName: 'Name',
        id: crypto.randomUUID(),
        svgs: [
          {
            id: 'edit-2-outline',
            uniqId: crypto.randomUUID(),
          },
          {
            id: 'trash-outline',
            uniqId: crypto.randomUUID(),
          },
        ],
      },
    ],
    variant: 'fourty',
  },
}
export const Fivety: Story = {
  args: {
    bodyCell: [
      {
        id: crypto.randomUUID(),
        svgs: [
          {
            id: 'play-circle-outline',
            uniqId: crypto.randomUUID(),
          },
          {
            id: 'edit-2-outline',
            uniqId: crypto.randomUUID(),
          },
          {
            id: 'trash-outline',
            uniqId: crypto.randomUUID(),
          },
        ],
      },
    ],
    variant: 'fivety',
  },
}

export const Sixty: Story = {
  args: {
    bodyCell: [
      {
        id: crypto.randomUUID(),
        stars: ['star', 'star', 'star', 'star', 'star-outline'],
      },
    ],
    variant: 'Sixty',
  },
}

export const Seventy: Story = {
  args: {
    bodyCell: [
      {
        bodyCellImage: './src/asserts/profileImage.png',
        bodyCellImageAlt: 'deck cover photo',
        bodyCellName: 'Name',
        id: crypto.randomUUID(),
      },
    ],
    variant: 'seventy',
    width: '250px',
  },
}

export const Eighty: Story = {
  args: {
    bodyCell: [
      {
        checkBox: true,
        id: crypto.randomUUID(),
      },
    ],
    variant: 'eighty',
    width: '200px',
  },
}

export const Ninety: Story = {
  args: {
    headCell: [
      {
        headCellName: 'Name',
        id: crypto.randomUUID(),
        svgSizes: {
          height: '12px',
          id: 'arrow-ios-Up',
          uniqId: crypto.randomUUID(),
          width: '12px',
        },
      },
    ],
    variant: 'ninety',
    width: '200px',
  },
}
