# Pickup Availability

The `pickup-availability` is a block responsible for **displaying the availability stock of product in the online store**.

![image]()

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
  "dependencies": {
    "vtex.store-components": "3.x"
  }
}
```

2. Add the `pickup-availability` block to any block below `store.custom#pickup-availability` (page custom template). For example:

```json
"pickup-availability": {
  "props": {
    "openModalButton": {
      "text": "DISPONIBILIDAD EN TIENDA",
      "src":
        "https://cdn4.iconfinder.com/data/icons/user-interface-181/32/Location-512.png"
    },
    "titleModal": "Disponibilidad en tienda",
    "descriptionModal":
      "Selecciona tu departamento, Provincia y Distrito para las tiendas con despacho",
    "labelLevels": {
      "labelLevel1": "Seleccione un departamento",
      "labelLevel2": "Seleccione una provincia",
      "labelLevel3": "Seleccione un distrito"
    },
    "show": {
      "openModalButton": true,
      "titleModal": true,
      "descriptionModal": true,
      "dividerModal": true,
      "dropdownsCustom": true,
      "storesTable": true
    }
  }
},
{
  "store.custom#pickup-availability": {
    "blocks": [
      "flex-layout.row#pickup-availability"
    ],
    "flex-layout.row#pickup-availability": {
      "children": [
        "pickup-availability"
      ]
    }
  }
}
```

| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `openModalButton` | `Object` | Information of open modal button | `` |
| `titleModal` | `String` | Title text of modal | `Disponibilidad en tienda` |
| `descriptionModal` | `String` | Description text of modal | `Selecciona tu departamento, Provincia y Distrito para las tiendas con despacho` |
| `labelLevels` | `Object` | Information of dropdown of modal | `` |
| `show` | `Boolean` | Show parts of component of pickup availability | `true` |



openModalButton **object**
| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `text` | `String` | Button text | `DISPONIBILIDAD EN TIENDA` |
| `src` | `String` | Button icon (Files image type: png, jpeg, jpg) | `https://cdn4.iconfinder.com/data/icons/user-interface-181/32/Location-512.png` |


labelLevels **object**
| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `labelLevel1` | `String` | Label of country | `Seleccione un departamento` |
| `labelLevel2` | `String` | Label of state | `Seleccione una provincia` |
| `labelLevel3` | `String` | Label of city (Files image type: png, jpeg, jpg) | `Seleccione un distrito` |


show **object**
| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `openModalButton` | `Boolean` | Show information of openModalButton in general | `true` |
| `titleModal` | `Boolean` | Show title of modal | `true` |
| `descriptionModal` | `Boolean` | Show description of modal | `true` |
| `dividerModal` | `Boolean` | Show divider of modal | `true` |
| `dropdownsCustom` | `Boolean` | Show dropdowns for filter stores for availability of product | `true` |
| `storesTable` | `Boolean` | Show stores for availability of product | `true` |


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `pa_PickupAvailabilityGlobalContainer` |
| `pa_PickupAvailabilityOpenModalButton` |
| `pa_PickupAvailabilityOpenModalButtonText` |
| `pa_PickupAvailabilityOpenModalButtonIcon` |
| `pa_PickupAvailabilityOpenModalButtonContainer` |
| `pa_PickupAvailabilityModal` |
| `pa_PickupAvailabilityModalTitleText` |
| `pa_PickupAvailabilityModalDescriptionText` |
| `pa_PickupAvailabilityModalDivider` |