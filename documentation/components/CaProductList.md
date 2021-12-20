# CaProductList

A list of product cards<br><br> **SASS-path:** _./styles/components/molecules/ca-product-list.scss_

## Props

<!-- @vuese:CaProductList:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|products|Array of products|`Array`|`true`|-|
|pageSize|Current page size|`Number`|`true`|-|
|skip|Current skip|`Number`|`false`|0|
|productCardType|Type of product card, to be able to display slightly different product cards in different product lists|`String`|`false`|default|
|productsFetched|Are the products fetched yet?|`Boolean`|`false`|false|

<!-- @vuese:CaProductList:props:end -->


## Methods

<!-- @vuese:CaProductList:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getPageNumber|Calculates what page number each product card is associated with|index of product (Number)|

<!-- @vuese:CaProductList:methods:end -->


