const stockAvailabilityMessage = (
  inventoryAvailability: any,
  stock: number,
  show: any
) => {
  if (stock === 0) {
    return show.inventoryAvailabilityLabelZeroAvailability
      ? inventoryAvailability.labelZeroAvailability
      : stock
  } else if (stock < inventoryAvailability.valueAvailability) {
    return show.inventoryAvailabilityLabelStock
      ? stock + inventoryAvailability.labelLowLevelAvailability
      : inventoryAvailability.labelLowLevelAvailability
  } else if (stock === inventoryAvailability.valueAvailability) {
    return show.inventoryAvailabilityLabelStock
      ? stock + inventoryAvailability.labelMiddleLevelAvailability
      : inventoryAvailability.labelMiddleLevelAvailability
  } else {
    return show.inventoryAvailabilityLabelStock
      ? stock + inventoryAvailability.labelHighLevelAvailability
      : inventoryAvailability.labelHighLevelAvailability
  }
}

export default { stockAvailabilityMessage }
