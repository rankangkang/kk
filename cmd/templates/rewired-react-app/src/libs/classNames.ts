/**
 * 整合所有的classNames
 * @param names any[]
 * @returns className string
 */
export default function classNames(...names: any[]) {
  const items: string[] = []
  for (const name of names) {
    if (typeof name !== 'object') items.push(name)
    else if (Array.isArray(name)) {
      if (name.length) {
        const inner = classNames(name)
        if (inner) items.push(inner)
      }
    } else {
      if (name.toString === Object.getPrototypeOf(name).toString) {
        for (const key in name) {
          if (!!name[key]) items.push(key)
        }
        // {xx:xx}
      } else {
        // Date
        items.push(name.toString())
      }
    }
  }
  return items.join(' ')
}
