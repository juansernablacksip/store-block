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
  informativeMinimumPurchaseAmountText?: boolean
  labelInitial?: boolean
  subTotal?: boolean
  labelBetween?: boolean
  missingForMinimumPurchaseAmount?: boolean
  labelFinal?: boolean
  checkoutButton?: boolean
  children?: boolean
}
