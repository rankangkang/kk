export function validString(val: any) {
  if (typeof val !== 'string') {
    return false
  }
  if (val.trim().length === 0) {
    return false
  }
  return true
}
