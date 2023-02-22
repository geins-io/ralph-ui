# CaProductGallery

The product page gallery<br><br> **SASS-path:** _./styles/components/molecules/ca-product-gallery.scss_

## Props

<!-- @vuese:CaProductGallery:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|images|Array of the products image filenames|`Array`|`true`|-|
|galleryMode|Gallery mode|'slider', 'plain'|`false`|slider|
|hasOverlay|Use overlay|`Boolean`|`false`|true|
|alt|The alt text for the product images|`String`|`true`|-|
|arrowIconName|First part of icon name for the arrows. Will add '-left', '-right', '-up' or '-down' as fitting|`String`|`false`|chevron|
|showGalleryThumbnails|Display the gallery thumbnails or not|`Boolean`|`false`|true|
|thumbnailMode|Thumbnail mode|'slider', 'grid'|`false`|slider|
|showDots|Display dots or not|`Boolean`|`false`|true|
|campaigns|To show campaign badge on image|`Array` /  `Boolean`|`false`|false|
|mainImageSizes|Sizes attribute for main image|`String`|`false`|(min-width: 1360px) 510px, (min-width: 1024px) 38vw, (min-width: 768px) 51vw, 70vw|
|thumbnailSizes|Sizes attribute for thumbnail image|`String`|`false`|(min-width: 1360px) 255px, (min-width: 1024px) 19vw, (min-width: 768px) 25.5vw, 35vw|

<!-- @vuese:CaProductGallery:props:end -->


## Events

<!-- @vuese:CaProductGallery:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|close-modal|-|-|

<!-- @vuese:CaProductGallery:events:end -->


## Methods

<!-- @vuese:CaProductGallery:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|slideToIndex|Slide to specific image|index (Number)|

<!-- @vuese:CaProductGallery:methods:end -->


