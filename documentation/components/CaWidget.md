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
|fetchProductsOnServer|-|`Boolean`|`false`|false|

<!-- @vuese:CaWidget:props:end -->


## MixIns

<!-- @vuese:CaWidget:mixIns:start -->
|MixIn|
|---|
|MixWidgetType|

<!-- @vuese:CaWidget:mixIns:end -->


