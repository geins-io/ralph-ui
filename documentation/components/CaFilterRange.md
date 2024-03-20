# CaFilterRange

Range type filter<br><br> **SASS-path:** _./styles/components/molecules/ca-filter-range.scss_

## Props

<!-- @vuese:CaFilterRange:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|values|The filter values. Object that should hold the keys 'lowest' and 'highest'|`Object`|`true`|-|
|selection|The current selection. Object that should hold the keys 'lowest' and 'highest'|`Object`|`true`|-|

<!-- @vuese:CaFilterRange:props:end -->


## Events

<!-- @vuese:CaFilterRange:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|selectionchange|New selection is made|new value (Object)|

<!-- @vuese:CaFilterRange:events:end -->


## Methods

<!-- @vuese:CaFilterRange:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|changeHandler|Triggered when filter is changed|-|
|setCurrentSelection|Used to set local data when mounted|-|
|setValues|Used to set local data when mounted|-|

<!-- @vuese:CaFilterRange:methods:end -->


