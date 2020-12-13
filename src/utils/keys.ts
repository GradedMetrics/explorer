/**
 * This function takes the cached keys object and maps an API response's keys to use the normalised
 * versions from that object.
 * @param data Parsed JSON response from the API.
 * @returns {(Object|Array)} The normalised (key-mapped) object or array of objects.
 */
export const mapKeys = (data: Object | Object[]) => {
  const cachedKeys = sessionStorage.getItem('keys');

  if (!cachedKeys) {
    // This shouldn't happen unless the user clears storage between API calls.
    throw new Error('Unable to map keys as keys have not been cached.');
  }

  const keys = JSON.parse(cachedKeys);

  /**
   * This function maps the keys from the passed-in object to those stored in the key mapping
   * object. If a key is not contained in the key mapping it will default to using the original key
   * from the passed-in object.
   * @param object The object to normalise.
   * @returns {Object} The normalised object.
   */
  const normalise: (content: any) => any = (content) => {
    if (Array.isArray(content)) {
      return content.map(normalise);
    }

    if (content !== null && typeof content === 'object') {
      return Object.entries(content).reduce((response: Object, [originalKey, originalValue]) => {
        const key = keys[originalKey] || originalKey;

        if (originalValue !== null && typeof originalValue === 'object') {
          return {
            ...response,
            [key]: normalise(originalValue)
          };
        }

        return {
          ...response,
          [key]: originalValue,
        }
      }, {});
    }

    return content;
  };

  if (Array.isArray(data)) {
    /**
     * If the data passed in is an array of objects we iterate over it, normalising each entry to
     * return a normalised array.
     */
    return data.map(normalise);
  }

  // If the data itself is a single object we simply return the normalised version of that.
  return normalise(data);
}