import { Typography } from '@/components/ui/typography/typography'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/decorators'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
  decorators: [ThemeDecorator],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: () => JSX.Element = () => (
  <>
    <Typography as={'span'} variant={'large'}>
      Large
    </Typography>
    <Typography as={'h1'} variant={'heading1'}>
      Heading1
    </Typography>
    <Typography as={'h2'} variant={'heading2'}>
      Heading2
    </Typography>
    <Typography as={'h3'} variant={'heading3'}>
      Heading3
    </Typography>
    <Typography as={'p'} variant={'body1'}>
      Body1
    </Typography>
    <Typography as={'p'} variant={'body2'}>
      Body2
    </Typography>
    <Typography as={'p'} variant={'subtitle1'}>
      Subtitle1
    </Typography>
    <Typography as={'p'} variant={'subtitle2'}>
      Subtitle2
    </Typography>
    <Typography as={'span'} variant={'caption'}>
      Caption
    </Typography>
    <Typography as={'p'} variant={'overline'}>
      Overline
    </Typography>
    <Typography as={'a'} variant={'link1'}>
      Link1
    </Typography>
    <div>
      <Typography as={'a'} variant={'link2'}>
        Link2
      </Typography>
    </div>
  </>
)

export const Large: Story = {
  args: {
    as: 'span',
    children: 'Large',
    variant: 'large',
  },
}

export const Heading1: Story = {
  args: {
    as: 'h1',
    children: 'Heading1',
    variant: 'heading1',
  },
}

export const Heading2: Story = {
  args: {
    as: 'h2',
    children: 'Heading2',
    variant: 'heading2',
  },
}

export const Heading3: Story = {
  args: {
    as: 'h3',
    children: 'Heading3',
    variant: 'heading3',
  },
}

export const Body1: Story = {
  args: {
    as: 'p',
    children: 'Body1',
    variant: 'body1',
  },
}

export const Body2: Story = {
  args: {
    as: 'p',
    children: 'Body2',
    variant: 'body2',
  },
}

export const Subtitle1: Story = {
  args: {
    as: 'p',
    children: 'Subtitle1',
    variant: 'subtitle1',
  },
}

export const Subtitle2: Story = {
  args: {
    as: 'p',
    children: 'Subtitle2',
    variant: 'subtitle2',
  },
}

export const Caption: Story = {
  args: {
    as: 'span',
    children: 'Caption',
    variant: 'caption',
  },
}

export const Overline: Story = {
  args: {
    as: 'p',
    children: 'Overline',
    variant: 'overline',
  },
}

export const Link1: Story = {
  args: {
    as: 'a',
    children: 'Link1',
    variant: 'link1',
  },
}

export const Link2: Story = {
  args: {
    as: 'a',
    children: 'Link2',
    variant: 'link2',
  },
}
