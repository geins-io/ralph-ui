# CaTabs

Toggle content panel by tabs<br><br> **SASS-path:** _./styles/components/molecules/ca-tabs.scss_

## Props

<!-- @vuese:CaTabs:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|tabs|Labels to build tabs|`Array`|`true`|-|
|selectedTab|Selected tab by index|`Number`|`false`|0|

<!-- @vuese:CaTabs:props:end -->


## Events

<!-- @vuese:CaTabs:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|clicked|-|-|

<!-- @vuese:CaTabs:events:end -->


## Slots

<!-- @vuese:CaTabs:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|panels|-|-|

<!-- @vuese:CaTabs:slots:end -->


## Methods

<!-- @vuese:CaTabs:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|tabId|Id for tab TODO: Make unique. Will currently get duplicated if several instances of component|index (Number)|
|panelId|panel-id for accessibility TODO: Make unique. Will currently get duplicated if several instances of component|index (Number)|
|isSelected|If current tab is selected|index (Number)|
|setTabIndex|Tab index for keyboard navigation|index (Number)|
|setAriaSelected|aria-selected for accessibility Return as expected String making sure not to remove the attr|index (Number)|

<!-- @vuese:CaTabs:methods:end -->


## Computed

<!-- @vuese:CaTabs:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|selected|`Number`|Case selected tab index is above panel count - fallback 0|No|

<!-- @vuese:CaTabs:computed:end -->


