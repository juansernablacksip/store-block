# Free Shipping

The `minimum-purchase-amount` is a block responsible for **displaying the missing amount, to be able to buy in the online store**.

![image](https://user-images.githubusercontent.com/74076308/102406641-e137e080-3fb8-11eb-8e61-587badd8d9ab.PNG)

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
    "valueOfMinimumPurchaseAmount": 1,
    "infoLabel": {
      "labelInitial": "Test init:",
      "labelBetween": "¡Test Middle ",
      "labelFinal": "Test end!"
      },
    "show": {
      "informativeMinimumPurchaseAmountText": true,
      "labelInitial": true,
      "subTotal": true,
      "labelBetween": true,
      "missingForMinimumPurchaseAmount": true,
      "labelFinal": true,
      "checkoutButton": true,
      "children": true
    },
    "textCheckoutButton": "Test text"
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
| `textCheckoutButton` | `String` | Text of checkout button | `Cerrar pedido` |



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
| `checkoutButton` | `Boolean` | Show text final of infoLabel | `true` |
| `children` | `Boolean` | Show text final of infoLabel | `true` |


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `mpa_globalMinimumPurchaseAmountContainer` |
| `mpa_infoLabelMinimumPurchaseAmountContainer` |
| `mpa_informativeMinimumPurchaseAmountText` |
| `mpa_MinimumPurchaseAmountButton` |