# CaListPagination

Buttons for paginating the product list<br><br> **SASS-path:** _./styles/components/molecules/ca-list-pagination.scss_

## Props

<!-- @vuese:CaListPagination:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|direction|The direction of the pagination|`next` or `prev`|`false`|next|
|totalCount|The total number of products|`Number`|`true`|-|
|loading|Is the list loading?|`Boolean`|`true`|-|
|minCount|Current min count|`Number`|`true`|-|
|maxCount|Current max count|`Number`|`true`|-|
|text|If you want to override the pagination text, you can do it here|`String`|`false`|-|
|hideBackLink|Hide the back link, this exists mainly for SEO purposes|`Boolean`|`false`|false|

<!-- @vuese:CaListPagination:props:end -->


## Events

<!-- @vuese:CaListPagination:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|loadmore|-|-|
|reset|-|-|

<!-- @vuese:CaListPagination:events:end -->


## Computed

<!-- @vuese:CaListPagination:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|page|`Number`|Current page|No|
|isPartial|`Boolean`|Is the list partial?|No|
|paginationText|`String`|The pagination text|No|
|buttonHref|`String`|The href for the button|No|
|showing|`String`|The span of products showing|No|
|allProductsLoaded|`Boolean`|Are all products loaded?|No|

<!-- @vuese:CaListPagination:computed:end -->


