# Free Shipping

The `minimum-purchase-amount` is a block responsible for **displaying the missing amount and suggested product, to be able to buy in the online store**.

![image](https://user-images.githubusercontent.com/74076308/103029329-91609880-4527-11eb-9efb-10fd2d7f55f9.PNG)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
  "dependencies": {
    "vtex.store-components": "3.x"
  }
}
```

2. Add the `minimum-purchase-amount` block to any block below `store.custom#minimum-purchase-amount` (page custom template). For example:

```json
"minimum-purchase-amount": {
  "props": {
    "valueOfMinimumPurchaseAmount": 9000000,
    "infoLabel": {
        "labelInitial": "Valor actual:",
        "labelBetween": "¡Faltan ",
        "labelFinal": "para que pueda cerrar su pedido!"
    },
    "show": {
      "informativeMinimumPurchaseAmountText": true,
      "labelInitial": true,
      "subTotal": true,
      "labelBetween": true,
      "missingForMinimumPurchaseAmount": true,
      "labelFinal": true,
      "checkoutButton": true,
      "SuggestedProduct": true,
      "SuggestedProductImage": true,
      "SuggestedProductInformation": true,
      "SuggestedProductInformationAddToListButton": true
    },
    "textCheckoutButton": "Cerrar pedido",
    "textAddToListButton": "LO QUIERO"
  }
},
{
  "store.custom#minimum-purchase-amount": {
    "blocks": [
      "flex-layout.row#minimum-purchase-amount"
    ],
    "flex-layout.row#minimum-purchase-amount": {
      "children": [
        "minimum-purchase-amount"
      ]
    }
  }
}
```

| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `valueOfMinimumPurchaseAmount` | `Number` | Value of minimum purchase amount | `1` |
| `infoLabel` | `String` | information of minimum purchase amount | `Valor actual: {subTotal} ¡Faltan {missingForFreeShipping} para que pueda cerrar su pedido!` |
| `show` | `Boolean` | Show parts of component of minimum purchase amount | `true` |
| `textCheckoutButton` | `String` | Text of checkout button of minicart | `Cerrar pedido` |
| `textAddToListButton` | `String` | Text of add to list button of minicart | `Cerrar pedido` |



infoLabel **object**
| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `labelInitial` | `String` | Text initial | `Valor actual:` |
| `labelBetween` | `String` | Text between | `¡Faltan` |
| `labelFinal` | `String` | Text final  | `para que pueda cerrar su pedido!` |


show **object**
| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `informativeMinimumPurchaseAmountText` | `Boolean` | Show information of infoLabel in general | `true` |
| `labelInitial` | `Boolean` | Show text initial of infoLabel | `true` |
| `subTotal` | `Boolean` | Show subtotal for free shipping of infoLabel | `true` |
| `labelBetween` | `Boolean` | Show text between of infoLabel | `true` |
| `missingForMinimumPurchaseAmount` | `Boolean` | Show missing for free shipping of infoLabel | `true` |
| `labelFinal` | `Boolean` | Show text final of infoLabel | `true` |
| `checkoutButton` | `Boolean` | Show checkout button | `true` |
| `SuggestedProduct` | `Boolean` | Show suggested product in the minicart | `true` |
| `SuggestedProductImage` | `Boolean` | Show suggested product image in the minicart | `true` |
| `SuggestedProductInformation` | `Boolean` | Show suggested product information (name, price and add to list button) in the minicart | `true` |
| `SuggestedProductInformationAddToListButton` | `Boolean` | Show suggested product add to list button in the minicart | `true` |


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `mpa_MinimumPurchaseAmountSuggestedProductInformationAddToListButton` |
| `mpa_MinimumPurchaseAmountSuggestedProductInformationProductPrice` |
| `mpa_MinimumPurchaseAmountSuggestedProductInformationProductName` |
| `mpa_MinimumPurchaseAmountSuggestedProductInformationLayout` |
| `mpa_MinimumPurchaseAmountSuggestedProductImage` |
| `mpa_MinimumPurchaseAmountSuggestedProductImageLayout` |
| `mpa_MinimumPurchaseAmountSuggestedProductCardGlobalLayout` |
| `mpa_MinimumPurchaseAmountSuggestedProductCard` |
| `mpa_MinimumPurchaseAmountSuggestedProductCardContainer` |
| `mpa_MinimumPurchaseAmountCheckoutButton` |
| `mpa_MinimumPurchaseAmountInformativeText` |
| `mpa_MinimumPurchaseAmountInformativeTextContainer` |
| `mpa_MinimumPurchaseAmountGlobalContainer` |