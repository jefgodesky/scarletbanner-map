const roundDistance = (km: number): string => {
  const fmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })
  return fmt.format(km) + ' km'
}

export default roundDistance
