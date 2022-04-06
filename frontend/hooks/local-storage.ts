import { useEffect } from 'preact/hooks'
import { Updater, useImmer } from 'use-immer'

/**
 * Hook for accessing and manipulating local storage, with support for an
 * initial value.
 * 
 * @param key The local storage item's key (preferably lowerCamelCase).
 * @param initialValue The initial value of the local storage item.
 * @returns The value of the local storage item, and a setter method.
 */
export function useLocalStorage<T = any>(key: string, initialValue: T): [T, Updater<T>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useImmer<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }, [storedValue])

  return [storedValue, setStoredValue]
}