import WareHouseService from '../services/WareHouseService'
import PickupPoint from '../../utils/InventoryOfStores/PickupPoint'

const getWarehouse = (
  warehouseId: any,
  pickupPointId: any,
  warehouseName: string,
  inventoryStores: any,
  inventory: any,
  stock: any,
  inventoryAvailability: any,
  show: any
) => {
  WareHouseService.getById(warehouseId).then(
    res => {
      if (res.data) {
        const { pickupPointIds } = res.data
        pickupPointId =
          pickupPointIds[0] === warehouseName
            ? pickupPointIds[1]
            : pickupPointIds[0]

        inventoryStores.push(
          PickupPoint.getPickupPoint(
            inventory,
            warehouseName,
            stock,
            inventoryAvailability,
            show,
            pickupPointId
          )
        )
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
  return inventoryStores
}

export default { getWarehouse }
