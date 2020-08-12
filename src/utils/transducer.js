const transducer = {
  toHot(value) {
    try {
      return JSON.stringify(value, null, ' ')
    } catch (e) {
      return value && typeof value.toString === 'function' ? value.toString() : ''
    }
  },
  toNative(value) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return {}
    }
  }
}
