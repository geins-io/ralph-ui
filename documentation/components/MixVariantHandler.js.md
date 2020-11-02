# MixVariantHandler.js

Handler of product variant data. Expects product object to work with<br><br> **Data:**<br> chosenSku: `{ id: null, value: '' }`<br>

## Methods

<!-- @vuese:MixVariantHandler.js:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setDefaultSku|Function to set default sku when no variants exists|-|
|setSku|Set chosenSku object values|id (Number), value (String)|
|resetSku|Resets chosenSku|-|

<!-- @vuese:MixVariantHandler.js:methods:end -->


## Computed

<!-- @vuese:MixVariantHandler.js:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|variantGroups|`Object`|Quick ref to product variant group|No|
|hasColorVariants|`Boolean`|Does the has variants of type Color?|No|
|colorVariants|`Object`|Get group of color variants|No|
|colorProductAliases|`Array`|Returns a list of aliases for the color variants|No|
|hasSkuVariants|`Boolean`|Does sku variants exist for current product?|No|
|skuVariants|`Array`|Returns a list of sku variant for current product|No|
|currentStock|`Number`|Return total stock quantity based on chosen sku variant|No|
|stockStatus|`String`|Returns a stock status. Available statuses are: 'out-of-stock', 'in-stock', 'few-left'|No|
|stockStatusText|`String`|Returns stock status text content based on stock status|No|
|chosenSkuCartQuantity|`Number`|Returns the number of items with same skuId as the chosen one that you have in cart|No|
|stockThreshold|`Number`|Returns the quantity left in stock subtracting items in cart|No|

<!-- @vuese:MixVariantHandler.js:computed:end -->


