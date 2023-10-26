import { Meta, StoryObj } from '@storybook/react'
import { Modal, ModalDescription, ModalTitle } from './modal'
import { Typography } from '@/components/typography'
import { ScrollBar } from '@/components/scrollbar'
import { TextField } from '@/components/input'
import { CheckBox } from '@/components/checkbox'
import s from './modal.module.scss'

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
            {loremText}
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
            {loremText}
          </Typography>
          <Typography variant={'body1'} as={'p'}>
            {loremText}
          </Typography>
          <Typography variant={'body1'} as={'p'}>
            {loremText}
          </Typography>
          <Typography variant={'body1'} as={'p'}>
            {loremText}
          </Typography>
          <Typography variant={'body1'} as={'p'}>
            {loremText}
          </Typography>
          <Typography variant={'body1'} as={'p'}>
            {loremText}
          </Typography>
        </ScrollBar>
      </ModalDescription>
    </Modal>
  ),
}

export const ModalWithComponentsDemo: Story = {
  render: () => (
    <Modal className={s.contentComponents}>
      <TextField label={'Select-box'} placeholder={'Select-box'} />
      <TextField label={'Input'} placeholder={'Input'} />
      <TextField label={'Input'} placeholder={'Input'} />
      <CheckBox
        IconID={'checkbox-unselected'}
        SelectedIconID={'checkbox-selected'}
        disabled={false}
        height={'24'}
        label={'Check-box'}
        width={'24'}
      />
    </Modal>
  ),
}
