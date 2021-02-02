/*const loadInventoryOfStores = () => {
  const { items } = product

  let inventoryStores: any = []

  setStores(Inventory.getInventory(items))

  stores.map((store: any) => {
    let pickupPointId = ''
    let inventory = {}

    const {
      totalQuantity,
      reservedQuantity,
      warehouseName,
      warehouseId,
    } = store

    const stock = totalQuantity - reservedQuantity

    inventoryStores = Warehouse.getWarehouse(
      warehouseId,
      pickupPointId,
      warehouseName,
      inventoryStores,
      inventory,
      stock,
      inventoryAvailability,
      show
    )
  })

  // Separate inventory stores of inventory stores filters
  setStoresWithInventoryProduct(inventoryStores)
  setStoresFiltered(inventoryStores)
}
*/
