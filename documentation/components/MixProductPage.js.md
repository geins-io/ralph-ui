# MixProductPage.js

All functionality for the product page<br><br> **Data:**<br> product: `null`<br> quantity: `1`<br> replaceAlias: `null`<br> currentNotifyVariant: `{}`<br> relatedProducts: `[]`<br>

## Methods

<!-- @vuese:MixProductPage.js:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|imgSrc|Image src used for meta image|size (String)|
|onQuantityChange|Handler for changing quantity|value (Number)|
|addToCartClick|Action for clicking the add to cart button|-|
|replaceProduct|Replace product data without reloading the page. Used for changing between product variants|alias (String)|
|skuChangeHandler|Handler for changing the sku|data (Object)|
|quantityThresholdHandler|Handler for reaching quantity threshold|-|
|appendProductToLatest|Append product id to latest products cookie|-|
|notifyHandler|Handler for clicking the notify button|variant (Object)|
|initProduct|Initiate product|-|

<!-- @vuese:MixProductPage.js:methods:end -->


## Computed

<!-- @vuese:MixProductPage.js:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|variables|`Object`|Variables to be watched by MixFetch|No|
|productImages|`Array`|Quick ref to product images|No|
|prodAlias|`String`|Alias used to fetch product data, using replaceAlias if it has a value|No|
|widgetAreaFilters|`Array`|Returns array of widget filters|No|
|breadcrumbsCurrent|`Object`|Current breadcrumb object|No|
|relatedProductsRelated|`Array`|Related product with relation RELATED|No|
|relatedProductsAccessories|`Array`|Related product with relation ACCESSORIES|No|
|relatedProductsSimilar|`Array`|Related product with relation SIMILAR|No|
|preloadedImages|`Array`|Preloaded images for meta, improving LCP|No|

<!-- @vuese:MixProductPage.js:computed:end -->


## MixIns

<!-- @vuese:MixProductPage.js:mixIns:start -->
|MixIn|
|---|
|MixMetaReplacement|
|MixAddToCart|
|MixVariantHandler|

<!-- @vuese:MixProductPage.js:mixIns:end -->


## Watch

<!-- @vuese:MixProductPage.js:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|undefined|Watching currentStock.totalStock to change quantity if set higher than totalStock|-|

<!-- @vuese:MixProductPage.js:watch:end -->


