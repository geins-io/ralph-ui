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
|take|`Number`|How many products to take|No|
|loadMoreQueryVars|`Object`|Returns the variable object for loading more products|No|
|isLatestMode|`Object`|Is widget on latest products mode|No|
|isFavoriteMode|`Object`|Is widget on favorite products mode|No|
|isTitleVisible|`Object`|Is title visible|No|
|latestProducts|`Object`|Latest visible products (need only in latest mode)|No|
|favoritesProducts|`Object`|Latest visible products (need only in favorite mode)|No|
|productVars|`Object`|Variables in product request|No|

<!-- @vuese:CaWidgetProductList:computed:end -->


## MixIns

<!-- @vuese:CaWidgetProductList:mixIns:start -->
|MixIn|
|---|
|MixApolloRefetch|
|MixListPagination|

<!-- @vuese:CaWidgetProductList:mixIns:end -->


