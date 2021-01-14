# CaContentPanel

A content panel to display content off canvas, for example the cart, the mobile navigation or a country picker<br> Triggered like so: `$store.commit('contentpanel/open', {name: String, frame: String (optional)});`<br><br> **SASS-path:** _./styles/components/molecules/ca-content-panel.scss_

## Props

<!-- @vuese:CaContentPanel:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|name|The name id of the content panel. Used in trigger call to open panel|`String`|`true`|-|
|title|Title to be displayed in the header of the content panel|''|`false`|-|
|enterFrom|Direction from which to enter from on smaller screens (< 768)|'bottom', 'left', 'right'|`false`|right|
|enterFromTabletUp|Direction from which to enter from on larger screens (>= 768). Defaults to `enterFrom` if not set|'right', 'left'|`false`|-|

<!-- @vuese:CaContentPanel:props:end -->


## Slots

<!-- @vuese:CaContentPanel:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|header|The content panel header|`<h1 class="ca-content-panel__title">{{ title }}</h1>`|
|default|The main content of the content panel. This content will be scrollable when overflowing|-|
|footer|The content panel footer|`<button class="ca-content-panel__close-button" @click="close"><CaIconAndText icon-name="x">{{ $t('CLOSE') }}</CaIconAndText></button>`|

<!-- @vuese:CaContentPanel:slots:end -->


