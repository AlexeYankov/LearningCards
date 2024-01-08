import { Ref, forwardRef } from 'react'

export const MoreIcon = forwardRef<SVGSVGElement, any>((props, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      fill={'none'}
      height={'24'}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={'24'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g id={'more-vertical-outline'}>
        <g id={'Group 1399'}>
          <circle cx={'12'} cy={'12'} id={'Ellipse 106'} r={'8.5'} stroke={'white'} />
          <g clipPath={'url(#clip0_5928_6784)'} id={'more-vertical-outline_2'}>
            <g id={'Layer 2'}>
              <g id={'more-vertical'}>
                <path
                  d={
                    'M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                  }
                  fill={'white'}
                  id={'Vector'}
                />
                <path
                  d={
                    'M12 9.5C12.5523 9.5 13 9.05228 13 8.5C13 7.94772 12.5523 7.5 12 7.5C11.4477 7.5 11 7.94772 11 8.5C11 9.05228 11.4477 9.5 12 9.5Z'
                  }
                  fill={'white'}
                  id={'Vector_2'}
                />
                <path
                  d={
                    'M12 16.5C12.5523 16.5 13 16.0523 13 15.5C13 14.9477 12.5523 14.5 12 14.5C11.4477 14.5 11 14.9477 11 15.5C11 16.0523 11.4477 16.5 12 16.5Z'
                  }
                  fill={'white'}
                  id={'Vector_3'}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
      <defs>
        <clipPath id={'clip0_5928_6784'}>
          <rect fill={'white'} height={'12'} transform={'translate(6 6)'} width={'12'} />
        </clipPath>
      </defs>
    </svg>
  )
})
