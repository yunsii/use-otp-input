/**
 * @title useOTPInput
 * @description useOTPInput description
 */

import { useOTPInput } from 'react-otp-input-pro'
import React from 'react'

export default function Demo() {
  const otpInput1 = useOTPInput({
    length: 8,
    normalizeValue(value, prevValue) {
      return !Number.isNaN(Number(value)) ? Number(value).toString() : prevValue
    },
  })
  const otpInput2 = useOTPInput({})

  return (
    <div className={`[&>div]:my-3`}>
      <div>
        {otpInput1.inputProps.map((inputItemProps, index) => {
          return (
            <input
              key={index}
              className='outline max-w-[2em]'
              {...inputItemProps}
            />
          )
        })}
      </div>
      <div>
        {otpInput2.inputProps.map((inputItemProps, index, array) => {
          return (
            <React.Fragment key={index}>
              <input className='outline max-w-[2em]' {...inputItemProps} />
              {index + 1 !== array.length && <span>💎</span>}
            </React.Fragment>
          )
        })}
      </div>
      <button
        onClick={() => {
          otpInput1.clearInput()
          otpInput2.clearInput()
        }}
      >
        clear
      </button>
      <br />
      <br />

      <input className='outline max-w-20' />
    </div>
  )
}
