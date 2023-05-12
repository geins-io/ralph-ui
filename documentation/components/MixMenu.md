# MixMenu

Functionality and endpoint call for menus **Data:**<br> menu: `null`<br>

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
|getParentLinkLabel|Get parent label for link|item (Object)|
|isExternal|Check if provided path is external (url) or internal|path String|
|clickHandler|Pushing the menu:click event|-|

<!-- @vuese:MixMenu:methods:end -->


## MixIns

<!-- @vuese:MixMenu:mixIns:start -->
|MixIn|
|---|
|MixApolloRefetch|

<!-- @vuese:MixMenu:mixIns:end -->


