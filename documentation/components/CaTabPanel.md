# CaTabPanel

Display content by tab panel<br><br> **SASS-path:** _./styles/components/atoms/ca-tab-content.scss_

## Props

<!-- @vuese:CaTabPanel:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|index|Index of panel|`Number`|`true`|-|
|panelCount|Total amount of panels|`Number`|`true`|-|
|selectedTab|Selected panel by index|`Number`|`false`|0|

<!-- @vuese:CaTabPanel:props:end -->


## Slots

<!-- @vuese:CaTabPanel:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:CaTabPanel:slots:end -->


## Computed

<!-- @vuese:CaTabPanel:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|panelId|`String`|panel-id for accessibility TODO: id needs to be unique. Will currently duplicate if several instances|No|
|selected|`Number`|Case selected tab index is above panel count - fallback 0|No|
|isSelected|`Boolean`|If current tab is selected|No|
|setAriaSelected|`String`|aria-selected for accessibility|No|

<!-- @vuese:CaTabPanel:computed:end -->


