import { Meta, StoryObj } from '@storybook/react'
import { Modal, ModalDescription, ModalTitle } from './modal'
import { Typography } from '@/components/typography'
import { ScrollBar } from '@/components/scrollbar'
import { TextField } from '../textField'
import { CheckBox } from '@/components/checkbox'
import s from './modal.module.scss'
import { Select } from '@/components/select'
import { Button } from '@/components/button'
import img from './../../asserts/Mask.png'
import { Image } from '@/asserts/icons/components/Image.tsx'

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
      <Select
        label={'Select-box'}
        options={['Select item 1', 'Select item 2', 'Select item 3']}
        classname={s.select}
        selectId={'Select-box'}
        placeholder={'Select-box'}
        reversed
      />
      <TextField label={'Input'} placeholder={'Input'} inputId={'Input1'} />
      <TextField label={'Input'} placeholder={'Input'} inputId={'Input2'} />
      <CheckBox
        IconID={'checkbox-unselected'}
        SelectedIconID={'checkbox-selected'}
        disabled={false}
        height={'24'}
        label={'Check-box'}
        width={'24'}
        checkboxId={'Check-box'}
      />
    </Modal>
  ),
}

export const ModalWithImageDemo: Story = {
  render: () => (
    <Modal className={s.contentComponents}>
      <Select
        label={'Select-box'}
        options={['Select item 1', 'Select item 2', 'Select item 3']}
        classname={s.select}
        placeholder={'Select-box'}
        reversed
        selectId={'Select-box'}
      />
      <Typography variant={'subtitle2'} as={'p'}>
        Question:
      </Typography>
      <img className={s.img} src={img} alt="card image" />
      <Button className={s.buttonModal} variant={'secondary'} icon={<Image />} fullWidth>
        Change Cover
      </Button>
      <Typography variant={'subtitle2'} as={'p'}>
        Answer:
      </Typography>
      <img className={s.img} src={img} alt="card image" />
      <Button className={s.buttonModal} variant={'secondary'} icon={<Image />} fullWidth>
        Change Cover
      </Button>
      <TextField label={'Input'} placeholder={'Input'} inputId={'Input'} />
      <CheckBox
        IconID={'checkbox-unselected'}
        SelectedIconID={'checkbox-selected'}
        disabled={false}
        height={'24'}
        label={'Check-box'}
        checkboxId={'Check-box'}
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
        <Button variant="secondary" classNameBtnBox={s.btnBox}>
          Button secondary
        </Button>
        <Button variant="primary" classNameBtnBox={s.btnBox}>
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
        <img className={s.img} src={img} alt="card image" />
        <Button className={s.buttonModal} variant={'secondary'} icon={<Image />} fullWidth>
          Change Cover
        </Button>
        <TextField label={'Name Pack'} placeholder={'Name'} inputId={'Name Pack'} />
        <CheckBox
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          disabled={false}
          height={'24'}
          label={'Private Pack'}
          width={'24'}
          checkboxId={'Private Pack'}
        />
      </div>
      <div className={`${s.contentBtn} ${s.contentBtns}`}>
        <Button variant="secondary" classNameBtnBox={s.btnBox}>
          Cancel
        </Button>
        <Button variant="primary" classNameBtnBox={s.btnBox}>
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
          label={'Choose a question format'}
          options={['Select item 1', 'Select item 2', 'Select item 3']}
          classname={s.select}
          placeholder={'Picture'}
          selectId={'newCardSelectId'}
          reversed
        />
        <Typography variant={'subtitle2'} as={'p'}>
          Question:
        </Typography>
        <img className={s.img} src={img} alt="card image" />
        <Button className={s.buttonModal} variant={'secondary'} icon={<Image />} fullWidth>
          Change Cover
        </Button>
        <Typography variant={'subtitle2'} as={'p'}>
          Answer:
        </Typography>
        <img className={s.img} src={img} alt="card image" />
        <Button className={s.buttonModal} variant={'secondary'} icon={<Image />} fullWidth>
          Change Cover
        </Button>
      </div>
      <div className={`${s.contentBtn} ${s.contentBtns}`}>
        <Button variant="secondary" classNameBtnBox={s.btnBox}>
          Cancel
        </Button>
        <Button variant="primary" classNameBtnBox={s.btnBox}>
          Add New Card
        </Button>
      </div>
    </Modal>
  ),
}
