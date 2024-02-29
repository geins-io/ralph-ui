# MixProductListSort

A mixin with the default sort functions for a product list **Data:**<br> defaultSortOptions: `['RELEVANCE', 'LATEST', 'MOST_SOLD', 'PRICE', 'PRICE_DESC']`<br> sort: `null`

## Props

<!-- @vuese:MixProductListSort:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|currentSort|The current sort of the product list|`String`|`true`|-|
|customDefaultSortOptions|Custom default sort options can be provided in the format `['SORT_OPTION', 'SORT_OPTION']`|`Array`|`false`|[]|

<!-- @vuese:MixProductListSort:props:end -->


## Events

<!-- @vuese:MixProductListSort:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|sortchange|-|-|

<!-- @vuese:MixProductListSort:events:end -->


## Computed

<!-- @vuese:MixProductListSort:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|sortOptions|`Array`|The sort options for the product list, prepared for a select input|No|

<!-- @vuese:MixProductListSort:computed:end -->


