# CaWidgetProductList

Widget displaying a product list<br><br> **SASS-path:** _./styles/components/molecules/ca-widget-product-list.scss_

## Props

<!-- @vuese:CaWidgetProductList:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|configuration|Widget configuration object|`Object`|`true`|-|
|fetchProductsOnlyClientSide|Fetch products only client side|`Boolean`|`false`|false|

<!-- @vuese:CaWidgetProductList:props:end -->


## Computed

<!-- @vuese:CaWidgetProductList:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|noProducts|`Boolean`|Products loaded but no result|No|
|isWidgetModeStatic|`Boolean`|Is the widget in favorite or latest mode|No|
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


