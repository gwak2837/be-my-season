export const emailRegEx = /\S+@\S+[.\S+]*/

export async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export function formatPhoneNumber(phoneNumber: string) {
  const value = phoneNumber.replace(/\D/g, '')

  if (value.length >= 9) {
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`
  } else if (value.length >= 4) {
    return `${value.slice(0, 3)}-${value.slice(3)}`
  } else {
    return value
  }
}

export function isEmptyObject(obj: Record<string, unknown>) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}

export async function defaultFetcher(url: string) {
  const response = await fetch(url)
  return response.json()
}
