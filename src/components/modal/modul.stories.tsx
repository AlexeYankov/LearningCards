import { Meta, StoryObj } from '@storybook/react'
import { Modal, ModalDescription, ModalTitle } from './modal'
import { Typography } from '@/components/typography'
import { ScrollBar } from '@/components/scrollbar'

const meta = {
  argTypes: {},
  component: Modal,
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
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa`

export const ModalDemo: Story = {
  args: {
    children: <Modal />,
  },
  render: () => (
    <Modal>
      <ModalTitle title={'Title'} />
      <ModalDescription>
        <Typography variant={'body1'} as={'p'}>
          {loremText}
        </Typography>
      </ModalDescription>
    </Modal>
  ),
}

export const ModalTitleDemo: Story = {
  render: () => (
    <Modal>
      <ModalTitle title={'Title'} />
    </Modal>
  ),
}

export const ModalDescriptionDemo: Story = {
  render: () => (
    <Modal>
      <ModalDescription>
        <ScrollBar maxHeight="40vh">
          <Typography variant={'body1'} as={'p'}>
            <p>{loremText}</p>
          </Typography>
        </ScrollBar>
      </ModalDescription>
    </Modal>
  ),
}

export const ModalScrollbarDescriptionDemo: Story = {
  render: () => (
    <Modal>
      <ModalDescription>
        <ScrollBar maxHeight="40vh">
          <Typography variant={'body1'} as={'p'}>
            <p>{loremText}</p>
            <p>{loremText}</p>
            <p>{loremText}</p>
            <p>{loremText}</p>
            <p>{loremText}</p>
            <p>{loremText}</p>
            <p>{loremText}</p>
            <p>{loremText}</p>
          </Typography>
        </ScrollBar>
      </ModalDescription>
    </Modal>
  ),
}
