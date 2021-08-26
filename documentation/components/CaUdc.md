# CaUdc

The Unifaun Delivery Checkout widget<br><br> **SASS-path:** _./styles/components/molecules/ca-udc.scss_

## Props

<!-- @vuese:CaUdc:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|shippingData|JSON string from the API|`String`|`false`|null|
|zip|The current zip code / postal code|`String`|`true`|-|

<!-- @vuese:CaUdc:props:end -->


## Events

<!-- @vuese:CaUdc:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|validation|Validation has been made|valid (Boolean)|
|init|Initiation is triggered|Zip (String)|
|changed|A change has been made|Selected option ID, pickup point, delivery data (Object)|

<!-- @vuese:CaUdc:events:end -->


## Methods

<!-- @vuese:CaUdc:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|init|Initiate the widget|-|
|update|Updates the widget with new data|-|
|disable|Disables the widget|-|
|enable|Enables the widget and handles feedback|-|
|changed|The callback function for when changes are made in the widget|-|

<!-- @vuese:CaUdc:methods:end -->


## Computed

<!-- @vuese:CaUdc:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|valid|`Boolean`|Is all input valid?|No|

<!-- @vuese:CaUdc:computed:end -->

