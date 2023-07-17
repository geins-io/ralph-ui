# CaReadMore

Used to hide part of text and display a "read more"-toggle<br><br> **SASS-path:** _./styles/components/molecules/ca-read-more.scss_

## Props

<!-- @vuese:CaReadMore:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|maxHeight|Maximum height of text to show before 'read more'-function to kick in|`Number`|`false`|60|
|iconNameOpen|Icon name for open state|`String`|`false`|chevron-up|
|iconNameClosed|Icon name for closed state|`String`|`false`|chevron-down|

<!-- @vuese:CaReadMore:props:end -->


## Slots

<!-- @vuese:CaReadMore:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|Text content|-|

<!-- @vuese:CaReadMore:slots:end -->


## Methods

<!-- @vuese:CaReadMore:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setHeights|Set heights|-|
|toggleText|Toggle read more/read less|-|

<!-- @vuese:CaReadMore:methods:end -->


