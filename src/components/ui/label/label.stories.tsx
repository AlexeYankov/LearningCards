import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './label'
import { ThemeDecorator } from '@/decorators'

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'Components/Label',
  decorators: [ThemeDecorator],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLabel: Story = {
  args: {
    label: 'Label',
  },
  render: () => <Label label={'Label'} />,
}
