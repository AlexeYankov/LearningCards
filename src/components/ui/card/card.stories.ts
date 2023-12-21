import { Card } from '@/components/ui/card/card'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/decorators'
import photo from '@/asserts/profileImage.png'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
  decorators: [ThemeDecorator],
} satisfies Meta<typeof Card>

type Story = StoryObj<typeof meta>

export default meta

export const WithInitialProps: Story = {
  args: { photo, withProps: true },
}
