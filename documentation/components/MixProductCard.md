# MixProductCard

All functionality for the product card<br><br> **Data:**<br> observer: `null`<br> trackCounter: `0`<br>

## Props

<!-- @vuese:MixProductCard:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|baseTag|Base elemetn tag|`String`|`false`|-|
|product|Product data|`Object`|`true`|-|
|pageNumber|Current page number|`Number`|`false`|-|

<!-- @vuese:MixProductCard:props:end -->


## Methods

<!-- @vuese:MixProductCard:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|productClickHandler|Handling product click|-|
|addToCartClick|Add to cart if skuId is present, otherwise go to product|-|
|gtmViewEvent|Pushing GTM Product Impression|-|
|nostoClickEvent|Pushing GTM Nosto click event|-|
|gtmClickEvent|Pushing GTM Product Click|-|
|getGtmProduct|Getting gtm product format|-|

<!-- @vuese:MixProductCard:methods:end -->


## Computed

<!-- @vuese:MixProductCard:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|nostoResultId|`String`|ResultId of nosto product list request|No|
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


