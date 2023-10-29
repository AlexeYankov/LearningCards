import { SliderDemo } from '@/components/Slider/Slider'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SliderDemo,
  parameters: {
    backgrounds: {
      default: 'black',
      values: [{ name: 'black', value: '#000' }],
    },
  },
  tags: ['autodocs'],
  title: 'Components/SliderDemo',
} satisfies Meta<typeof SliderDemo>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitialProps: Story = {
  args: {
    defaultValue: [0, 100],
    thumbLabels: ['start', 'end'],
  },
}
