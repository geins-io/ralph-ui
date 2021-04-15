# MixCheckout

All functionality for the checkout **Data:**<br> cartLoading: `false`<br> checkoutLoading: `false`<br> checkout: `{}`<br> desiredDeliveryDate: `null`<br> message: `''`

## Methods

<!-- @vuese:MixCheckout:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|createOrUpdateCheckout|Handling the api call for creating an updating the checkout session|-|
|updateCart|Updating the cart if the cart is different from the existing cart|cart (Object)|
|updateCheckoutData|Updating the checkout data received from Carismar Checkout|data (Object)|
|placeOrder|Placing the order and redirecting to confirm page if completed|-|

<!-- @vuese:MixCheckout:methods:end -->


## Computed

<!-- @vuese:MixCheckout:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|acceptedConsents|`Array`|A list of accepted consents|No|
|checkoutInput|`Object`|The checkout input object prepared for the API|No|

<!-- @vuese:MixCheckout:computed:end -->


