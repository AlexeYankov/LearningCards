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
    as: 'span',
    variant: 'large',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Heading1: Story = {
  args: {
    as: 'h1',
    variant: 'heading1',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Heading2: Story = {
  args: {
    as: 'h2',
    variant: 'heading2',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Heading3: Story = {
  args: {
    as: 'h3',
    variant: 'heading3',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Body1: Story = {
  args: {
    as: 'p',
    variant: 'body1',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Body2: Story = {
  args: {
    as: 'p',
    variant: 'body2',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Subtitle1: Story = {
  args: {
    as: 'p',
    variant: 'subtitle1',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Subtitle2: Story = {
  args: {
    as: 'p',
    variant: 'subtitle2',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Caption: Story = {
  args: {
    as: 'span',
    variant: 'caption',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}

export const Overline: Story = {
  args: {
    as: 'p',
    variant: 'overline',
    children: `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`,
  },
}
