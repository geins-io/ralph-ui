# MixListPage

All functionality for the list page<br><br> **Data:**<br> productList: `[]`<br> totalCount: `0`<br> skip: `0`<br> pageSize: `vm.$config.productListPageSize`<br> sort: `vm.$config.productListDefaultSort`<br> defaultSort: `vm.$config.productListDefaultSort`<br> listInfo: `null`<br> filters: `{}`<br> selection: `{ categories: [], brands: [] }`<br> filterParamQuery: `{}`<br> skipProductsQuery: `false`<br> currentPage: `1`<br> currentMinCount: `1`,<br> currentMaxCount: `vm.$config.productListPageSize` relocateTimeout: `null`

## Props

<!-- @vuese:MixListPage:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|Type of list page|'category', 'brand', 'search', 'favorites'|`false`|-|
|infoQuery|Graphql for the listPageInfo query|`Object`|`true`|-|
|productsQuery|Graphql for the products query|`Object`|`true`|-|
|currentAlias|Current alias for the page|`String`|`true`|-|

<!-- @vuese:MixListPage:props:end -->


## Methods

<!-- @vuese:MixListPage:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|loadMore|Load next chunk of products|-|
|loadPrev|Load previous chunk of products|-|
|getScrollHeight|Get the current scroll height of the page, used to keep scroll in the right position while loading previous products|-|
|setInitPriceSelection|Set price filter selection|lowest price (Number), highest price (Number)|
|setInitPriceLowest|Set price filter selection for lowest price|price (Number)|
|setInitPriceHighest|Set price filter selection for highest price|price (Number)|
|sortChangeHandler|Update the sort setting|new value (String)|
|filterChangeHandler|Update the filter selections|new value (Object)|
|resetFilters|Resetting the filter selections|-|
|resetCurrentPage|Reset paging state|-|
|pushURLParams|Set filter selection in URL|-|
|readURLParams|Read filter selection from URL|-|
|setPagingState|Sets current page from URL or saved state|-|
|initProductList|Run to init the product list|-|
|relocateProduct|Runned to relocate product on page after back navigating|-|

<!-- @vuese:MixListPage:methods:end -->


## Computed

<!-- @vuese:MixListPage:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|allProductsLoaded|`Boolean`|Are all products loaded?|No|
|showing|`String`|Returns string of span of products showing right now, for example '10 - 20'|No|
|filterQuery|`Object`|Returns the filter object used to query products based on filters|No|
|modifier|`String`|The modifer class for the list page|No|
|isCategory|`Boolean`|Is this list page of type category?|No|
|isBrand|`Boolean`|Is this list page of type brand?|No|
|filterSelectionActive|`Boolean`|Is a filter selection made?|No|
|productsQueryVars|`Object`|Returns the variable object with the query parameters for the product list|No|
|loadMoreQueryVars|`Object`|Returns the variable object for loading more products|No|
|loadPrevQueryVars|`Object`|Returns the variable object for loading previous products|No|
|skeletonProducts|`Array`|Returns an array of empty objects with same lengt as pageSize|No|
|widgetAreaFilters|`Array`|Returns array of widget filters|No|

<!-- @vuese:MixListPage:computed:end -->


## MixIns

<!-- @vuese:MixListPage:mixIns:start -->
|MixIn|
|---|
|MixMetaReplacement|

<!-- @vuese:MixListPage:mixIns:end -->


