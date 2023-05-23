/**
 * Check Exist from key
 * @param string key
 * @returns boolean
 */
export function exist(key: string): boolean {
  return !!localStorage.getItem(key);
}

/** Get localStorage value of key
 * @param string key
 * @returns string | null
 */
export function get(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * Set localStorage value of key
 * @param string key
 * @param string value
 * @returns void
 */
export function set(key: string, value: string): void {
  localStorage.setItem(key, value);
}

/**
 * Delete localStorage from key
 * @param string key
 * @returns void
 */
export function remove(key: string): void {
  localStorage.removeItem(key);
}
