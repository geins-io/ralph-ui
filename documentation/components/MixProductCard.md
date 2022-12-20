# MixProductCard

All functionality for the product card<br><br> **Data:**<br> observer: `null`<br> trackCounter: `0`<br>

## Props

<!-- @vuese:MixProductCard:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|baseTag|Base elemetn tag|`String`|`false`|-|
|product|Product data|`Object`|`true`|-|
|pageNumber|Current page number|`Number`|`false`|-|

<!-- @vuese:MixProductCard:props:end -->


## Methods

<!-- @vuese:MixProductCard:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|productClickHandler|Handling product click|-|
|gtmViewEvent|Pushing GTM Product Impression|-|
|gtmClickEvent|Pushing GTM Product Click|-|
|getGtmProduct|Getting gtm formatted product|-|

<!-- @vuese:MixProductCard:methods:end -->


## Computed

<!-- @vuese:MixProductCard:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|productPopulated|`Boolean`|Is the product populated with data|No|

<!-- @vuese:MixProductCard:computed:end -->


