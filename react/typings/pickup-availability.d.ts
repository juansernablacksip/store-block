export interface PickupAvailabilityProps {
  openModalButtonText: string
  titleModal: string
  descriptionModal: string
  labelLevels: LabelLevelsProps
  mapButtonText: string
  mapArrowBackButtonText: string
  inventoryAvailability: AvailabilityProps
  tableEmptyStateLabel: string
  tableColumns: TableColumnProps
  map: MapProps
  infoWindow: InfoWindowProps
  show: ShowProps
}

export interface LabelLevelsProps {
  labelLevel1: string
  labelLevel2: string
  labelLevel3: string
}

export interface AvailabilityProps {
  valueAvailability: number
  labelZeroAvailability: string
  labelLowLevelAvailability: string
  labelMiddleLevelAvailability: string
  labelHighLevelAvailability: string
}

export interface TableColumnProps {
  labelColumnNameStore: string
  labelColumnAvailability: string
  labelColumnUbication: string
}

export interface MapProps {
  width: string
  height: string
  icon?: string
  iconWidth?: number
  iconHeight?: number
  zoomPoint?: number
  ZoomLevel?: number
  defaultZoom?: number
}

export interface InfoWindowProps {
  labelName: string
  labelDirection: string
  labelPhone: string
  labelHorary: string
  labelWeekdays: WeekdaysProps
  labelDescription?: string
}

export interface WeekdaysProps {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export interface ShowProps {
  openModalButton?: boolean
  titleModal?: boolean
  descriptionModal?: boolean
  dropdownsCustom?: boolean
  inventoryAvailabilityLabelStock?: boolean
  inventoryAvailabilityLabelZeroAvailability?: boolean
  storesTable?: boolean
  dividerModal?: boolean
}
