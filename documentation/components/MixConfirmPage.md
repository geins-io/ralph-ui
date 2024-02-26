# MixConfirmPage

All functionality for the confirm page<br><br> **Data:**<br> checkoutConfirmData: `null`<br> loading: `true`<br>

## Methods

<!-- @vuese:MixConfirmPage:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|completeCart|Performs the complete cart mutation and resets the cart|-|
|processCartCompletion|Checks if the cart is completed and if not, calls the complete cart method|-|

<!-- @vuese:MixConfirmPage:methods:end -->


## Computed

<!-- @vuese:MixConfirmPage:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|variables|`Object`|The variables for the checkout confirm query|No|
|cartId|`String`|The cart id from the url parameter 'cartid'|No|
|noCart|`Booleen`|No cart id and no order cart|No|
|orderId|`String`|The external order id|No|
|type|`String`|The type of checkout|No|
|orderCart|`Object`|The cart stored with the order|No|
|cartShouldReset|`Boolean`|Returns true if the cart should be resetted|No|
|confirmSnippet|`String`|The html snippet from the external payment provider|No|

<!-- @vuese:MixConfirmPage:computed:end -->


## MixIns

<!-- @vuese:MixConfirmPage:mixIns:start -->
|MixIn|
|---|
|MixDatalayerConfirm|
|MixFetch|

<!-- @vuese:MixConfirmPage:mixIns:end -->


