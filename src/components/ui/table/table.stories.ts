import type { Meta, StoryObj } from '@storybook/react'

import { Table } from '.'
import {
  BrowserRouterDecorator,
  ReduxStoreProviderDecorator,
  ThemeDecorator,
} from '@/api/storybookDecorators.tsx'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'thirty', 'fourty', 'fivety'],
    },
  },
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
  decorators: [ReduxStoreProviderDecorator, ThemeDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    headCell: [{ headCellName: 'Name' }],
    variant: 'Primary',
  },
}
export const Secondary: Story = {
  args: {
    bodyCell: [
      {
        bodyCellName: 'Name',
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
        svgs: [
          {
            id: 'edit-2-outline',
          },
          {
            id: 'trash-outline',
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
        svgs: [
          {
            id: 'play-circle-outline',
          },
          {
            id: 'edit-2-outline',
          },
          {
            id: 'trash-outline',
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
      },
    ],
    variant: 'seventy',
  },
}

export const Eighty: Story = {
  args: {
    bodyCell: [
      {
        checkBox: true,
      },
    ],
    variant: 'eighty',
  },
}

export const Ninety: Story = {
  args: {
    headCell: [
      {
        headCellName: 'Name',
        svgSizes: {
          id: 'arrow-ios-Up',
        },
      },
    ],
    variant: 'ninety',
  },
}
