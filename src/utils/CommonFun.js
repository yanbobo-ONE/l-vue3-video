/**
 * 引入本地资源
 * @param {*} name
 * @returns
 */
export const getAssetsResource = (name) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href
}
