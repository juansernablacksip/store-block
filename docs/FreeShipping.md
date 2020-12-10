# Free Shipping

The `free-shipping` is a block responsible for **displaying the missing amount, to access the free shipping promotion**.

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

2. Add the `free-shipping` block to any block below `store.custom#free-shipping` (page custom template). For example:

```json
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
| `valueOfFreeShipping` | `Number` | Show product SKU | `1` |


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