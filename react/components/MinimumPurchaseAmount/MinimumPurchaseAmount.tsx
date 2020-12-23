import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { Button, Card } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCheckoutURL } from 'vtex.checkout-resources/Utils'
import { useQuery } from 'react-apollo'
import productsQuery from '../../graphql/productsQuery.graphql'
import useMarketingSessionParams from '../../modules/useMarketingSessionParams'
import { MinimumPurchaseAmountProps } from '../../typings/minimum-purchase-amount'

/**
 * Modifiers of each of the component classes allow you to style each of the blocks
 */
const CSS_HANDLES = [
  'mpa_MinimumPurchaseAmountSuggestedProductInformationAddToListButton',
  'mpa_MinimumPurchaseAmountSuggestedProductInformationProductPrice',
  'mpa_MinimumPurchaseAmountSuggestedProductInformationProductName',
  'mpa_MinimumPurchaseAmountSuggestedProductInformationLayout',
  'mpa_MinimumPurchaseAmountSuggestedProductImage',
  'mpa_MinimumPurchaseAmountSuggestedProductImageLayout',
  'mpa_MinimumPurchaseAmountSuggestedProductCardGlobalLayout',
  'mpa_MinimumPurchaseAmountSuggestedProductCard',
  'mpa_MinimumPurchaseAmountSuggestedProductCardContainer',
  'mpa_MinimumPurchaseAmountCheckoutButton',
  'mpa_MinimumPurchaseAmountInformativeText',
  'mpa_MinimumPurchaseAmountInformativeTextContainer',
  'mpa_MinimumPurchaseAmountGlobalContainer',
] as const

const MinimumPurchaseAmount: StorefrontFunctionComponent<
  MinimumPurchaseAmountProps
