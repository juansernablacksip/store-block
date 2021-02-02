import PickupPointService from '../services/PickupPointService'
import Availability from '../StockAvailabilityMessage'

const getPickupPoint = (
  inventory: any,
  warehouseName: string,
  stock: any,
  inventoryAvailability: any,
  show: any,
  pickupPointId: string
) => {
  PickupPointService.getById(pickupPointId).then(
    res => {
      const { address, businessHours, instructions } = res.data

      inventory = {
        warehouseName: warehouseName,
        stock: Availability.stockAvailabilityMessage(
          inventoryAvailability,
          stock,
          show
        ),
        stockNumber: stock,
        pickupPoint: {
          warehouseName: warehouseName,
          address: address,
          businessHours: businessHours,
          instructions: instructions,
        },
      }
    }
    /*,error => {
      const requestError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      setErrorMessage(requestError)
    }*/
  )
  return inventory
}

export default { getPickupPoint }
