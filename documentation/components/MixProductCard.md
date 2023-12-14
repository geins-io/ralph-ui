# MixProductCard

All functionality for the product card<br><br> **Data:**<br> observer: `null`<br> trackCounter: `0`<br>

## Props

<!-- @vuese:MixProductCard:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|baseTag|Base elemetn tag|`String`|`false`|-|
|productData|Product data|`Object`|`true`|-|
|pageNumber|Current page number|`Number`|`false`|-|

<!-- @vuese:MixProductCard:props:end -->


## Methods

<!-- @vuese:MixProductCard:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|productClickHandler|Handling product click|-|
|addToCartClick|Add to cart if skuId is present, otherwise go to product|-|
|setProduct|Setting product of the product card if other than productData)|-|

<!-- @vuese:MixProductCard:methods:end -->


## Computed

<!-- @vuese:MixProductCard:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|product|`Object`|The product data|No|
|productPopulated|`Boolean`|Is the product populated with data|No|
|skuId|`String`|The current skuId if only one, otherwise empty string|No|
|chosenSkuCartQuantity|`Number`|Returns the number of items with same skuId as the chosen one that you have in cart|No|
|listIndex|`Number`|Returns the index of the product in the list|No|

<!-- @vuese:MixProductCard:computed:end -->


## MixIns

<!-- @vuese:MixProductCard:mixIns:start -->
|MixIn|
|---|
|MixAddToCart|

<!-- @vuese:MixProductCard:mixIns:end -->


