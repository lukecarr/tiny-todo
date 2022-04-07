import { useEffect } from 'preact/hooks'
import { Updater, useImmer } from 'use-immer'

/**
 * Attempts to retrieve (and JSON.parse) a local storage item.
 * 
 * @param key The key of the local storage item to retrieve.
 * @param initialValue The value to use if the item is not found.
 * @returns The local storage item's value.
 */
const getItem = <T>(key: string, initialValue: T): T => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.log(error)
    return initialValue
  }
}

/**
 * Sets the value of a local storage item, passing the value through
 * JSON.stringify first.
 * 
 * @param key The key of the local storage item to set/update.
 * @param value The local storage item's new value.
 */
const setItem = <T>(key: string, value: T) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * Hook for accessing and manipulating local storage, with support for an
 * initial value.
 * 
 * @param key The local storage item's key (preferably lowerCamelCase).
 * @param initialValue The initial value of the local storage item.
 * @returns The value of the local storage item, and a setter method.
 */
export function useLocalStorage<T = any>(key: string, initialValue: T): [T, Updater<T>] {
  const [storedValue, setStoredValue] = useImmer<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    return getItem(key, initialValue)
  })

  useEffect(() => setItem(key, storedValue), [key, storedValue])

  return [storedValue, setStoredValue]
}