> = ({
  valueOfMinimumPurchaseAmount,
  infoLabel,
  show,
  textCheckoutButton,
  textAddToListButton,
  querySuggestedProduct,
}) => {
  const { addItem } = useOrderItems()
  const { utmParams, utmiParams } = useMarketingSessionParams()
  const { url: checkoutUrl } = useCheckoutURL()
  // Get subTotal of my cart that is equal to the sum of the prices of the items in the cart
  const {
    orderForm: { totalizers },
  } = useOrderForm()

  const [missingForFreeShipping, setMissingForFreeShipping] = useState(0)
  const [
    hasTheMinimumPurchaseAmount,
    setHasTheMinimumPurchaseAmount,
  ] = useState(false)

  // Get product
  const { data } = useQuery(productsQuery, {
    ssr: true,
    variables: {
      category: querySuggestedProduct.category,
      collection: querySuggestedProduct.collection,
      specificationFilters: querySuggestedProduct.specificationFilters,
      orderBy: querySuggestedProduct.orderBy,
      from: querySuggestedProduct.from,
      to: querySuggestedProduct.to,
      hideUnavailableItems: querySuggestedProduct.hideUnavailableItems,
    },
  })

  // Build item object
  let CartItem = {}
  if (data) {
    CartItem = {
      detailUrl: data.products[0].link,
      id: data.products[0].productId,
      imageUrls: data.products[0].items[0].images[0],
      listPrice: data.products[0].priceRange.listPrice.lowPrice,
      measurementUnit: data.products[0].items[0].measurementUnit,
      name: data.products[0].productName,
      price: data.products[0].priceRange.listPrice.lowPrice,
      productRefId: data.products[0].items[0].referenceId[0].value,
      productId: data.products[0].productId,
      quantity: 1,
      seller: data.products[0].items[0].sellers[0].sellerId,
      sellingPrice: data.products[0].priceRange.sellingPrice.lowPrice,
      skuSpecifications: data.products[0].skuSpecifications,
      unitMultiplier: data.products[0].items[0].unitMultiplier,
    }
  }

  let subTotal = totalizers.length === 0 ? 0 : totalizers[0].value
  subTotal = parseFloat(
    subTotal.toString().substring(0, subTotal.toString().length - 2)
  )

  if (isNaN(subTotal)) {
    subTotal = 0
  }

  useEffect(() => {
    setMissingForFreeShipping(
      valueOfMinimumPurchaseAmount - subTotal <= 0
        ? 0
        : valueOfMinimumPurchaseAmount - subTotal
    )
    setHasTheMinimumPurchaseAmount(
      (subTotal * 100) / valueOfMinimumPurchaseAmount < 100
    )
  }, [subTotal])

  const addItemMinicart = async () => {
    await addItem([CartItem], {
      ...utmParams,
      ...utmiParams,
    })
    show.SuggestedProduct = false
  }

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`pb0 ${handles.mpa_MinimumPurchaseAmountGlobalContainer}`}>
      <div
        className={`w-90 pa3 ${handles.mpa_MinimumPurchaseAmountInformativeTextContainer}`}
      >
        {show.informativeMinimumPurchaseAmountText && (
          <p
            className={`t-body mw9 mw-100 ${handles.mpa_MinimumPurchaseAmountInformativeText}`}
          >
            {show.labelInitial &&
              hasTheMinimumPurchaseAmount &&
              infoLabel.labelInitial}
            {show.subTotal && hasTheMinimumPurchaseAmount && (
              <FormattedCurrency value={subTotal} />
            )}
            &nbsp;
            {show.labelBetween &&
              hasTheMinimumPurchaseAmount &&
              infoLabel.labelBetween}
            {show.missingForMinimumPurchaseAmount &&
              hasTheMinimumPurchaseAmount && (
                <FormattedCurrency value={missingForFreeShipping} />
              )}
            &nbsp;
            {show.labelFinal &&
              hasTheMinimumPurchaseAmount &&
              infoLabel.labelFinal}
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
            className={`bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100  ${handles.mpa_MinimumPurchaseAmountCheckoutButton}`}
          >
            {textCheckoutButton}
          </Button>
        )}
      {show.SuggestedProduct && hasTheMinimumPurchaseAmount && (
        <div
          className={`pa0 --washed-blue: #fafafa; b--white-80 ${handles.mpa_MinimumPurchaseAmountSuggestedProductCardContainer}`}
        >
          <Card
            noPadding
            className={`${handles.mpa_MinimumPurchaseAmountSuggestedProductCard}`}
          >
            <div
              className={`flex ${handles.mpa_MinimumPurchaseAmountSuggestedProductCardGlobalLayout}`}
            >
              {show.SuggestedProductImage && hasTheMinimumPurchaseAmount && (
                <div
                  className={`w-30 h-40 ma0 ${handles.mpa_MinimumPurchaseAmountSuggestedProductImageLayout}`}
                >
                  <img
                    src={
                      data ? data.products[0].items[0].images[0].imageUrl : ''
                    }
                    alt="alt parametro"
                    className={`${handles.mpa_MinimumPurchaseAmountSuggestedProductImage}`}
                  ></img>
                </div>
              )}
              {show.SuggestedProductInformation && hasTheMinimumPurchaseAmount && (
                <div
                  className={`w-50 ma2 ${handles.mpa_MinimumPurchaseAmountSuggestedProductInformationLayout}`}
                >
                  <h2
                    className={`f6 ${handles.mpa_MinimumPurchaseAmountSuggestedProductInformationProductName}`}
                  >
                    {data ? data.products[0].productName : ''}
                  </h2>
                  <p
                    className={`f6 ma0 ${handles.mpa_MinimumPurchaseAmountSuggestedProductInformationProductPrice}`}
                  >
                    {' '}
                    <FormattedCurrency
                      value={
                        data
                          ? data.products[0].priceRange.listPrice.lowPrice
                          : ''
                      }
                    />
                  </p>
                  <br></br>
                  {show.SuggestedProductInformationAddToListButton &&
                    hasTheMinimumPurchaseAmount && (
                      <Button
                        variation="primary"
                        size="small"
                        tabIndex={-1}
                        className={`${handles.mpa_MinimumPurchaseAmountSuggestedProductInformationAddToListButton}`}
                        onClick={addItemMinicart}
                      >
                        {textAddToListButton}
                      </Button>
                    )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

MinimumPurchaseAmount.defaultProps = {
  valueOfMinimumPurchaseAmount: 1,
  infoLabel: {
    labelInitial: 'Valor actual:',
    labelBetween: '¡Faltan ',
    labelFinal: 'para que pueda cerrar su pedido!',
  },
  show: {
    informativeMinimumPurchaseAmountText: true,
    labelInitial: true,
    subTotal: true,
    labelBetween: true,
    missingForMinimumPurchaseAmount: true,
    labelFinal: true,
    checkoutButton: true,
    SuggestedProduct: true,
    SuggestedProductImage: true,
    SuggestedProductInformation: true,
    SuggestedProductInformationAddToListButton: true,
  },
  textCheckoutButton: 'Cerrar pedido',
  textAddToListButton: 'LO QUIERO',
}

MinimumPurchaseAmount.schema = {
  title: 'editor.minimum-purchase-amount.title',
  description: 'editor.minimum-purchase-amount.description',
  type: 'object',
  properties: {
    valueOfMinimumPurchaseAmount: {
      title:
        'editor.minimum-purchase-amount.valueOfMinimumPurchaseAmount.title',
      type: 'number',
    },
    infoLabel: {
      title: '',
      type: 'object',
      properties: {
        labelInitial: {
          title: 'editor.minimum-purchase-amount.infoLabel.labelInitial.title',
          type: 'string',
        },
        labelBetween: {
          title: 'editor.minimum-purchase-amount.infoLabel.labelBetween.title',
          type: 'string',
        },
        labelFinal: {
          title: 'editor.minimum-purchase-amount.infoLabel.labelFinal.title',
          type: 'string',
        },
      },
    },
    textCheckoutButton: {
      title: 'editor.minimum-purchase-amount.textCheckoutButton.title',
      type: 'string',
    },
    textAddToListButton: {
      title: 'editor.minimum-purchase-amount.textAddToListButton.title',
      type: 'string',
    },
  },
}

export default MinimumPurchaseAmount
