import { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@/components/typography/typography.tsx'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    as: 'h1',
    variant: 'large',
    children: `Carosserie Test ZürichStauffacherstrasse 318004 Zürich, ZH, CH`,
  },
}
