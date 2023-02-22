# CaQuickAddProduct

A summary of a product with a buy button<br><br> **SASS-path:** _./styles/components/atoms/ca-quick-add-product.scss_

## Props

<!-- @vuese:CaQuickAddProduct:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|product|The product data|`Object`|`true`|-|
|useProductCard|Product card design option|`Boolean`|`false`|false|

<!-- @vuese:CaQuickAddProduct:props:end -->


## Methods

<!-- @vuese:CaQuickAddProduct:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|add|Add to cart if skuId is present, otherwise go to product|-|

<!-- @vuese:CaQuickAddProduct:methods:end -->


## Computed

<!-- @vuese:CaQuickAddProduct:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|skuId|`String`|The current skuId if only one, otherwise empty string|No|

<!-- @vuese:CaQuickAddProduct:computed:end -->


## MixIns

<!-- @vuese:CaQuickAddProduct:mixIns:start -->
|MixIn|
|---|
|MixAddToCart|

<!-- @vuese:CaQuickAddProduct:mixIns:end -->


