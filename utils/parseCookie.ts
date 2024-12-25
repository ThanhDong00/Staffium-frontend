export const getCookieByName = (cookie: string, name: string) => {
  let match = cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null
}