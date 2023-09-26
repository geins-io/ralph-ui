# MixListPage

All functionality for the list page<br><br> **Data:**<br> baseFilters: `{}`<br> userSkip: `0`<br> filters: `{}`<br> userSelection: `null`<br> filterParamQuery: `{}`<br> relocateTimeout: `null`<br> URLparamsRead: `false`<br> filtersSet: `false`<br> userHasPaged: `false`<br> productsFetched: `false`<br>

## Props

<!-- @vuese:MixListPage:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|Type of list page|'list', 'category', 'brand', 'search', 'favorites', 'all'|`false`|-|
|currentAlias|Current alias for the page|`String`|`false`|-|
|currentPath|Current url path for the page|`String`|`false`|-|
|filtersVars|Base filters for this page|`Object`|`false`|{}|
|implicitFacets|Automatically applied parameters, added through routing. Can be used for section style routing. See Ekotextil for implementation example.|`Array`|`false`|[]|
|excludeFacets|Exclude facets by facet ids|`Array`|`false`|[]|
|listInfo|The list info object, either static or fetched from the API. Must contain at least name, meta title and meta description like so: `{ name: '', meta: { title: '', description: ''} }`|`Object`|`false`|-|

<!-- @vuese:MixListPage:props:end -->


## Methods

<!-- @vuese:MixListPage:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getScrollHeight|Get the current scroll height of the page, used to keep scroll in the right position while loading previous products|-|
|sortChangeHandler|Update the sort setting|new value (String)|
|filterChangeHandler|Update the filter selections|new value (Object)|
|resetFilters|Resetting the filter selections|-|
|resetCurrentPage|Reset paging state|-|
|pushURLParams|Set filter selection in URL|-|
|setPagingState|Sets current page from URL or saved state|-|
|relocateProduct|Runned to relocate product on page after back navigating|-|
|setupUserSelection|Setting up the current user selection from store|-|
|setupFilters|Setting up all filters|filters (Object)|
|updateFilters|Updating all filters|filters (Object)|
|setNewCount|Used to set new count of filters|base filters (Array), new filters (Array)|
|getSortedFilters|Sorting all filters into groups|filters (Object)|
|getReadableParams|Setting up params for filter in URL|filter selection (Array)|
|handleFilteredRoutesRouting|Controls routing between filtered paths on the same category/brand etc|-|

<!-- @vuese:MixListPage:methods:end -->


## Computed

<!-- @vuese:MixListPage:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|urlFilteredList|`Boolean`|Is list filtered by facet in url?|No|
|hideListInfo|`Boolean`|Determine is CaListTop are visible on page|No|
|filtersLoaded|`Boolean`|Status of loading filters state|No|
|isNostoRequest|`Boolean`|Condition to skip nosto request|No|
|categoryAlias|`String`|Returns the current category alias|No|
|skip|`Number`|Current number of products to skip when querying|No|
|filterURLparams|`Object`|Returns the filter object used to query products based on filters|No|
|modifier|`String`|The modifer class for the list page|No|
|isList|`Boolean`|Is this list page of type list?|No|
|isCategory|`Boolean`|Is this list page of type category?|No|
|isBrand|`Boolean`|Is this list page of type brand?|No|
|isCampaign|`Boolean`|Is this list page of type discountCampaign?|No|
|isSearch|`Boolean`|Is this list page of type search?|No|
|isAll|`Boolean`|Is this list page of type all?|No|
|selection|`Object`|Current selection|No|
|productsQueryFilter|`Object`|Returns the filter object for the productsQueryVars|No|
|totalFiltersActive|`Number`|Number of total filters active|No|
|filterSelectionActive|`Boolean`|Is a filter selection made?|No|
|nostoQueryVars|`Object`|Returns the variable object with the query parameters for the nosto product list|No|
|productsQueryVars|`Object`|Returns the variable object with the query parameters for the product list|No|
|filtersQueryVars|`Object`|Returns the variable object with the query parameters for the product list filters|No|
|infoQueryVars|`Object`|Returns the variable object with the query parameters for the product list information|No|
|loadMoreQueryVars|`Object`|Returns the variable object for loading more products|No|
|loadPrevQueryVars|`Object`|Returns the variable object for loading previous products|No|
|skeletonProducts|`Array`|Returns an array of empty objects with same lengt as pageSize|No|
|widgetAreaFilters|`Array`|Returns array of widget filters|No|
|breadcrumbsCurrent|`Object`|Current bredcrumb info|No|
|showControls|`Boolean`|Show filters and other controls|No|
|defaultSort|`String`|Default sort option, will return "RELEVANCE" if on search page, otherwise will return the `productListDefaultSort` from $config|No|

<!-- @vuese:MixListPage:computed:end -->


## MixIns

<!-- @vuese:MixListPage:mixIns:start -->
|MixIn|
|---|
|MixListPagination|
|MixApolloRefetch|

<!-- @vuese:MixListPage:mixIns:end -->


