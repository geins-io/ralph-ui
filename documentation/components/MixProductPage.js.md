# MixProductPage.js

All functionality for the product page<br><br> **Data:**<br> quantity: `1`<br> replaceAlias: `null`<br>

## Methods

<!-- @vuese:MixProductPage.js:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|emitGTMEvent|GTM event emitter|-|
|onQuantityChange|Handler for changing quantity|value (Number)|
|addToCartClick|Action for clicking the add to cart button|-|
|replaceProduct|Replace product data without reloading the page. Used for changing between product variants|alias (String)|
|sizeChangeHandler|Handler for changing the sku|data (Object)|
|quantityThresholdHandler|Handler for reaching quantity threshold|-|
|switchToCanonical|Switching to canonical url if different from route path|-|
|notifyHandler|Handler for clicking the notify button|variant (Object)|
|sendImpressionEvent|Sending the product detail impression event|-|

<!-- @vuese:MixProductPage.js:methods:end -->


## Computed

<!-- @vuese:MixProductPage.js:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|productImages|`Array`|Quick ref to product images|No|
|prodAlias|`String`|Alias used to fetch product data, using replaceAlias if it has a value|No|
|widgetAreaFilters|`Array`|Returns array of widget filters|No|
|breadcrumbsCurrent|`Object`|Current breadcrumb object|No|
|relatedProductsRelated|`Array`|Related product with relation RELATED|No|
|relatedProductsAccessories|`Array`|Related product with relation ACCESSORIES|No|
|relatedProductsSimilar|`Array`|Related product with relation SIMILAR|No|
|imgSrc|`[String, Boolean]`|Image src used for meta image|No|

<!-- @vuese:MixProductPage.js:computed:end -->


## MixIns

<!-- @vuese:MixProductPage.js:mixIns:start -->
|MixIn|
|---|
|MixMetaReplacement|
|MixApolloRefetch|

<!-- @vuese:MixProductPage.js:mixIns:end -->


## Watch

<!-- @vuese:MixProductPage.js:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|undefined|Watching currentStock.totalStock to change quantity if set higher than totalStock|-|
|prodAlias|Watching prodAlias to fetch request when alias state change|-|
|undefined|Watching productId to send impression event when changing variant|-|

<!-- @vuese:MixProductPage.js:watch:end -->


