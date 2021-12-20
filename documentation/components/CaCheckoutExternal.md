# CaCheckoutExternal

Renders the external checkout frame from a snippet given by the API. Has built in support for Klarna and SVEA Checkout<br><br> **SASS-path:** _./styles/components/atoms/ca-checkout-external.scss_

## Props

<!-- @vuese:CaCheckoutExternal:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|The external checkout snippet received from the api|`String`|`false`|null|
|newCheckoutSession|Is it a new checkout session?|`Boolean`|`false`|false|
|confirm|Is this the confirm page?|`Boolean`|`false`|false|
|type|What type of payment?|`KLARNA`, `SVEA`|`true`|-|

<!-- @vuese:CaCheckoutExternal:props:end -->


## Methods

<!-- @vuese:CaCheckoutExternal:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|initialize|Initializing the checkout frame|-|
|initScript|Initializing all scripts|-|
|suspend|Suspend the checkout|-|
|resume|Resume the checkout|-|
|fetchConfirm|Fetch the confirm frame|-|

<!-- @vuese:CaCheckoutExternal:methods:end -->


## Computed

<!-- @vuese:CaCheckoutExternal:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|orderId|`String`|The external order id|No|

<!-- @vuese:CaCheckoutExternal:computed:end -->


