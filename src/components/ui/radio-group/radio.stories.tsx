import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from '@/components/ui/radio-group/radio.tsx'
import { ThemeDecorator } from '@/api/storybookDecorators.tsx'

const meta = {
  component: Radio,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
  decorators: [ThemeDecorator],
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [{ value: 'one' }, { value: 'two' }, { value: 'three' }],
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    options: [{ value: 'one' }, { value: 'two' }, { value: 'three' }],
    disabled: true,
  },
}
