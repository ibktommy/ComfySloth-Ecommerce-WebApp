export const formatPrice = (number) => {
  const formattedNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)

  return formattedNumber
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])

  if (type === 'colors') {
    unique = unique.flat()
  }
  
  return ['all', ...new Set(unique)]
}
