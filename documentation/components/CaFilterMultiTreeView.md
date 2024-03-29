# CaFilterMultiTreeView

Multi choice tree view filter<br><br> **SASS-path:** _./styles/components/molecules/ca-filter-multi-tree-view.scss_

## Props

<!-- @vuese:CaFilterMultiTreeView:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|values|The selectable values|`Array`|`true`|-|
|selection|The current selection|`Array`|`true`|-|
|displayTreeView|Should it load tree view by default?|`Boolean`|`false`|`false`|
|hideValues|Option to hide values|`Boolean`|`false`|true|

<!-- @vuese:CaFilterMultiTreeView:props:end -->


## Events

<!-- @vuese:CaFilterMultiTreeView:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|selectionchange|-|-|

<!-- @vuese:CaFilterMultiTreeView:events:end -->


## Methods

<!-- @vuese:CaFilterMultiTreeView:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|sortByOrder|Orders the data by its order prop|data (Array)|
|filterProducts|Filter the prodcuts and emit the selection|children (Array), facetId (String), label (String), Selected (Boolean)|
|pushSelection|Push the selected filters|facetId (String), itemLabel (string)|
|selectChildrenCategories|Select the children when a parent is selected|array (Array)|
|removeChildrenCategories|Remove the children when a parent is deselected|array (Array)|
|removeSelection|Remove selected filters|facetId (String)|

<!-- @vuese:CaFilterMultiTreeView:methods:end -->


## Computed

<!-- @vuese:CaFilterMultiTreeView:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|valuesWithSelected|`Array`|Adds selected property to the values returned from the api|No|
|valuesWithChildren|`Array`|Adds children properties created from child categories with parentId|No|
|valuesExcludeHidden|`Array`|Returns the values without hidden values|No|
|filterValues|`Array`|Returns the values with or without hidden values|No|

<!-- @vuese:CaFilterMultiTreeView:computed:end -->


