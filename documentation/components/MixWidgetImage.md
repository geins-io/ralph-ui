# MixWidgetImage

Shared functionality between widgets that has images

## Props

<!-- @vuese:MixWidgetImage:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|configuration|Widget configuration object|`Object`|`true`|-|
|imageSizes|Sizes attribute for widget image|`String`|`true`|-|
|imageRatios|Image ratios|`Array`|`true`|-|

<!-- @vuese:MixWidgetImage:props:end -->


## Computed

<!-- @vuese:MixWidgetImage:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|href|`String`|The href of the image|No|
|altText|`String`|The alt text|No|
|filename|`String`|The current filename, can be different images on phone or computer|No|
|filenamePhone|`String`|File name for phones|No|
|filenameTabletUp|`String`|File names if not phone|No|
|currentSize|`Object`|The current largest size for the image, object containing height and width|No|
|currentRatio|`Number`|The current image ratio|No|
|fullWidth|`Boolean`|Is widget have full width|No|

<!-- @vuese:MixWidgetImage:computed:end -->


## MixIns

<!-- @vuese:MixWidgetImage:mixIns:start -->
|MixIn|
|---|
|MixLinkHandler|

<!-- @vuese:MixWidgetImage:mixIns:end -->


