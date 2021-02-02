import React, { useState, useEffect } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import {
  ButtonWithIcon,
  Divider,
  Modal,
  Table,
  Dropdown,
} from 'vtex.styleguide'
import { IconArrowBack, IconGlobe } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'
import { PickupAvailabilityProps } from '../../typings/pickup-availability'
import Map from './subcomponents/Map'

import InventorySkuService from '../../utils/services/InventoryService'
import WareHouseService from '../../utils/services/WareHouseService'
import PickupPointService from '../../utils/services/PickupPointService'

import { useQuery } from 'react-apollo'
import apiKeyQuery from '../../graphql/logistics.gql'

import BusinessHoursStore from '../../utils/BusinessHoursStore'
import filtersDropdowns from '../../utils/FiltersInventoryStoreByLevels'

const CSS_HANDLES = [
  'pa_PickupAvailabilityGlobalContainer',
  'pa_PickupAvailabilityOpenModalButtonContainer',
  'pa_PickupAvailabilityOpenModalButton',
  'pa_PickupAvailabilityOpenModalButtonText',
  'pa_PickupAvailabilityOpenModalButtonIcon',
  'pa_PickupAvailabilityModal',
  'pa_PickupAvailabilityModalTitleText',
  'pa_PickupAvailabilityModalDescriptionText',
  'pa_PickupAvailabilityModalDivider',
  'pa_PickupAvailabilityDropdownCustomContainer',
  'pa_PickupAvailabilityDropdownCustomLabelLevel1AndLabelLevel2Container',
  'pa_PickupAvailabilityDropdownCustomLabelLevel1Container',
  'pa_PickupAvailabilityDropdownCustomLabelLevel1',
  'pa_PickupAvailabilityDropdownCustomLabelLevel2Container',
  'pa_PickupAvailabilityDropdownCustomLabelLevel2',
  'pa_PickupAvailabilityDropdownCustomLabelLevel3Container',
  'pa_PickupAvailabilityDropdownCustomLabelLevel3Subcontainer',
  'pa_PickupAvailabilityDropdownCustomLabelLevel3',
  'pa_PickupAvailabilityTableContainer',
  'pa_PickupAvailabilityTable',
  'pa_PickupAvailabilityMapContainer',
  'pa_PickupAvailabilityMapButtonContainer',
  'pa_PickupAvailabilityMapButton',
  'pa_PickupAvailabilityMapButtonText',
  'pa_PickupAvailabilityMapButtonIcon',
  'pa_PickupAvailabilityMapArrowBackButton',
  'pa_PickupAvailabilityMapArrowBackButtonText',
  'pa_PickupAvailabilityMapArrowBackButtonIcon',
] as const

const PickupAvailability: StorefrontFunctionComponent<
  PickupAvailabilityProps
