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
    variant: 'Primary',
    headCell: [{ headCellName: 'Name', id: crypto.randomUUID() }],
  },
}
export const Secondary: Story = {
  args: {
    variant: 'Thirtery',
    bodyCell: [
      {
        bodyCellName: 'Name',
        id: crypto.randomUUID(),
      },
    ],
  },
}
export const Thirtery: Story = {
  args: {
    variant: 'Secondary',
    bodyCell: [
      {
        bodyCellName: 'Name',
        id: crypto.randomUUID(),
        checkBox: true,
      },
    ],
  },
}

export const Fourty: Story = {
  args: {
    variant: 'fourty',
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
  },
}
export const Fivety: Story = {
  args: {
    variant: 'fivety',
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
  },
}

export const Sixty: Story = {
  args: {
    variant: 'Sixty',
    bodyCell: [
      {
        id: crypto.randomUUID(),
        stars: ['star', 'star', 'star', 'star', 'star-outline'],
      },
    ],
  },
}

export const Seventy: Story = {
  args: {
    variant: 'seventy',
    bodyCell: [
      {
        bodyCellName: 'Name',
        id: crypto.randomUUID(),
        bodyCellImage: './src/asserts/profileImage.png',
        bodyCellImageAlt: 'deck cover photo',
      },
    ],
    width: '250px',
  },
}


export const Eighty: Story = {
  args: {
    variant: 'eighty',
    bodyCell: [
      {
        id: crypto.randomUUID(),
        checkBox: true,
      },
    ],
    width: '200px',
  },
}

export const Ninety: Story = {
  args: {
    variant: 'ninety',
    headCell: [
      {
        headCellName: 'Name',
        id: crypto.randomUUID(),
        svgSizes: {
          id: 'arrow-ios-Up',
          height: '12px',
          width: '12px',
          uniqId: crypto.randomUUID(),
        },
      },
    ],
    width: '200px',
  },
}
