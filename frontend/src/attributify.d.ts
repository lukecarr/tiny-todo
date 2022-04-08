/* eslint-disable no-unused-vars */
import { UtilityNames, VariantNames } from 'windicss/types/jsx'

declare type FixedUtilityNames = UtilityNames | 'rounded'
declare type AttributifyNames<Prefix extends string = ''> = `${Prefix}${FixedUtilityNames}` | `${Prefix}${VariantNames}` | `${Prefix}${VariantNames}:${FixedUtilityNames}`;
interface AttributifyAttributes extends Partial<Record<AttributifyNames, string>> {}

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}
