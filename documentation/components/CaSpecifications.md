# CaSpecifications

This is used to display product specifications in a table like format<br><br> **SASS-path:** _./styles/components/atoms/ca-specifications.scss_

## Props

<!-- @vuese:CaSpecifications:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|specificationGroups|Array of parameter groups|`Array`|`true`|-|
|groupNameTagName|Tag name for group name|`String`|`false`|h3|

<!-- @vuese:CaSpecifications:props:end -->


## Methods

<!-- @vuese:CaSpecifications:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getGroupedParameters|Grouping parameteters with the same name and turns the combined values into one comma separated value|parameters (Array)|

<!-- @vuese:CaSpecifications:methods:end -->


## Computed

<!-- @vuese:CaSpecifications:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|groups|-|The specification groups but with empty groups removed|No|

<!-- @vuese:CaSpecifications:computed:end -->


