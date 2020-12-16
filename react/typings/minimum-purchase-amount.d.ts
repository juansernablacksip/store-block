export interface MinimumPurchaseAmountProps {
  valueOfMinimumPurchaseAmount: number
  infoLabel: InfoProps
  show: ShowProps
  textCheckoutButton: string
}

export interface InfoProps {
  labelInitial?: string
  labelBetween?: string
  labelFinal?: string
}

export interface ShowProps {
  informativeFreeShippingText?: boolean
  labelInitial?: boolean
  subTotal?: boolean
  labelBetween?: boolean
  missingForFreeShipping?: boolean
  labelFinal?: boolean
  checkoutButton?: boolean
  children?: boolean
}
