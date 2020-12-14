# Free Shipping

The `free-shipping` is a block responsible for **displaying the missing amount, to access the free shipping promotion**.

![image](https://user-images.githubusercontent.com/74076308/101827422-4fcef700-3afe-11eb-8911-a5d344f90fc8.PNG)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
  "dependencies": {
    "vtex.store-components": "3.x"
  }
}
```

2. Add the `free-shipping` block to any block below `store.custom#free-shipping` (page custom template). For example:

```json
"free-shipping": {
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
      "labelFinal": true
    }
  }
},
{
  "store.custom#free-shipping": {
    "blocks": [
      "flex-layout.row#free-shipping"
    ],
    "flex-layout.row#free-shipping": {
      "children": [
        "free-shipping"
      ]
    }
  }
}
```

| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `valueOfFreeShipping` | `Number` | Show value of free shipping | `1` |
| `infoLabel` | `String` | Show info of free shipping | `Valor actual: ¡Faltan ________ para que su envío sea totalmente gratis!` |
| `show` | `Boolean` | Show free shipping | `true` |


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