> = ({
  openModalButtonText,
  titleModal,
  descriptionModal,
  labelLevels,
  mapButtonText,
  mapArrowBackButtonText,
  inventoryAvailability,
  tableEmptyStateLabel,
  tableColumns,
  map,
  infoWindow,
  show,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  const { product } = useProduct()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSwitchModal, setIsSwitchModal] = useState(false)

  // Hide empty label message while department is not selected
  const [isTableEmptyStateLabel, setIsTableEmptyStateLabel] = useState(false)

  const [errorMessage, setErrorMessage] = useState()

  const [googleMapApiKey, setGoogleMapApiKey] = useState()

  const [level1Value, setlevel1Value] = useState()
  const [level2Value, setlevel2Value] = useState()
  const [level3Value, setlevel3Value] = useState()
  const [countries, setCountries]: any = useState([{}])
  const [states, setStates]: any = useState([{}])
  const [cities, setCities]: any = useState([{}])

  const [stores, setStores] = useState([{}])
  const [storesWithInventoryProduct, setStoresWithInventoryProduct] = useState(
    []
  )
  const [storesFiltered, setStoresFiltered] = useState([])

  const [pickupPointSelected, setPickupPointSelected] = useState({
    address: {
      country: {
        acronym: 'COL',
        name: 'Colombia',
      },
      location: {
        latitude: 4.7062754,
        longitude: -74.0510839,
      },
      state: '',
      street: '',
      neighborhood: '',
    },
    businessHours: [{}],
    instructions: '',
    warehouseName: 'tienda',
  })

  // GOOGLE MAP API KEY
  const { data } = useQuery(apiKeyQuery, {
    ssr: true,
    variables: {},
  })

  const availability = (stock: number) => {
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

  const loadInventoryOfStores = () => {
    // Get Inventory of stores
    const { items } = product

    // Get Inventory first SKU of product items[0].itemId
    const getInventory = () => {
      InventorySkuService.getById(items[0].itemId).then(
        res => {
          const { balance } = res.data
          setStores(balance)
        },
        error => {
          const requestError =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          setErrorMessage(requestError)
        }
      )
    }

    // Build availability Store
    let inventoryStores: any = []

    stores.map((store: any) => {
      const {
        totalQuantity,
        reservedQuantity,
        warehouseName,
        warehouseId,
      } = store

      const stock = totalQuantity - reservedQuantity

      let pickupPointId = ''
      let inventory = {}

      const getPickupPoint = (pickupPointId: string) => {
        PickupPointService.getById(pickupPointId).then(
          res => {
            const { address, businessHours, instructions } = res.data

            inventory = {
              warehouseName: warehouseName,
              stock: availability(stock),
              stockNumber: stock,
              pickupPoint: {
                warehouseName: warehouseName,
                address: address,
                businessHours: businessHours,
                instructions: instructions,
              },
            }
            inventoryStores.push(inventory)
            // Order items
            // Descendent
            inventoryStores.sort(
              (aStockStore: any, otherStockStore: any) =>
                otherStockStore.stockNumber - aStockStore.stockNumber
            )
          },
          error => {
            const requestError =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            setErrorMessage(requestError)
          }
        )
      }

      const getWarehouse = () => {
        WareHouseService.getById(warehouseId).then(
          res => {
            if (res.data) {
              const { pickupPointIds } = res.data
              pickupPointId =
                pickupPointIds[0] === warehouseName
                  ? pickupPointIds[1]
                  : pickupPointIds[0]
              getPickupPoint(pickupPointId)
            }
          },
          error => {
            const requestError =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            setErrorMessage(requestError)
          }
        )
      }

      getInventory()
      getWarehouse()
    })

    // Separate inventory stores of inventory stores filters
    setStoresWithInventoryProduct(inventoryStores)
    setStoresFiltered(storesWithInventoryProduct)
  }

  const handleToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    loadInventoryOfStores()

    const filters = filtersDropdowns.loadFilters()
    setCountries(filters.dataOptionsCountry)
    setStates(filters.dataOptionsState)
    setCities(filters.dataOptionsCity)
  }, [level1Value])

  const customSchema = {
    properties: {
      warehouseName: {
        title: tableColumns.labelColumnNameStore,
        width: 270,
        // sortable boolean in a schema property makes it sortable,
        // (clicking header triggers onSort callback).
        //sortable: true,
      },
      stock: {
        title: tableColumns.labelColumnAvailability,
        width: 230,
        // sortable boolean in a schema property makes it sortable,
        // (clicking header triggers onSort callback).
        //sortable: true,
      },
      pickupPoint: {
        title: tableColumns.labelColumnUbication,
        width: 200,
        cellRenderer: (cell: any) => {
          return (
            <div
              className={`fl w-100 ${handles.pa_PickupAvailabilityMapButtonContainer}`}
            >
              <ButtonWithIcon
                icon={
                  <IconGlobe
                    size={16}
                    className={`${handles.pa_PickupAvailabilityMapButtonIcon}`}
                  />
                }
                variation="tertiary"
                onClick={() => {
                  setPickupPointSelected(cell.rowData.pickupPoint)
                  setIsSwitchModal(true)
                  setGoogleMapApiKey(data.logistics.googleMapsKey)
                }}
                className={`${handles.pa_PickupAvailabilityMapButton}`}
              >
                <p className={`${handles.pa_PickupAvailabilityMapButtonText}`}>
                  {mapButtonText}
                </p>
              </ButtonWithIcon>
            </div>
          )
        },
      },
    },
  }

  return (
    <div className={`${handles.pa_PickupAvailabilityGlobalContainer}`}>
      {show.openModalButton && !errorMessage && (
        <React.Fragment>
          <div
            className={`fl w-60 ${handles.pa_PickupAvailabilityOpenModalButtonContainer}`}
          >
            <ButtonWithIcon
              icon={
                <IconGlobe
                  size={16}
                  className={`h-10 ${handles.pa_PickupAvailabilityOpenModalButtonIcon}`}
                />
              }
              variation="primary"
              onClick={handleToggle}
              className={`h-10 ${handles.pa_PickupAvailabilityOpenModalButton}`}
            >
              <p
                className={`pa3 mr2 ${handles.pa_PickupAvailabilityOpenModalButtonText}`}
              >
                {openModalButtonText}
              </p>
            </ButtonWithIcon>
          </div>
          <Modal
            isOpen={isModalOpen}
            responsiveFullScreen
            onClose={handleToggle}
            className={`${handles.pa_PickupAvailabilityModal}`}
          >
            {show.titleModal && (
              <h2
                className={`mt0 mb6 ${handles.pa_PickupAvailabilityModalTitleText}`}
              >
                {titleModal}
              </h2>
            )}
            {!isSwitchModal ? (
              <div>
                {' '}
                {show.descriptionModal && (
                  <p
                    className={`f6 gray ma0 ${handles.pa_PickupAvailabilityModalDescriptionText}`}
                  >
                    {descriptionModal}
                  </p>
                )}
                <br></br>
                {show.dividerModal && (
                  <Divider
                    orientation="horizontal"
                    className={`${handles.pa_PickupAvailabilityModalDivider}`}
                  />
                )}
                <br></br>
                {show.dropdownsCustom && (
                  <div
                    className={`mw9 center ph3-ns ${handles.pa_PickupAvailabilityDropdownCustomContainer}`}
                  >
                    <div
                      className={`cf ph2-ns ${handles.pa_PickupAvailabilityDropdownCustomLabelLevel1AndLabelLevel2Container}`}
                    >
                      <div
                        className={`fl w-100 w-50-ns pa2 ${handles.pa_PickupAvailabilityDropdownCustomLabelLevel1Container}`}
                      >
                        <Dropdown
                          className={`${handles.pa_PickupAvailabilityDropdownCustomLabelLevel1}`}
                          id="level1"
                          placeholder={labelLevels.labelLevel1}
                          label={labelLevels.labelLevel1}
                          options={countries}
                          value={level1Value}
                          onChange={(_e: any, value: any) => {
                            setlevel1Value(value)
                            setStoresFiltered(
                              filtersDropdowns.filtering(
                                storesWithInventoryProduct,
                                value,
                                level2Value,
                                level3Value
                              )
                            )
                          }}
                        />
                      </div>
                      <div
                        className={`fl w-100 w-50-ns pa2 ${handles.pa_PickupAvailabilityDropdownCustomLabelLevel2Container}`}
                      >
                        <Dropdown
                          className={`${handles.pa_PickupAvailabilityDropdownCustomLabelLevel2}`}
                          id="level2"
                          placeholder={labelLevels.labelLevel2}
                          label={labelLevels.labelLevel2}
                          options={states}
                          value={level2Value}
                          disabled={level1Value ? false : true}
                          onChange={(_e: any, value: any) => {
                            setlevel2Value(value)
                            setStoresFiltered(
                              filtersDropdowns.filtering(
                                storesWithInventoryProduct,
                                level1Value,
                                value,
                                level3Value
                              )
                            )
                          }}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div
                      className={`mw9 center ph3-ns ${handles.pa_PickupAvailabilityDropdownCustomLabelLevel3Container}`}
                    >
                      <div
                        className={`cf ph2-ns ${handles.pa_PickupAvailabilityDropdownCustomLabelLevel3Subcontainer}`}
                      >
                        <div className="fl w-100 pa2">
                          <Dropdown
                            className={`${handles.pa_PickupAvailabilityDropdownCustomLabelLevel3}`}
                            id="level3"
                            placeholder={labelLevels.labelLevel3}
                            label={labelLevels.labelLevel3}
                            options={cities}
                            value={level3Value}
                            disabled={level2Value ? false : true}
                            onChange={(_e: any, value: any) => {
                              setlevel3Value(value)
                              setStoresFiltered(
                                filtersDropdowns.filtering(
                                  storesWithInventoryProduct,
                                  level1Value,
                                  level2Value,
                                  value
                                )
                              )
                              setIsTableEmptyStateLabel(true)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <br></br>
                {show.storesTable && storesFiltered.length !== 0 && (
                  <div
                    className={`mb5 ${handles.pa_PickupAvailabilityTableContainer}`}
                  >
                    <Table
                      schema={customSchema}
                      items={storesFiltered}
                      emptyStateLabel={
                        storesFiltered.length === 0 &&
                        isTableEmptyStateLabel === true
                          ? tableEmptyStateLabel
                          : ''
                      }
                      /*sort={{
                        sortedBy: dataSort.sortedBy,
                        sortOrder: dataSort.sortOrder,
                      }}
                      onSort={handleSort}*/
                      indexColumnLabel="Index"
                      className={`${handles.pa_PickupAvailabilityTable}`}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={`${handles.pa_PickupAvailabilityMapContainer}`}>
                <ButtonWithIcon
                  icon={
                    <IconArrowBack
                      size={16}
                      className={`${handles.pa_PickupAvailabilityMapArrowBackButtonIcon}`}
                    />
                  }
                  onClick={() => {
                    setIsSwitchModal(false)
                  }}
                  className={`w-20 h-20 pa4 mr3 ${handles.pa_PickupAvailabilityMapArrowBackButton}`}
                  variation="tertiary"
                >
                  <p
                    className={`pa3 mr2 ${handles.pa_PickupAvailabilityMapArrowBackButtonText}`}
                  >
                    {mapArrowBackButtonText}
                  </p>
                </ButtonWithIcon>
                <br></br>
                <Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&v=3.exp&libraries=geometry,drawing,places`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{
                        height: map.height,
                        width: map.width,
                      }}
                    />
                  }
                  markers={[
                    {
                      name: pickupPointSelected.warehouseName,
                      direction:
                        pickupPointSelected.address.country.name +
                        ', ' +
                        pickupPointSelected.address.state +
                        ', ' +
                        pickupPointSelected.address.neighborhood +
                        ', ' +
                        pickupPointSelected.address.street,
                      phone:
                        pickupPointSelected.instructions === ''
                          ? undefined
                          : pickupPointSelected.instructions,
                      horary: BusinessHoursStore.businessHoursStore(
                        pickupPointSelected,
                        infoWindow
                      ),
                      lat: pickupPointSelected.address.location.latitude,
                      lgn: pickupPointSelected.address.location.longitude,
                    },
                  ]}
                  infoLabel={infoWindow}
                  mapElement={<div style={{ height: `100%` }} />}
                  icon={map.icon}
                  iconWidth={map.iconWidth}
                  iconHeight={map.iconHeight}
                  defaultZoom={map.defaultZoom}
                  zoom={map.defaultZoom}
                  center={{
                    lat: pickupPointSelected.address.location.latitude,
                    lng: pickupPointSelected.address.location.longitude,
                  }}
                />
              </div>
            )}
          </Modal>
        </React.Fragment>
      )}
    </div>
  )
}

PickupAvailability.defaultProps = {
  openModalButtonText: 'DISPONIBILIDAD EN TIENDAS',
  titleModal: 'Disponibilidad en tiendas',
  descriptionModal:
    'Selecciona tu pais, departamento y ciudad para las tiendas con despacho',
  labelLevels: {
    labelLevel1: 'Seleccione un pais',
    labelLevel2: 'Seleccione una departamento',
    labelLevel3: 'Seleccione un ciudad',
  },
  mapButtonText: 'VER EN MAPA',
  mapArrowBackButtonText: 'VOLVER',
  inventoryAvailability: {
    valueAvailability: 3,
    labelZeroAvailability: 'No hay existencias',
    labelLowLevelAvailability: ' (Nivel de stock bajo)',
    labelMiddleLevelAvailability: ' (Nivel de stock medio)',
    labelHighLevelAvailability: ' (Nivel de stock alto)',
  },
  tableEmptyStateLabel: 'No hay existencias en ninguna de las tiendas',
  tableColumns: {
    labelColumnNameStore: 'Tienda',
    labelColumnAvailability: 'Disponibilidad',
    labelColumnUbication: 'Ubicación',
  },
  map: {
    width: '100%',
    height: '400px',
    defaultZoom: 17,
    ZoomLevel: 5,
    zoomPoint: 17,
  },
  infoWindow: {
    labelName: 'Nombre de la tienda: ',
    labelDirection: 'Dirección: ',
    labelPhone: 'Telefono: ',
    labelHorary: 'Horario: ',
    labelWeekdays: {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miercoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sabado',
      sunday: 'Domingo',
    },
    labelDescription: 'Descripcion: ',
  },
  show: {
    openModalButton: true,
    titleModal: true,
    descriptionModal: true,
    dropdownsCustom: true,
    inventoryAvailabilityLabelStock: true,
    inventoryAvailabilityLabelZeroAvailability: true,
    storesTable: true,
    dividerModal: true,
  },
}

PickupAvailability.schema = {
  title: 'admin/editor.pickup-availability.title',
  description: 'admin/editor.pickup-availability.description',
  type: 'object',
  properties: {
    openModalButtonText: {
      title: 'admin/editor.pickup-availability.openModalButtonText.title',
      type: 'string',
    },
    titleModal: {
      title: 'admin/editor.pickup-availability.titleModal.title',
      type: 'string',
    },
    descriptionModal: {
      title: 'admin/editor.pickup-availability.descriptionModal.title',
      type: 'string',
    },
    labelLevels: {
      title: '',
      type: 'object',
      properties: {
        labelLevel1: {
          title:
            'admin/editor.pickup-availability.labelLevels.labelLevel1.title',
          type: 'string',
        },
        labelLevel2: {
          title:
            'admin/editor.pickup-availability.labelLevels.labelLevel2.title',
          type: 'string',
        },
        labelLevel3: {
          title:
            'admin/editor.pickup-availability.labelLevels.labelLevel3.title',
          type: 'string',
        },
      },
    },
    mapButtonText: {
      title: 'admin/editor.pickup-availability.mapButtonText.title',
      type: 'string',
    },
    mapArrowBackButtonText: {
      title: 'admin/editor.pickup-availability.mapButtonText.title',
      type: 'string',
    },
    inventoryAvailability: {
      title: '',
      type: 'object',
      properties: {
        valueAvailability: {
          title:
            'admin/editor.pickup-availability.inventoryAvailability.valueAvailability.title',
          type: 'number',
        },
        labelZeroAvailability: {
          title:
            'admin/editor.pickup-availability.inventoryAvailability.labelZeroAvailability.title',
          type: 'string',
        },
        labelLowLevelAvailability: {
          title:
            'admin/editor.pickup-availability.inventoryAvailability.labelLowLevelAvailability.title',
          type: 'string',
        },
        labelMiddleLevelAvailability: {
          title:
            'admin/editor.pickup-availability.inventoryAvailability.labelMiddleLevelAvailability.title',
          type: 'string',
        },
        labelHighLevelAvailability: {
          title:
            'admin/editor.pickup-availability.inventoryAvailability.labelHighLevelAvailability.title',
          type: 'string',
        },
      },
    },
    tableEmptyStateLabel: {
      title: 'admin/editor.pickup-availability.tableEmptyStateLabel.title',
      type: 'string',
    },
    tableColumns: {
      title: '',
      type: 'object',
      properties: {
        labelColumnNameStore: {
          title:
            'admin/editor.pickup-availability.tableColumns.labelColumnNameStore.title',
          type: 'string',
        },
        labelColumnAvailability: {
          title:
            'admin/editor.pickup-availability.tableColumns.labelColumnAvailability.title',
          type: 'string',
        },
        labelColumnUbication: {
          title:
            'admin/editor.pickup-availability.tableColumns.labelColumnUbication.title',
          type: 'string',
        },
      },
    },
    map: {
      title: '',
      type: 'object',
      properties: {
        width: {
          title: 'admin/editor.pickup-availability.map.width.title',
          type: 'string',
        },
        height: {
          title: 'admin/editor.pickup-availability.map.height.title',
          type: 'string',
        },
        icon: {
          title: 'admin/editor.pickup-availability.map.icon.title',
          type: 'string',
        },
        iconWidth: {
          title: 'admin/editor.pickup-availability.map.iconWidth.title',
          type: 'string',
        },
        iconHeight: {
          title: 'admin/editor.pickup-availability.map.iconHeight.title',
          type: 'string',
        },
        zoom: {
          title: 'admin/editor.pickup-availability.map.zoom.title',
          type: 'string',
        },
      },
    },
    infoWindow: {
      title: '',
      type: 'object',
      properties: {
        labelName: {
          title: 'admin/editor.pickup-availability.infoWindow.labelName.title',
          type: 'string',
        },
        labelDirection: {
          title:
            'admin/editor.pickup-availability.infoWindow.labelDirection.title',
          type: 'string',
        },
        labelPhone: {
          title: 'admin/editor.pickup-availability.infoWindow.labelPhone.title',
          type: 'string',
        },
        labelHorary: {
          title:
            'admin/editor.pickup-availability.infoWindow.labelHorary.title',
          type: 'string',
        },
        labelWeekdays: {
          title: '',
          type: 'object',
          properties: {
            monday: {
              title:
                'admin/editor.pickup-availability.infoWindow.labelWeekdays.monday.title',
              type: 'string',
            },
            tuesday: {
              title:
                'admin/editor.pickup-availability.infoWindow.labelWeekdays.tuesday.title',
              type: 'string',
            },
            wednesday: {
              title:
                'admin/editor.pickup-availability.infoWindow.labelWeekdays.wednesday.title',
              type: 'string',
            },
            thursday: {
              title:
                'admin/editor.pickup-availability.infoWindow.labelWeekdays.thursday.title',
              type: 'string',
            },
            friday: {
              title:
                'admin/editor.pickup-availability.infoWindow.labelWeekdays.friday.title',
              type: 'string',
            },
            saturday: {
              title:
                'admin/editor.pickup-availability.infoWindow.labelWeekdays.saturday.title',
              type: 'string',
            },
            sunday: {
              title:
                'admin/editor.pickup-availability.infoWindow.labelWeekdays.sunday.title',
              type: 'string',
            },
          },
        },
        labelDescription: {
          title:
            'admin/editor.pickup-availability.infoWindow.labelDescription.title',
          type: 'string',
        },
      },
    },
  },
}

export default PickupAvailability
