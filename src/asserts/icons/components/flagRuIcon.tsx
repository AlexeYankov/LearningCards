import { Ref, forwardRef } from 'react'

export const flagRuIcon = forwardRef<SVGSVGElement, any>((props, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      fill={'none'}
      height={'800px'}
      ref={ref}
      viewBox={'0 -4 28 28'}
      width={'800px'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={'url(#clip0_503_2726)'}>
        <rect
          fill={'white'}
          height={'19.5'}
          rx={'1.75'}
          stroke={'#F5F5F5'}
          strokeWidth={'0.5'}
          width={'27.5'}
          x={'0.25'}
          y={'0.25'}
        />
        <mask
          height={'20'}
          id={'mask0_503_2726'}
          maskUnits={'userSpaceOnUse'}
          style={{ maskType: 'alpha' }}
          width={'28'}
          x={'0'}
          y={'0'}
        >
          <rect
            fill={'white'}
            height={'19.5'}
            rx={'1.75'}
            stroke={'white'}
            strokeWidth={'0.5'}
            width={'27.5'}
            x={'0.25'}
            y={'0.25'}
          />
        </mask>
        <g mask={'url(#mask0_503_2726)'}>
          <path
            clipRule={'evenodd'}
            d={'M0 13.3333H28V6.66667H0V13.3333Z'}
            fill={'#0C47B7'}
            fillRule={'evenodd'}
          />
          <path
            clipRule={'evenodd'}
            d={'M0 20H28V13.3333H0V20Z'}
            fill={'#E53B35'}
            fillRule={'evenodd'}
          />
        </g>
      </g>
      <defs>
        <clipPath id={'clip0_503_2726'}>
          <rect fill={'white'} height={'20'} rx={'2'} width={'28'} />
        </clipPath>
      </defs>
    </svg>
  )
})
