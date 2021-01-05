# MixProductPage.js

All functionality for the product page<br><br> **Data:**<br> quantity: `1`<br> replaceAlias: `null`<br> error: `null`

## Methods

<!-- @vuese:MixProductPage.js:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onQuantityChange|Handler for changing quantity|value (Number)|
|addToCartClick|Action for clicking the add to cart button|-|
|replaceProduct|Replace product data without reloading the page. Used for changing between product variants|alias (String)|
|sizeChangeHandler|Handler for changing the sku|data (Object)|
|quantityThresholdHandler|Handler for reaching quantity threshold|-|

<!-- @vuese:MixProductPage.js:methods:end -->


## Computed

<!-- @vuese:MixProductPage.js:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|productImages|`Array`|Quick ref to product images|No|
|prodAlias|`String`|Alias used to fetch product data, using replaceAlias if it has a value|No|

<!-- @vuese:MixProductPage.js:computed:end -->


## Watch

<!-- @vuese:MixProductPage.js:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|currentStock|Watching currentStock to change quantity if set higher than totalStock|-|

<!-- @vuese:MixProductPage.js:watch:end -->

