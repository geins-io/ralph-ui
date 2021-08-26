# CaCheckoutKlarna

A component used to display the Klarna Checkout iFrame<br><br> **SASS-path:** _./styles/components/atoms/ca-checkout-klarna.scss_

## Props

<!-- @vuese:CaCheckoutKlarna:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|The response markup from Klarna|`String`|`false`|null|
|newCheckoutSession|Is it a new checkout session?|`Boolean`|`false`|false|
|confirm|Is this the confirm page?|`Boolean`|`false`|false|

<!-- @vuese:CaCheckoutKlarna:props:end -->


## Methods

<!-- @vuese:CaCheckoutKlarna:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|initialize|Initializing the checkout frame|-|
|initScript|Initializing all scripts|-|
|suspend|Suspend the checkout|-|
|resume|Resume the checkout|-|
|fetchConfirm|Fetch the confirm frame|-|

<!-- @vuese:CaCheckoutKlarna:methods:end -->


## Computed

<!-- @vuese:CaCheckoutKlarna:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|klarnaOrderId|`String`|The Klarna order id|No|

<!-- @vuese:CaCheckoutKlarna:computed:end -->


