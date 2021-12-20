# MixListPage.js

import filtersQuery from 'productlist/products-filter.graphql'; All functionality for the list page<br><br> **Data:**<br> userSkip: `0`<br> sort: `vm.$config.productListDefaultSort`<br> defaultSort: `vm.$config.productListDefaultSort`<br> listInfo: `null`<br> filters: `{}`<br> userSelection: `null`<br> filterParamQuery: `{}`<br> skipProductsQuery: `false`<br> relocateTimeout: `null`<br> URLparamsRead: `false`<br> filtersSet: `false`<br> userHasPaged: `false`<br> productsFetched: `false`<br>

## Props

<!-- @vuese:MixListPage.js:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|Type of list page|'category', 'brand', 'search', 'favorites', 'all'|`false`|-|
|infoQuery|Graphql for the listPageInfo query|`Object`|`true`|-|
|currentAlias|Current alias for the page|`String`|`true`|-|
|baseFilters|All filters for this list page before filtering is done|`Object`|`true`|-|
|implicitFacets|Automatically applied parameters, added through routing. Can be used for section style routing. See Ekotextil for implementation example.|`Array`|`false`|[]|

<!-- @vuese:MixListPage.js:props:end -->


## Methods

<!-- @vuese:MixListPage.js:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|loadMore|Load next chunk of products|-|
|loadPrev|Load previous chunk of products|-|
|getScrollHeight|Get the current scroll height of the page, used to keep scroll in the right position while loading previous products|-|
|sortChangeHandler|Update the sort setting|new value (String)|
|filterChangeHandler|Update the filter selections|new value (Object)|
|resetFilters|Resetting the filter selections|-|
|resetCurrentPage|Reset paging state|-|
|pushURLParams|Set filter selection in URL|-|
|setPagingState|Sets current page from URL or saved state|-|
|initProductList|Run to init the product list|-|
|relocateProduct|Runned to relocate product on page after back navigating|-|
|setupUserSelection|Setting up the current user selection from store|-|
|setupFilters|Setting up all filters|filters (Object)|
|updateFilters|Updating all filters|filters (Object)|
|setNewCount|Used to set new count of filters|base filters (Array), new filters (Array)|
|getSortedFilters|Sorting all filters into groups|filters (Object)|
|getReadableParams|Setting up params for filter in URL|filter selection (Array)|
|switchToCanonicalOr404|Switching to canonical url if different from route path|-|
|handleFilteredRoutesRouting|Controls routing between filtered paths on the same category/brand etc|-|

<!-- @vuese:MixListPage.js:methods:end -->


## Computed

<!-- @vuese:MixListPage.js:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|skip|`Number`|Current number of products to skip when querying|No|
|filterURLparams|`Object`|Returns the filter object used to query products based on filters|No|
|modifier|`String`|The modifer class for the list page|No|
|isCategory|`Boolean`|Is this list page of type category?|No|
|isBrand|`Boolean`|Is this list page of type brand?|No|
|isSearch|`Boolean`|Is this list page of type search?|No|
|isAll|`Boolean`|Is this list page of type all?|No|
|selection|`Object`|Current selection|No|
|productsQueryFilter|`Object`|Returns the filter object for the productsQueryVars|No|
|totalFiltersActive|`Number`|Number of total filters active|No|
|filterSelectionActive|`Boolean`|Is a filter selection made?|No|
|productsQueryVars|`Object`|Returns the variable object with the query parameters for the product list|No|
|loadMoreQueryVars|`Object`|Returns the variable object for loading more products|No|
|loadPrevQueryVars|`Object`|Returns the variable object for loading previous products|No|
|skeletonProducts|`Array`|Returns an array of empty objects with same lengt as pageSize|No|
|widgetAreaFilters|`Array`|Returns array of widget filters|No|
|breadcrumbsCurrent|`Object`|Current bredcrumb info|No|
|showControls|`Boolean`|Show filters and other controls|No|

<!-- @vuese:MixListPage.js:computed:end -->


## MixIns

<!-- @vuese:MixListPage.js:mixIns:start -->
|MixIn|
|---|
|MixMetaReplacement|
|MixListPagination|

<!-- @vuese:MixListPage.js:mixIns:end -->


