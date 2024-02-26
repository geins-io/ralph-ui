# CaCheckoutCarismar

**DEPRECATED** - use CaCheckoutInvoice instead The invoice checkout frame. Used for paying with manual invoice<br><br> **SASS-path:** _./styles/components/molecules/ca-checkout-carismar.scss_

## Props

<!-- @vuese:CaCheckoutCarismar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|checkout|The checkout data from the endpoint|`Object`|`true`|-|

<!-- @vuese:CaCheckoutCarismar:props:end -->


## Events

<!-- @vuese:CaCheckoutCarismar:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update|Data has changed|The checkout data (Object)|
|place-order|All fields are valid and the order can be placed|-|

<!-- @vuese:CaCheckoutCarismar:events:end -->


## Methods

<!-- @vuese:CaCheckoutCarismar:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|placeOrder|Validate all fields and emit the place-order event if valid|-|
|updateCheckoutData|Update the internal checkoutData object with data from the api|data (Object)|
|checkValid|Used to hide feedback if field becomes valid after error|valid (Boolean)|
|validateAllFields|Validating all input fields|-|
|showErrorFeedback|Show generic error|-|

<!-- @vuese:CaCheckoutCarismar:methods:end -->


## Computed

<!-- @vuese:CaCheckoutCarismar:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|orderConsentChecked|`Boolean`|Is the order consent checked?|No|

<!-- @vuese:CaCheckoutCarismar:computed:end -->


