/**
 * Set value of key
 * @param string key
 * @param string value
 * @param number | Date expiresMin
 * @param string path
 * @returns void
 */
export function set(
  key: string,
  value: any,
  expiresMin?: number | Date,
  path: string = "/"
): void {
  let expires = "";
  if (expiresMin) {
    if (!(expiresMin instanceof Date)) {
      const today = new Date();
      today.setTime(today.getTime() + expiresMin * 60 * 1000);
      expiresMin = today;
    }
    expires = expiresMin.toUTCString();
  }

  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value
  )};expires=${expires};path=${path}`;
}

/** Get value of key
 * @param string key
 * @param boolean isJsonDecode
 * @returns string
 */
export function get(key: string, isJsonDecode: boolean = true, defaultValue: any = ''): any {
  const cookies: Array<string> = document.cookie.split(";");
  key = encodeURIComponent(key);
  const result = cookies
    .map((cookie: string) => cookie.trimStart())
    .find((cookie: string) => {
      const cookieInfo: Array<string> = cookie.split("=", 2);
      return cookieInfo[0] === key;
    });

  if (result) {
    if (isJsonDecode) {
      try {
        return JSON.parse(decodeURIComponent(result.replace(`${key}=`, "")));
      } catch (e) {}
    }
    return decodeURIComponent(result.replace(`${key}=`, ""));
  }
  return defaultValue;
}

/**
 * Delete from key
 * @param string key
 * @returns void
 */
export function remove(key: string): void {
  document.cookie = `${encodeURIComponent(
    key
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

/**
 * Check Exist from key
 * @param string key
 * @returns boolean
 */
export function exist(key: string): boolean {
  key = key.replace(/[.*+?^${}()|[\]\\]/, "\\$&");
  const regex = new RegExp(`(^\\s*${key}=)|(;\\s*${key}=)`);
  return regex.test(decodeURIComponent(document.cookie));
}
