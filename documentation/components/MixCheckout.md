# MixCheckout

All functionality for the checkout **Data:**<br> debug: `false`<br> cartLoading: `false`<br> checkoutLoading: `false`<br> checkout: `{}`<br> desiredDeliveryDate: `null`<br> message: `''` pickupPoint: `''`, externalShippingId: `''`, nshiftValid: `false` nshiftDataSet: `false` paymentId: `vm.$config.defaultPaymentId` updateDelay: 150` updateTimeout: `null` activeElement: `null` frameLoading: `false` forceExternalCheckoutReset: `false`

## Methods

<!-- @vuese:MixCheckout:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|createOrUpdateCheckout|Handling the api call for creating an updating the checkout session|reason (String)|
|updateCart|Updating the cart if the cart is different from the existing cart|cart (Object)|
|updateCheckoutData|Updating the checkout data received from Carismar Checkout|data (Object)|
|placeOrder|Placing the order and redirecting to confirm page if completed|-|
|initNshift|Initialize Nshift|zip (String)|
|setNshiftData|Nshift callback handler|data (Object)|
|paymentSelectionHandler|Handling the payment selection|payment id (Number)|
|shippingSelectionHandler|Handling the shipping selection|shipping id (Number)|
|setCheckoutMarket|Handling the checkout market selection|market (String)|
|setCartShippingFee|Handling setting of the external shipping fee|fee (Number)|

<!-- @vuese:MixCheckout:methods:end -->


## Computed

<!-- @vuese:MixCheckout:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|acceptedConsents|`Array`|A list of accepted consents|No|
|checkoutInput|`Object`|The checkout input object prepared for the API|No|
|orderMessage|`String`|This is the message that gets sent to the api. Override this if more than just the user inputted message should go in there|No|
|currentZip|`String`|The current billing zip|No|
|hasPaymentOptions|`Boolean`|Is there more than one payment option?|No|
|selectedPaymentOption|`Object`|The selected payment option|No|
|paymentType|`String`|The current payment type|No|
|selectableMarkets|`Array`|All selectable markets|No|
|externalShippingFeeSet|`Boolean`|Is external shipping fee set?|No|

<!-- @vuese:MixCheckout:computed:end -->


## MixIns

<!-- @vuese:MixCheckout:mixIns:start -->
|MixIn|
|---|
|MixPromiseQueue|
|MixFetch|

<!-- @vuese:MixCheckout:mixIns:end -->


