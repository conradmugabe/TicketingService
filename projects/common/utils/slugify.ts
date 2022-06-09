/**
 * @param str
 * @returns `string`
 * @description Slugify a string
 */
const slugify = (str: string): string => {
  return str.replace(/[^a-z0-9]/gi, "").toLowerCase();
};

export default slugify;
