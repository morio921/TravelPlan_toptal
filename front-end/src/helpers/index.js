export const isFieldRequired = value =>
  value ? undefined : 'This Field is Required.'

export const ucFirst = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)
