import { Image } from '@/asserts/icons/components/Image.tsx'
import { Typography } from '@/components/ui/typography'
import { Meta, StoryObj } from '@storybook/react'

import s from './modal.module.scss'

import { TextField } from '../textField'
import img from '@/asserts/Mask.png'
import { Modal, ModalDescription, ModalTitle } from './modal'
import { ScrollBar } from '../scrollbar'
import { Select } from '../select'
import { CheckBox } from '../checkbox'
import { Button } from '../button'

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
        <ScrollBar maxHeight={'40vh'}>
          <Typography as={'p'} variant={'body1'}>
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
        <ScrollBar maxHeight={'40vh'}>
          <Typography as={'p'} variant={'body1'}>
            {loremText}
          </Typography>
          <Typography as={'p'} variant={'body1'}>
            {loremText}
          </Typography>
          <Typography as={'p'} variant={'body1'}>
            {loremText}
          </Typography>
          <Typography as={'p'} variant={'body1'}>
            {loremText}
          </Typography>
          <Typography as={'p'} variant={'body1'}>
            {loremText}
          </Typography>
          <Typography as={'p'} variant={'body1'}>
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
      <Select
        classname={s.select}
        label={'Select-box'}
        options={['Select item 1', 'Select item 2', 'Select item 3']}
        placeholder={'Select-box'}
        reversed
        selectId={'Select-box'}
      />
      <TextField inputId={'Input1'} label={'Input'} placeholder={'Input'} />
      <TextField inputId={'Input2'} label={'Input'} placeholder={'Input'} />
      <CheckBox
        IconID={'checkbox-unselected'}
        SelectedIconID={'checkbox-selected'}
        checkboxId={'Check-box'}
        disabled={false}
        height={'24'}
        label={'Check-box'}
        width={'24'}
      />
    </Modal>
  ),
}

export const ModalWithImageDemo: Story = {
  render: () => (
    <Modal className={s.contentComponents}>
      <Select
        classname={s.select}
        label={'Select-box'}
        options={['Select item 1', 'Select item 2', 'Select item 3']}
        placeholder={'Select-box'}
        reversed
        selectId={'Select-box'}
      />
      <Typography as={'p'} variant={'subtitle2'}>
        Question:
      </Typography>
      <img alt={'card image'} className={s.img} src={img} />
      <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
        Change Cover
      </Button>
      <Typography as={'p'} variant={'subtitle2'}>
        Answer:
      </Typography>
      <img alt={'card image'} className={s.img} src={img} />
      <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
        Change Cover
      </Button>
      <TextField inputId={'Input'} label={'Input'} placeholder={'Input'} />
      <CheckBox
        IconID={'checkbox-unselected'}
        SelectedIconID={'checkbox-selected'}
        checkboxId={'Check-box'}
        disabled={false}
        height={'24'}
        label={'Check-box'}
        width={'24'}
      />
    </Modal>
  ),
}

export const ModalPrimaryButton: Story = {
  render: () => (
    <Modal className={s.contentBtn}>
      <div>
        <Button className={s.buttonModal} variant={'primary'}>
          Button primary
        </Button>
      </div>
    </Modal>
  ),
}

export const ModalButtons: Story = {
  render: () => (
    <Modal>
      <div className={`${s.contentBtn} ${s.contentBtns}`}>
        <Button classNameBtnBox={s.btnBox} variant={'secondary'}>
          Button secondary
        </Button>
        <Button classNameBtnBox={s.btnBox} variant={'primary'}>
          Button primary
        </Button>
      </div>
    </Modal>
  ),
}

export const ModalAddNewPack: Story = {
  render: () => (
    <Modal>
      <ModalTitle title={'Add New Pack'} />
      <div className={s.contentComponents}>
        <img alt={'card image'} className={s.img} src={img} />
        <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
          Change Cover
        </Button>
        <TextField inputId={'Name Pack'} label={'Name Pack'} placeholder={'Name'} />
        <CheckBox
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          checkboxId={'Private Pack'}
          disabled={false}
          height={'24'}
          label={'Private Pack'}
          width={'24'}
        />
      </div>
      <div className={`${s.contentBtn} ${s.contentBtns}`}>
        <Button classNameBtnBox={s.btnBox} variant={'secondary'}>
          Cancel
        </Button>
        <Button classNameBtnBox={s.btnBox} variant={'primary'}>
          Add New Pack
        </Button>
      </div>
    </Modal>
  ),
}

export const ModalAddNewCard: Story = {
  render: () => (
    <Modal>
      <ModalTitle title={'Add New Card'} />
      <div className={s.contentComponents}>
        <Select
          classname={s.select}
          label={'Choose a question format'}
          options={['Select item 1', 'Select item 2', 'Select item 3']}
          placeholder={'Picture'}
          reversed
          selectId={'newCardSelectId'}
        />
        <Typography as={'p'} variant={'subtitle2'}>
          Question:
        </Typography>
        <img alt={'card image'} className={s.img} src={img} />
        <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
          Change Cover
        </Button>
        <Typography as={'p'} variant={'subtitle2'}>
          Answer:
        </Typography>
        <img alt={'card image'} className={s.img} src={img} />
        <Button className={s.buttonModal} fullWidth icon={<Image />} variant={'secondary'}>
          Change Cover
        </Button>
      </div>
      <div className={`${s.contentBtn} ${s.contentBtns}`}>
        <Button classNameBtnBox={s.btnBox} variant={'secondary'}>
          Cancel
        </Button>
        <Button classNameBtnBox={s.btnBox} variant={'primary'}>
          Add New Card
        </Button>
      </div>
    </Modal>
  ),
}
