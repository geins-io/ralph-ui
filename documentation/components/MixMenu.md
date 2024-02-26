# MixMenu

Functionality and endpoint call for menus<br><br> **Data:**<br> menu: `null`<br> defaultElementTag: `'span'`<br>

## Props

<!-- @vuese:MixMenu:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|menuLocationId|The location id for the menu|`String`|`false`|-|
|onlyClientSide|If true, the menu will be fetched only on client side|`Boolean`|`false`|-|

<!-- @vuese:MixMenu:props:end -->


## Methods

<!-- @vuese:MixMenu:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getAttributes|Get attributes for link|item (Object)|
|getBaseElem|Get base element for link|item (Object)|
|processedUrl|Convert to valid url - encodeURI|item String|
|getLabel|Get label for for link|item (Object)|
|getItemsWithLabel|Get items that have a label|items (Array)|
|getParentLinkLabel|Get parent label for link|item (Object)|
|isExternal|Check if provided path is external (url) or internal|path String|
|clickHandler|Pushing the menu:click event|-|

<!-- @vuese:MixMenu:methods:end -->


## Computed

<!-- @vuese:MixMenu:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|variables|`Object`|Variables for the menu query|No|

<!-- @vuese:MixMenu:computed:end -->


## MixIns

<!-- @vuese:MixMenu:mixIns:start -->
|MixIn|
|---|
|MixFetch|

<!-- @vuese:MixMenu:mixIns:end -->


