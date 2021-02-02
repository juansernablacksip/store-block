/*const sortWarehouseNameAlphapeticallyASC = (a: any, b: any) => {
  return a.warehouseName < b.warehouseName
    ? -1
    : a.warehouseName > b.warehouseName
    ? 1
    : 0
}
const sortWarehouseNameAlphapeticallyDESC = (a: any, b: any) => {
  return a.warehouseName < b.warehouseName
    ? 1
    : a.warehouseName > b.warehouseName
    ? -1
    : 0
}*/
const sortStockNumberASC = (a: any, b: any) => {
  return a.stockNumber < b.stockNumber
    ? -1
    : a.stockNumber > b.stockNumber
    ? 1
    : 0
}
const sortStockNumberDESC = (a: any, b: any) => {
  return a.stockNumber < b.stockNumber
    ? 1
    : a.stockNumber > b.stockNumber
    ? -1
    : 0
}

const StoreOrderBy = (
  inventoryStores: any,
  sortedBy: string,
  sortOrder: string
) => {
  if (sortedBy === 'stockNumber') {
    const orderedItems =
      sortOrder === 'ASC'
        ? inventoryStores.slice().sort(sortStockNumberASC)
        : inventoryStores.slice().sort(sortStockNumberDESC)
    console.log(orderedItems)
    // the above const could come out of an API call to sort items for example
    //setDataSort({ sortedBy, sortOrder })

    //setStoresFiltered(orderedItems)
  }
}

export default { StoreOrderBy }
