export interface FreeShippingProps {
    valueOfFreeShipping: number,
    infoLabel: InfoProps,
    show: ShowProps
}

export interface InfoProps {
    labelInitial?: string
    labelBetween?: string
    labelFinal?: string
}

export interface ShowProps {
    informativeFreeShippingText?: boolean
    percentageFreeShipping?: boolean
    rangeFreeShipping?: boolean
    labelInitial?: boolean
    subTotal?: boolean
    labelBetween?: boolean
    missingForFreeShipping?: boolean
    labelFinal?: boolean
}