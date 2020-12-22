# MixStockHandler

Handling all stock methods and computed<br><br> **Data:**<br> stock: `0`<br>

## Methods

<!-- @vuese:MixStockHandler:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getStockStatus|Get stock status. Argument **stock** defaults to this.currentStock. Available statuses are: 'out-of-stock', 'in-stock', 'few-left'|stock (Number)|
|getStockStatusText|Get stock status lang key. Argument **stock** defaults to this.currentStock|stock (Number)|

<!-- @vuese:MixStockHandler:methods:end -->


## Computed

<!-- @vuese:MixStockHandler:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|currentStock|`Number`|Returns value of data variable 'stock'. Made to be overwritten by the context|No|
|stockStatus|`String`|Returns a stock status. Available statuses are: 'out-of-stock', 'in-stock', 'few-left'|No|
|stockStatusText|`String`|Returns stock status text content based on stock status|No|
|chosenSkuCartQuantity|`Number`|Returns the number of items with same skuId as the chosen one that you have in cart|No|
|stockThreshold|`Number`|Returns the quantity left in stock subtracting items in cart|No|

<!-- @vuese:MixStockHandler:computed:end -->


