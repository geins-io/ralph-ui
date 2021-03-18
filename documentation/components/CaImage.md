# CaImage

Display an image in a specific size<br><br> **SASS-path:** _./styles/components/atoms/ca-image.scss_

## Props

<!-- @vuese:CaImage:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|sizeArray|The Array of Objects with image sizes for the image. E.g [{folder: '100x100', descriptor: '100w'}}|`Array`|`false`|[]|
|sizes|The sizes string|`String`|`false`|-|
|filename|The filename part of the image path|`String`|`false`|-|
|type|Type of image, also name of the folder in the image path|`String`|`false`|-|
|alt|A human friendly description of the image, for screen readers and SEO|`String`|`true`|-|
|ratio|The ratio of the image, height / width|`Number`|`true`|-|
|forceRatio|Force the image to keep supplied ratio|`Boolean`|`false`|false|
|src|Direct link to image if not from image service|`String`|`false`|-|
|loading|Value for the loading attribute|`String`|`false`|lazy|

<!-- @vuese:CaImage:props:end -->


## Events

<!-- @vuese:CaImage:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|loaded|When image is loaded|-|

<!-- @vuese:CaImage:events:end -->


## Methods

<!-- @vuese:CaImage:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|loadedAction|Action for when image is loaded|-|

<!-- @vuese:CaImage:methods:end -->


