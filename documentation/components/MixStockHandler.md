# MixStockHandler

Handling all stock methods and computed<br><br> **Data:**<br> defaultStock: `{ totalStock: 0, inStock: 0, oversellable: 0, static: 0, incoming: null }`<br> quantity: `1`<br>

## Methods

<!-- @vuese:MixStockHandler:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getStockStatus|Get stock status. Argument **stock** defaults to this.currentStock. Available statuses are: 'OUT_OF_STOCK', 'IN_STOCK', 'FEW_LEFT', 'OVERSELLABLE', 'STATIC'|stock (Number)|
|getStockStatusText|Get stock status lang key. Argument **stock** defaults to this.currentStock|stock (Object)|
|getStockStatusDeliveryTime|Get stock status lang key. Argument **stock** defaults to this.currentStock|stock (Object)|
|getStockStatusClass|Get stock status in kebab-case. Argument **stock** defaults to this.currentStock|stock (Object)|

<!-- @vuese:MixStockHandler:methods:end -->


## Computed

<!-- @vuese:MixStockHandler:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|currentStock|`Number`|Returns value of data variable 'stock'. Made to be overwritten by the context|No|
|stockStatus|`String`|Returns a stock status. Available statuses are: 'OUT_OF_STOCK', 'IN_STOCK', 'FEW_LEFT', 'OVERSELLABLE', 'STATIC'|No|
|stockStatusText|`String`|Returns stock status text content based on stock status|No|
|chosenSkuCartQuantity|`Number`|Returns the number of items with same skuId as the chosen one that you have in cart|No|
|stockThreshold|`Number`|Returns the quantity left in stock subtracting items in cart|No|
|outOfStock|`Boolean`|Returns true if product is out of stock|No|

<!-- @vuese:MixStockHandler:computed:end -->


