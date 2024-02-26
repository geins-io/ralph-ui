# CaWidgetProductList

Widget displaying a product list<br><br> **SASS-path:** _./styles/components/molecules/ca-widget-product-list.scss_

## Props

<!-- @vuese:CaWidgetProductList:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|configuration|Widget configuration object|`Object`|`true`|-|

<!-- @vuese:CaWidgetProductList:props:end -->


## Computed

<!-- @vuese:CaWidgetProductList:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|variables|`Object`|Variables in product request|No|
|noProducts|`Boolean`|Products loaded but no result|No|
|noData|`Boolean`|No data to show|No|
|take|`Number`|How many products to take|No|
|loadMoreQueryVars|`Object`|Returns the variable object for loading more products|No|
|isLatestMode|`Boolean`|Is widget on latest products mode|No|
|isFavoriteMode|`Boolean`|Is widget on favorite products mode|No|
|isTitleVisible|`Boolean`|Is title visible|No|
|latestProducts|`Array`|Latest visible products|No|
|favoriteProducts|`Array`|Favorite products|Yes|

<!-- @vuese:CaWidgetProductList:computed:end -->


## MixIns

<!-- @vuese:CaWidgetProductList:mixIns:start -->
|MixIn|
|---|
|MixFetch|
|MixListPagination|

<!-- @vuese:CaWidgetProductList:mixIns:end -->


