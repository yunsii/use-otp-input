/**
 * @title useOTPInput
 * @description 🚀 Awesome React Hook for OTP Input
 */

/* eslint-disable no-console */
import { useOTPInput } from 'use-otp-input'
import React, { useState } from 'react'

const buttonCls = `bg-cyan-500 hover:bg-cyan-600 transition-all text-white font-bold py-2 px-4 rounded`
const borderGradients1 = [
  'border-[#9dc4fb]',
  'border-[#a1c4fb]',
  'border-[#aac4fb]',
  'border-[#b2c4fb]',
  'border-[#b8c4fb]',
  'border-[#c1c3fb]',
  'border-[#cbc3fb]',
  'border-[#d3c3fc]',
]
const textGradients1 = [
  'text-[#9dc4fb]',
  'text-[#a1c4fb]',
  'text-[#aac4fb]',
  'text-[#b2c4fb]',
  'text-[#b8c4fb]',
  'text-[#c1c3fb]',
  'text-[#cbc3fb]',
  'text-[#d3c3fc]',
]

export interface EnhanceInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties
}

const EnhanceInput = React.forwardRef<HTMLInputElement, EnhanceInputProps>(
  (props, ref) => {
    const { containerStyle, className, ...restInputProps } = props
    return (
      <div
        className={`w-12 h-12 bg-red-500 flex items-center justify-center rounded`}
        style={containerStyle}
      >
        <div className='w-10 h-10 rounded-sm bg-white'>
          <input
            className={`border-none outline-none rounded-sm w-full h-full text-center ${
              className || ''
            }`}
            ref={ref}
            {...restInputProps}
          />
        </div>
      </div>
    )
  },
)

EnhanceInput.displayName = 'EnhanceInput'

export default function Demo() {
  const [type, setType] = useState<'text' | 'password'>('text')
  const otpInput1 = useOTPInput({
    length: 8,
    normalizeValue(value, prevValue) {
      return !Number.isNaN(Number(value)) ? Number(value).toString() : prevValue
    },
  })
  const otpInput2 = useOTPInput({})
  const otpInput3 = useOTPInput({})
  const [inputValue, setInputValue] = useState('')

  const nextType = type === 'text' ? 'password' : 'text'

  return (
    <div className={`[&>div]:my-3`}>
      <div className='flex gap-2 flex-wrap'>
        <button
          onClick={() => {
            setInputValue('')
            otpInput1.clearInput()
            otpInput2.clearInput()
            otpInput3.clearInput()
          }}
          className={buttonCls}
        >
          Clear all inputs
        </button>
        <button
          onClick={() => {
            console.log(`otpInput1: "${otpInput1.getInput()}"`)
            console.log(`otpInput2: "${otpInput2.getInput()}"`)
            console.log(`otpInput3: "${otpInput3.getInput()}"`)
          }}
          className={buttonCls}
          title='Output results in console'
        >
          Get OTP inputs
        </button>
        <button
          onClick={() => {
            setType(nextType)
          }}
          className={buttonCls}
        >
          Toggle OTP inputs type to {nextType}
        </button>
      </div>
      <div className='flex gap-2 flex-wrap'>
        {otpInput1.inputProps.map((inputItemProps, index, array) => {
          return (
            <input
              key={index}
              className={`border-2 rounded outline-none w-10 h-10 text-center ${
                borderGradients1[array.length - 1 - index]
              } ${textGradients1[array.length - 1 - index]}`}
              {...inputItemProps}
              type={type}
            />
          )
        })}
        <span className='flex items-end text-xs text-gray-400 select-none'>
          (Number only)
        </span>
      </div>
      <div className='flex gap-2 items-center flex-wrap'>
        {otpInput2.inputProps.map((inputItemProps, index, array) => {
          return (
            <React.Fragment key={index}>
              <input
                className={`border-2 rounded outline-none w-10 h-10 text-center ${borderGradients1[index]} ${textGradients1[index]}`}
                type={type}
                {...inputItemProps}
              />
              {index + 1 !== array.length && (
                <span className='select-none'>💎</span>
              )}
            </React.Fragment>
          )
        })}
      </div>
      <div className='flex gap-2 items-center flex-wrap'>
        {otpInput3.inputProps.map((inputItemProps, index, array) => {
          return (
            <React.Fragment key={index}>
              <EnhanceInput
                {...inputItemProps}
                className={`text-center py-3 font-bold text-lg bg-clip-text bg-cover text-transparent caret-[#8554c8]`}
                style={{
                  backgroundImage:
                    'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
                }}
                containerStyle={{
                  backgroundColor: '#4158D0',
                  backgroundImage:
                    'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
                }}
                type={type}
              />
              {index + 1 !== array.length && (
                <span className='select-none'>✨</span>
              )}
            </React.Fragment>
          )
        })}
      </div>
      <hr />
      <div className='flex gap-2 flex-wrap'>
        <input
          value={inputValue}
          className='border rounded px-2'
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
        />
        <button
          onClick={() => {
            otpInput1.setInput(inputValue)
            otpInput2.setInput(inputValue)
            otpInput3.setInput(inputValue)
          }}
          className={buttonCls}
        >
          Set OTP inputs
        </button>
      </div>
    </div>
  )
}
