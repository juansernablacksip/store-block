import InventorySkuService from '../services/InventoryService'

// Get Inventory first SKU of product items[0].itemId
const getInventory = (items: any) => {
  let SkuInventory = [{}]
  InventorySkuService.getById(items[0].itemId).then(
    res => {
      const { balance } = res.data
      SkuInventory = balance
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
  return SkuInventory
}

export default { getInventory }
