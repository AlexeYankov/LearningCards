import { useState } from 'react'

import img from '@/asserts/Mask.png'
import { ImageIcon } from '@/asserts/icons'
import { Typography } from '@/components/ui/typography'
import { Meta, StoryObj } from '@storybook/react'

import s from './modal.module.scss'

import { Button } from '@/components/ui/button'
import { CheckBox } from '@/components/ui/checkbox'
import { ScrollBar } from '../scrollbar'
import { Select } from '../select'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal/modal'
import { TextField } from '@/components/ui/textField'
import { BrowserRouterDecorator, ReduxStoreProviderDecorator, ThemeDecorator } from '@/decorators'

const meta = {
  argTypes: {},
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator, ThemeDecorator],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa`

export const ModalTitleDemo: Story = {
  render: () => (
    <Modal triggerName={<Button>Test</Button>}>
      <ModalTitle title={'Title'} />
    </Modal>
  ),
}

export const ModalDescriptionDemo: Story = {
  render: () => (
    <Modal triggerName={<Button>Test</Button>}>
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
    <Modal triggerName={<Button>Test</Button>}>
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
  render: () => {
    const [isCheck, setIsCheck] = useState(false)

    return (
      <Modal className={s.contentComponents} triggerName={<Button>Test</Button>}>
        <Select
          classname={s.select}
          label={'Select-box'}
          options={['Select item 1', 'Select item 2', 'Select item 3']}
          reversed
          selectId={'Select-box'}
        />
        <TextField inputId={'Input1'} label={'Input'} placeholder={'Input'} />
        <TextField inputId={'Input2'} label={'Input'} placeholder={'Input'} />
        <CheckBox
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          checkboxId={'checkboxIdSecondary'}
          checked={isCheck}
          label={'checkBox'}
          onChange={() => setIsCheck(!isCheck)}
        />
      </Modal>
    )
  },
}

export const ModalWithImageDemo: Story = {
  render: () => (
    <Modal className={s.contentComponents} triggerName={<Button>Test</Button>}>
      <Select
        classname={s.select}
        label={'Select-box'}
        options={['Select item 1', 'Select item 2', 'Select item 3']}
        reversed
        selectId={'Select-box'}
      />
      <Typography as={'p'} variant={'subtitle2'}>
        Question:
      </Typography>
      <img alt={'card image'} className={s.img} src={img} />
      <Button className={s.buttonModal} fullWidth icon={<ImageIcon />} variant={'secondary'}>
        Change Cover
      </Button>
      <Typography as={'p'} variant={'subtitle2'}>
        Answer:
      </Typography>
      <img alt={'card image'} className={s.img} src={img} />
      <Button className={s.buttonModal} fullWidth icon={<ImageIcon />} variant={'secondary'}>
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
    <Modal className={s.contentBtn} triggerName={<Button>Test</Button>}>
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
    <Modal triggerName={<Button>Test</Button>}>
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

export const ModalAddNewDeck: Story = {
  render: () => {
    // const [isCheck, setIsCheck] = useState(false)

    return (
      <Modal triggerName={<Button>Test</Button>}>
        <ModalTitle title={'Add New Deck'} />
        <div className={s.contentComponents}>
          <img alt={'card image'} className={s.img} src={img} />
          <Button className={s.buttonModal} fullWidth icon={<ImageIcon />} variant={'secondary'}>
            Change Cover
          </Button>
          <TextField inputId={'Name Deck'} label={'Name Deck'} placeholder={'Name'} />
          <CheckBox
            IconID={'checkbox-unselected'}
            SelectedIconID={'checkbox-selected'}
            checkboxId={'Private Deck'}
            disabled={false}
            height={'24'}
            label={'Private Deck'}
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
    )
  },
}

export const ModalAddNewCard: Story = {
  render: () => (
    <Modal triggerName={<Button>Test</Button>}>
      <ModalTitle title={'Add New Card'} />
      <div className={s.contentComponents}>
        <Select
          classname={s.select}
          label={'Choose a question format'}
          options={['Select item 1', 'Select item 2', 'Select item 3']}
          reversed
          selectId={'newCardSelectId'}
        />
        <Typography as={'p'} variant={'subtitle2'}>
          Question:
        </Typography>
        <img alt={'card image'} className={s.img} src={img} />
        <Button className={s.buttonModal} fullWidth icon={<ImageIcon />} variant={'secondary'}>
          Change Cover
        </Button>
        <Typography as={'p'} variant={'subtitle2'}>
          Answer:
        </Typography>
        <img alt={'card image'} className={s.img} src={img} />
        <Button className={s.buttonModal} fullWidth icon={<ImageIcon />} variant={'secondary'}>
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
