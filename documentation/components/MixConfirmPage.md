# MixConfirmPage

All functionality for the confirm page<br><br> **Data:**<br> orderCart: `null`<br>

## Methods

<!-- @vuese:MixConfirmPage:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|completeCart|Performs the complete cart mutation and resets the cart|-|
|confirmCartQuery|Calls the summary once the component is mounted|-|

<!-- @vuese:MixConfirmPage:methods:end -->


## Computed

<!-- @vuese:MixConfirmPage:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|cartId|`String`|The cart id from the url parameter 'cartid'|No|
|noCart|`Booleen`|No cart id and no order cart|No|

<!-- @vuese:MixConfirmPage:computed:end -->


## MixIns

<!-- @vuese:MixConfirmPage:mixIns:start -->
|MixIn|
|---|
|MixDatalayerConfirm|

<!-- @vuese:MixConfirmPage:mixIns:end -->


