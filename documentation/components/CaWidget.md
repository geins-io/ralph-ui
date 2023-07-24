# CaWidget

Shell for displaying widget component based on type<br><br> **SASS-path:** _./styles/components/molecules/ca-widget.scss_

## Props

<!-- @vuese:CaWidget:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|configuration|Configuration JSON object|`String`|`true`|-|
|type|Type of widget|'Image', 'Text', 'Product list'|`true`|-|
|imageSizes|Sizes attribute for the widget image|`String`|`true`|-|
|imageRatios|-|`Array`|`true`|-|
|isFirst|-|`Boolean`|`false`|false|
|widgetAreaVariables|-|`Object`|`true`|-|
|fetchProductsOnlyClientSide|Fetch products only client side|`Boolean`|`false`|false|

<!-- @vuese:CaWidget:props:end -->


## Events

<!-- @vuese:CaWidget:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|widget-mounted|-|-|

<!-- @vuese:CaWidget:events:end -->


## MixIns

<!-- @vuese:CaWidget:mixIns:start -->
|MixIn|
|---|
|MixWidgetType|

<!-- @vuese:CaWidget:mixIns:end -->


