import PickupPointService from './services/PickupPointService'

const loadFilters = () => {
  let dataOptionsCountry: any = []
  let dataOptionsState: any = []
  let dataOptionsCity: any = []
  PickupPointService.getAll().then(
    res => {
      res.data.map((pickupPoint: any) => {
        const countryName = pickupPoint.address.country.name
        const stateName = pickupPoint.address.state
        const cityName = pickupPoint.address.city
        const optionContry = {
          value: countryName,
          label: countryName,
        }
        const optionState = {
          value: stateName,
          label: stateName,
        }
        const optionCity = {
          value: cityName,
          label: cityName,
        }
        if (
          dataOptionsCountry.filter(
            (index: any) => index.value == optionContry.value
          ).length <= 0
        ) {
          dataOptionsCountry.push(optionContry)
        }
        if (
          dataOptionsState.filter(
            (index: any) => index.value == optionState.value
          ).length <= 0
        ) {
          dataOptionsState.push(optionState)
        }
        if (
          dataOptionsCity.filter(
            (index: any) => index.value == optionCity.value
          ).length <= 0
        ) {
          dataOptionsCity.push(optionCity)
        }
      })
    }
    /*
    ,error => {
      const requestError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      setErrorMessage(requestError)
    }*/
  )
  return { dataOptionsCountry, dataOptionsState, dataOptionsCity }
}

const filtering = (
  storesWithInventoryProduct: any,
  level1Value: any,
  level2Value: any,
  level3Value: any
) => {
  let filteredCitiesStores = storesWithInventoryProduct.filter((store: any) => {
    return (
      store.pickupPoint.address.country.name === level1Value &&
      store.pickupPoint.address.state === level2Value &&
      store.pickupPoint.address.city === level3Value
    )
  })
  return filteredCitiesStores
}

export default { filtering, loadFilters }
