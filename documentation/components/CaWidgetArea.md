# CaWidgetArea

The area that contains the widget containers and from which the graphql query for widgets is made.<br><br> **SASS-path:** _./styles/components/molecules/ca-widget-area.scss_

## Props

<!-- @vuese:CaWidgetArea:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|widgetData|The widget area data if loaded from parent on server|`Object`|`false`|null|
|family|The widget area family|`String`|`false`|-|
|areaName|The widget area name|`String`|`false`|-|
|alias|The widget area alias, if content page|`String`|`false`|-|
|widgetImageSizes|Sizes attribute for widget images. Set with widget size as key like so: `{full: '(min-width:1360px) 1320px, 96vw'}` etc. Defaults to $config.widgetImageSizes if not set|`Object`|`false`|null|
|filters|Filters for the area|`Array`|`false`|[]|
|preview|Set to true for preview mode|`Boolean`|`false`|false|
|listPageUrl|Url for list page if using /l/ routing and widget area is on list page|`String`|`false`|-|
|fetchProductsOnServer|-|`Boolean`|`false`|false|

<!-- @vuese:CaWidgetArea:props:end -->


## Events

<!-- @vuese:CaWidgetArea:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|dataFetched|-|-|

<!-- @vuese:CaWidgetArea:events:end -->


## MixIns

<!-- @vuese:CaWidgetArea:mixIns:start -->
|MixIn|
|---|
|MixFetch|

<!-- @vuese:CaWidgetArea:mixIns:end -->


