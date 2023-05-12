# CaToggleFavorite

A component for the toggle favorite icon<br><br> **SASS-path:** _./styles/components/atoms/ca-toggle-favorite.scss_

## Props

<!-- @vuese:CaToggleFavorite:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|prodAlias|The product alias|`String`|`true`|-|
|prodId|The product id|`Number`|`true`|-|
|iconName|The icon name|`String`|`false`|heart|
|product|The product object, if added here it will get sent to the datalayer|`Object`|`false`|{}|

<!-- @vuese:CaToggleFavorite:props:end -->


## Methods

<!-- @vuese:CaToggleFavorite:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|toggleFavorite|Toggle the favorite state of the current product|-|

<!-- @vuese:CaToggleFavorite:methods:end -->


## Computed

<!-- @vuese:CaToggleFavorite:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|isFavorite|`Boolean`|Is the current product already a favorite?|No|
|ariaLabel|`String`|The aria label for the button|No|

<!-- @vuese:CaToggleFavorite:computed:end -->


