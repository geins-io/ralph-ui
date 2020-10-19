# CaImage

Display an image in a specific size<br><br> **SASS-path:** _./styles/components/atoms/ca-image.scss_

## Props

<!-- @vuese:CaImage:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|size|The size of the image. Defined as '200w', '500x200' or '300f300'|`String`|`true`|-|
|filename|The filename part of the image path|`String`|`true`|-|
|type|Type of image, also name of the folder in the image path|`String`|`true`|-|
|placeholder|This will be displayed until real image is loaded|`String`|`false`|-|

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


