import React, { Fragment, useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { MinimumPurchaseAmountProps } from '../../typings/minimum-purchase-amount'
import { useCheckoutURL } from 'vtex.checkout-resources/Utils'

/**
 * Modifiers of each of the component classes allow you to style each of the blocks
 */
const CSS_HANDLES = [
  'fs_globalFreeShippingContainer',
  'fs_informativeFreeShippingText',
  'fs_freeShippingProgressBar',
  'fs_rangeFreeShippingContainer',
  'fs_initialRangeFreeShippingText',
  'fs_endRangeFreeShippingText',
  'mpa_MinimumPurchaseAmountContainer',
  'mpa_MinimumPurchaseAmountButton',
] as const

const MinimumPurchaseAmount: StorefrontFunctionComponent<
  MinimumPurchaseAmountProps
> = ({
  valueOfMinimumPurchaseAmount,
  infoLabel,
  show,
  textCheckoutButton,
  children,
}) => {
  const { url: checkoutUrl } = useCheckoutURL()

  // Get subTotal of my cart that is equal to the sum of the prices of the items in the cart
  const {
    orderForm: { totalizers },
  } = useOrderForm()
  let subTotal = totalizers.length === 0 ? 0 : totalizers[0].value

  const [missingForFreeShipping, setMissingForFreeShipping] = useState(0)

  useEffect(() => {
    setMissingForFreeShipping(
      valueOfMinimumPurchaseAmount - subTotal <= 0
        ? 0
        : valueOfMinimumPurchaseAmount - subTotal
    )
  }, [subTotal])

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`pb0 ${handles.fs_globalFreeShippingContainer2}`}>
      <div className={`w-90 pa3 ${handles.fs_globalFreeShippingContainer}`}>
        {show.informativeFreeShippingText && (
          <p
            className={`t-body mw9 mw-100 ${handles.fs_informativeFreeShippingText}`}
          >
            {show.labelInitial && infoLabel.labelInitial}
            {show.subTotal && <FormattedCurrency value={subTotal} />}
            &nbsp;
            {show.labelBetween && infoLabel.labelBetween}
            {show.missingForFreeShipping && (
              <FormattedCurrency value={missingForFreeShipping} />
            )}
            &nbsp;
            {show.labelFinal && infoLabel.labelFinal}
            &nbsp;
          </p>
        )}
      </div>
      {show.checkoutButton &&
        (subTotal * 100) / valueOfMinimumPurchaseAmount >= 100 && (
          <Button
            variation="primary"
            href={checkoutUrl}
            block
            className={`bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100  ${handles.mpa_MinimumPurchaseAmountButton}`}
          >
            {textCheckoutButton}
          </Button>
        )}
      {show.children &&
        (subTotal * 100) / valueOfMinimumPurchaseAmount < 100 && (
          <Fragment>{children}</Fragment>
        )}
    </div>
  )
}

MinimumPurchaseAmount.defaultProps = {
  valueOfMinimumPurchaseAmount: 1,
  infoLabel: {
    labelInitial: 'Valor actual:',
    labelBetween: '¡Faltan ',
    labelFinal: 'para que su envío sea totalmente gratis!',
  },
  show: {
    informativeFreeShippingText: true,
    labelInitial: true,
    subTotal: true,
    labelBetween: true,
    missingForFreeShipping: true,
    labelFinal: true,
    checkoutButton: true,
    children: true,
  },
  textCheckoutButton: 'Cerrar pedido',
}

MinimumPurchaseAmount.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    valueOfMinimumPurchaseAmount: {
      title: 'editor.countdown.valueOfMinimumPurchaseAmount.title',
      type: 'number',
    },
    infoLabel: {
      title: '',
      type: 'object',
      properties: {
        labelInitial: {
          title: 'editor.countdown.infoLabel.labelInitial.title',
          type: 'string',
        },
        labelBetween: {
          title: 'editor.countdown.infoLabel.labelBetween.title',
          type: 'string',
        },
        labelFinal: {
          title: 'editor.countdown.infoLabel.labelFinal.title',
          type: 'string',
        },
      },
    },
    textCheckoutButton: {
      title: 'editor.countdown.textCheckoutButton.title',
      type: 'string',
    },
  },
}

export default MinimumPurchaseAmount
