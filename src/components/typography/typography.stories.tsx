import { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@/components/typography/typography.tsx'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'black', value: '#000' },
      ],
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: () => JSX.Element = () => (
  <>
    <Typography as="span" variant="large">
      Large
    </Typography>
    <Typography as="h1" variant="heading1">
      Heading1
    </Typography>
    <Typography as="h2" variant="heading2">
      Heading2
    </Typography>
    <Typography as="h3" variant="heading3">
      Heading3
    </Typography>
    <Typography as="p" variant="body1">
      Body1
    </Typography>
    <Typography as="p" variant="body2">
      Body2
    </Typography>
    <Typography as="p" variant="subtitle1">
      Subtitle1
    </Typography>
    <Typography as="p" variant="subtitle2">
      Subtitle2
    </Typography>
    <Typography as="span" variant="caption">
      Caption
    </Typography>
    <Typography as="p" variant="overline">
      Overline
    </Typography>
    <Typography as="a" variant="link1">
      Link1
    </Typography>
    <div>
      <Typography as="a" variant="link2">
        Link2
      </Typography>
    </div>
  </>
)

export const Large: Story = {
  args: {
    as: 'span',
    variant: 'large',
    children: 'Large',
  },
}

export const Heading1: Story = {
  args: {
    as: 'h1',
    variant: 'heading1',
    children: 'Heading1',
  },
}

export const Heading2: Story = {
  args: {
    as: 'h2',
    variant: 'heading2',
    children: 'Heading2',
  },
}

export const Heading3: Story = {
  args: {
    as: 'h3',
    variant: 'heading3',
    children: 'Heading3',
  },
}

export const Body1: Story = {
  args: {
    as: 'p',
    variant: 'body1',
    children: 'Body1',
  },
}

export const Body2: Story = {
  args: {
    as: 'p',
    variant: 'body2',
    children: 'Body2',
  },
}

export const Subtitle1: Story = {
  args: {
    as: 'p',
    variant: 'subtitle1',
    children: 'Subtitle1',
  },
}

export const Subtitle2: Story = {
  args: {
    as: 'p',
    variant: 'subtitle2',
    children: 'Subtitle2',
  },
}

export const Caption: Story = {
  args: {
    as: 'span',
    variant: 'caption',
    children: 'Caption',
  },
}

export const Overline: Story = {
  args: {
    as: 'p',
    variant: 'overline',
    children: 'Overline',
  },
}

export const Link1: Story = {
  args: {
    as: 'a',
    variant: 'link1',
    children: 'Link1',
  },
}

export const Link2: Story = {
  args: {
    as: 'a',
    variant: 'link2',
    children: 'Link2',
  },
}
