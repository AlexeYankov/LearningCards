import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './label'

const meta = {
  component: Label,
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
  title: 'Components/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLabel: Story = {
  args: {
    label: 'Label',
  },
  render: () => <Label label={'Label'} />,
}
