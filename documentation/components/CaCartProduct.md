# CaCartProduct

A product displayed in the cart<br><br> **SASS-path:** _./styles/components/molecules/ca-cart-product.scss_

## Props

<!-- @vuese:CaCartProduct:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|item|The cart product item|`Object`|`true`|-|
|mode|Set to display mode to show a non interactable cart|'default', 'display'|`false`|default|
|refunded|Set to true if the product is refunded|`Boolean`|`false`|false|

<!-- @vuese:CaCartProduct:props:end -->


## Events

<!-- @vuese:CaCartProduct:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|stock-status-change|-|-|
|remove|-|-|

<!-- @vuese:CaCartProduct:events:end -->


## Methods

<!-- @vuese:CaCartProduct:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onQuantityChange|Quantity change handler|value (Number)|
|emitStockStatus|Emitting stock status change|-|
|removeItem|Removing item and emitting "remove"|-|

<!-- @vuese:CaCartProduct:methods:end -->


## MixIns

<!-- @vuese:CaCartProduct:mixIns:start -->
|MixIn|
|---|
|MixUpdateCart|
|MixStockHandler|

<!-- @vuese:CaCartProduct:mixIns:end -->


