export interface MinimumPurchaseAmountProps {
  valueOfMinimumPurchaseAmount: number
  infoLabel: InfoProps
  show: ShowProps
  textCheckoutButton: string
  textAddToListButton: string
  querySuggestedProduct: QueryProps
}

export interface InfoProps {
  labelInitial?: string
  labelBetween?: string
  labelFinal?: string
}

export interface QueryProps {
  category?: string
  collection?: string = ''
  specificationFilters?: [] = []
  orderBy?: string = 'OrderByTopSaleDESC'
  from?: number = 0
  to?: number = 2
  hideUnavailableItems?: boolean = true
}

export interface ShowProps {
  informativeMinimumPurchaseAmountText?: boolean
  labelInitial?: boolean
  subTotal?: boolean
  labelBetween?: boolean
  missingForMinimumPurchaseAmount?: boolean
  labelFinal?: boolean
  checkoutButton?: boolean
  SuggestedProduct?: boolean
  SuggestedProductImage?: boolean
  SuggestedProductInformation?: boolean
  SuggestedProductInformationAddToListButton?: boolean
}
