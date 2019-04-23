/*
 * Globals
 * */
export class Global {

  /*
   * Get value
   * */
  static get(key: string) {
    return global[this.key(key)]
  }

  /*
   * Set value
   * */
  static set(key: string, value: any) {
    global[this.key(key)] = value
  }

  /*
   * Set if undefined or null
   * */
  static setIfEmpty(key: string, value: any) {
    const current = this.get(key)

    if(typeof current === 'undefined' || current === null) {
      this.set(key, value)

      return true
    }

    return false
  }

  /*
   * Generate key
   * */
  private static key(key: string): string {
    return `pkg.${key}`
  }

}
