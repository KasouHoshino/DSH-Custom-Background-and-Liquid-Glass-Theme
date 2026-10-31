/**
 * Host half: the feature is a client-side visual layer, so nothing runs here. The
 * row still has to resolve, hence this empty plugin object.
 */
export const name = 'custom-background';

export const inject = [];

export function apply() {
  // Intentionally empty.
}
