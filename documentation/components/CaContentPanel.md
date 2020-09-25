# CaContentPanel

A content panel to display content off canvas, for example the cart, the mobile navigation or a country picker

## Props

<!-- @vuese:CaContentPanel:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|name|The name id of the content panel. Used in trigger call to open panel|`String`|`true`|-|
|title|Title to be displayed in the header of the content panel|''|`false`|-|
|enterFromMobile|Direction from which to enter from on smaller screens|'bottom', 'left', 'right'|`false`|bottom|
|enterFromDesktop|Direction from which to enter from on larger screens|'right', 'left'|`false`|right|
|onlyDesktop|True if panel should only exist on bigger screens|`Boolean`|`false`|`false`|
|onlyMobile|True if panel should only exist on smaller screens|`Boolean`|`false`|`false`|

<!-- @vuese:CaContentPanel:props:end -->


## Slots

<!-- @vuese:CaContentPanel:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|header|The content panel header|`<span class="ca-content-panel__title">{{ title }}</span>`|
|default|The main content of the content panel. This content will be scrollable when overflowing|-|
|footer|The content panel footer|`<button class="ca-content-panel__close-button" @click="close"><CaIconAndText icon-name="x">{{ $t('CLOSE') }}</CaIconAndText></button>`|

<!-- @vuese:CaContentPanel:slots:end -->

