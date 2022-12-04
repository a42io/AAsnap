/**
 * The snap origin to use.
 * Will default to the local hosted snap if no value is provided in environment.
 */
export const defaultSnapOrigin =
  process.env.REACT_APP_SNAP_ORIGIN ?? `npm:@a42/aasnap`;
