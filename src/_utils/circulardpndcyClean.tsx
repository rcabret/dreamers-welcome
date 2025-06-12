export function removeCircularReference(obj: any, seen = new WeakSet()): any {
  if (obj !== null && typeof obj === 'object') {
    if (seen.has(obj)) return null

    seen.add(obj)

    if (Array.isArray(obj)) {
      return obj.map(item => removeCircularReference(item, seen)).filter(item => item !== undefined)
    }

    const newObj: any = {}
    for (const key in obj) {
      const value = removeCircularReference(obj[key], seen)
      newObj[key] = value === undefined ? null : value
    }
    return newObj
  }

  return obj === undefined ? null : obj
}
