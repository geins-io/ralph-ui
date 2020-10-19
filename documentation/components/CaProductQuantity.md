# CaProductQuantity

Used to modify quantity of products<br><br> **SASS-path:** _./styles/components/molecules/ca-product-quantity.scss_

## Props

<!-- @vuese:CaProductQuantity:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|quantity|The quantity to be modified|`Number`|`true`|-|
|inputDisabled|Used to disable user input in the input field|`Boolean`|`false`|`false`|
|maxQuantity|What is the maximum quantity? Stock status|`Number`|`true`|-|
|minQuantity|What is the minimum quantity? Default 1|`Number`|`false`|1|

<!-- @vuese:CaProductQuantity:props:end -->


## Events

<!-- @vuese:CaProductQuantity:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|changed|Count has been changed|new count (Number)|
|maxReached|Max count reached|-|
|minReached|Min count reached|-|

<!-- @vuese:CaProductQuantity:events:end -->


## Methods

<!-- @vuese:CaProductQuantity:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|update|Update count|-|
|increase|Increase count by one|-|
|decrease|Decrease count by one|-|
|validateEmpty|If field is empty on blur, set to minimum count|-|
|validateInput|Validate count input field. Can only contain number and not be above or below max count|-|

<!-- @vuese:CaProductQuantity:methods:end -->


