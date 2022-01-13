type StorageValue<T> = {
  value: T,
  expire?: number
}

const localStorageKeyPrefix = 'bizseer_x_auth_'

const toLocalStorage = <T>(key: string, value: T) => {
  const str = JSON.stringify(value)
  window.localStorage.setItem(localStorageKeyPrefix + key, str)
}

const fromLocalStorage = <T>(key: string): StorageValue<T> | undefined => {
  const str = window.localStorage.getItem(localStorageKeyPrefix + key)
  try {
    const storageValue = JSON.parse(str as string) as StorageValue<T>
    if (storageValue?.expire! < new Date().getTime()) return removeLocalStorage(key)
    return storageValue
  } catch (err) {
    return undefined
  }
}

const removeLocalStorage = (key: string): undefined => {
  window.localStorage.removeItem(localStorageKeyPrefix + key)
  return undefined
}

class Storage {

  set<T = any>(key: string, value: StorageValue<T>) {
    toLocalStorage(key, value)
  }

  get<T = any>(key: string): T | undefined {
    return fromLocalStorage<T>(key)?.value
  }

  remove(key: string) {
    removeLocalStorage(key)
  }

}

export default new Storage()