import React from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: '',
  suffix: ' m2',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 8, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}
 
const AreaInput = ({ ...inputProps }) => {
  const currencyMask = createNumberMask(defaultMaskOptions)

  return <MaskedInput type='text' mask={currencyMask} {...inputProps} />
}
 
export default AreaInput