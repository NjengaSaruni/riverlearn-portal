/**
 * Created by saruni on 8/26/17.
 */

export function capitalize(str: string): string {
  return str.replace(/\b(\w)/g, s => s.toUpperCase());
}
