# CaShippingOptions

Displaying available shipping options<br><br> **SASS-path:** _./styles/components/molecules/ca-shipping-options.scss_

## Props

<!-- @vuese:CaShippingOptions:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|options|List of options|`Array`|`true`|-|

<!-- @vuese:CaShippingOptions:props:end -->


## Events

<!-- @vuese:CaShippingOptions:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|selection|Selection has been made|id (Number)|

<!-- @vuese:CaShippingOptions:events:end -->


## Methods

<!-- @vuese:CaShippingOptions:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setSelected|Sets selected to either the given id or the id of selectedOption|id (Number, null)|
|selectOption|Selection click handler|id (Number, null)|

<!-- @vuese:CaShippingOptions:methods:end -->


## Computed

<!-- @vuese:CaShippingOptions:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|selectedOption|`Object`|Currently selected option|No|

<!-- @vuese:CaShippingOptions:computed:end -->


