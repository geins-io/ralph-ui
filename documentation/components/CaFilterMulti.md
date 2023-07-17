# CaFilterMulti

Multi choice filter<br><br> **SASS-path:** _./styles/components/molecules/ca-filter-multi.scss_

## Props

<!-- @vuese:CaFilterMulti:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|values|The selectable values|`Array`|`true`|-|
|selection|The current selection|`Array`|`true`|-|
|hideValues|Option to hide values|`Boolean`|`false`|true|

<!-- @vuese:CaFilterMulti:props:end -->


## Events

<!-- @vuese:CaFilterMulti:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|selectionchange|The selection has changed|Updated selection (Array)|

<!-- @vuese:CaFilterMulti:events:end -->


## Methods

<!-- @vuese:CaFilterMulti:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|sortByOrder|Orders the data by its order prop|data (Array)|
|toggleFilterValue|Toggle the value of a filter and emit the updated selection|filter (Object) and selected (Boolean)|

<!-- @vuese:CaFilterMulti:methods:end -->


