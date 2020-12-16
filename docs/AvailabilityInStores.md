# Free Shipping

The `minimum-purchase-amount` is a block responsible for **displaying the missing amount, to access the free shipping promotion**.

![image](https://user-images.githubusercontent.com/17678382/101309181-c081c500-3819-11eb-8927-c1db3dab5f96.PNG)

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
    "valueOfFreeShipping": 100,
    "infoLabel": {
      "labelInitial": "Test init:",
      "labelBetween": "¡Test Middle ",
      "labelFinal": "Test end!"
      },
    "show": {
      "informativeFreeShippingText": true,
      "percentageFreeShipping":true,
      "rangeFreeShipping": true,
      "labelInitial": true,
      "subTotal": true,
      "labelBetween": true,
      "missingForFreeShipping": true,
      "labelFinal": true,
      "checkoutButton": true
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
| `valueOfFreeShipping` | `Number` | Show value of free shipping | `1` |
| `infoLabel` | `String` | Show info of free shipping | `Valor actual: ¡Faltan ________ para que su envío sea totalmente gratis!` |


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `globalFreeShippingContainer` |
| `informativeFreeShippingText` |
| `freeShippingProgressBar` |
| `rangeFreeShippingContainer` |
| `initialRangeFreeShippingText` |
| `endRangeFreeShippingText` |