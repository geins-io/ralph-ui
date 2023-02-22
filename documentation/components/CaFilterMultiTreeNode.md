# CaFilterMultiTreeNode

Tree node child component for the Multi Choise Tree view component<br><br> **SASS-path:** _./styles/components/atoms/ca-filter-multi-tree-node.scss_

## Props

<!-- @vuese:CaFilterMultiTreeNode:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|Gets the updated selectable values with children|`Object`|`false`|-|
|propagateData|Propagates the data to the parent|`Function`|`false`|() => ({})|

<!-- @vuese:CaFilterMultiTreeNode:props:end -->


## Methods

<!-- @vuese:CaFilterMultiTreeNode:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|selectedChildren|Converts the object to a string and searches if any child is selected to toggle parent and children|value (Object)|
|toggle|Toggle the selected accordion by id|id (String)|

<!-- @vuese:CaFilterMultiTreeNode:methods:end -->


