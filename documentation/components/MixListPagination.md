# MixListPagination

Shared pagination functions for product list<br><br> **Data:**<br> currentPage: `1`<br> currentMinCount: `1`,<br> currentMaxCount: `vm.$config.productListPageSize`<br> pageSize: `vm.$config.productListPageSize`<br> totalCount: `0`<br> productList: `[]`<br> mainProductList: `true`<br>

## Methods

<!-- @vuese:MixListPagination:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setupPagination|Setup pagination|products (Object)|
|loadMore|Load next chunk of products|-|

<!-- @vuese:MixListPagination:methods:end -->


## Computed

<!-- @vuese:MixListPagination:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|skeletonProductsNext|`Array`|Returns an array of empty objects with same lengt as the nr of products left to load|No|
|allProductsLoaded|`Boolean`|Are all products loaded?|No|
|showing|`String`|Returns string of span of products showing right now, for example '10 - 20'|No|

<!-- @vuese:MixListPagination:computed:end -->


