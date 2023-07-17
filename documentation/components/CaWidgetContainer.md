# CaWidgetContainer

A container holding a set of widgets<br><br> **SASS-path:** _./styles/components/molecules/ca-widget-container.scss_

## Props

<!-- @vuese:CaWidgetContainer:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|container|The container data object|`Object`|`true`|-|
|widgetImageSizes|Sizes attribute for widget images. Set with widget size as key like so: `{full: '(min-width:1360px) 1320px, 96vw'}` etc. Defaults to $config.widgetImageSizes if not set|`Object`|`false`|null|
|isFirst|-|`Boolean`|`false`|false|
|widgetAreaVariables|-|`Object`|`true`|-|
|fetchProductsOnlyClientSide|Fetch products only client side|`Boolean`|`false`|false|

<!-- @vuese:CaWidgetContainer:props:end -->


## Events

<!-- @vuese:CaWidgetContainer:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|container-mounted|-|-|

<!-- @vuese:CaWidgetContainer:events:end -->


