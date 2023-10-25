import { Meta, StoryObj } from '@storybook/react'
import { Modal } from './modal'

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

export const ModalDemo: Story = {
  args: {
    children: <Modal />,
  },
  render: () => <Modal />,
}
