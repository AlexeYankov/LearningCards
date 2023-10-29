import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import s from './scrollbar.module.scss'

export type ScrollbarProps = {
  children: ReactNode
  className?: string
  maxHeight?: number | string
  maxWidth?: number | string
  type?: ScrollArea.ScrollAreaProps['type']
} & ComponentPropsWithoutRef<'div'>

export const ScrollBar: FC<ScrollbarProps> = ({
  children,
  className,
  maxHeight = '100%',
  maxWidth = '100%',
  type = 'auto',
  ...rest
}) => {
  const maxHeightConverted = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
  const maxWidthConverted = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth

  const viewportStyles = { maxHeight: maxHeightConverted, maxWidth: maxWidthConverted }

  return (
    <ScrollArea.Root asChild type={type}>
      <div className={s.root} {...rest}>
        <ScrollArea.Viewport className={s.viewport} children={children} style={viewportStyles} />
        <ScrollArea.Scrollbar className={s.scrollbar} orientation="vertical">
          <ScrollArea.Thumb className={s.thumb} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className={s.scrollbar} orientation="horizontal">
          <ScrollArea.Thumb className={s.thumb} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </div>
    </ScrollArea.Root>
  )
}
