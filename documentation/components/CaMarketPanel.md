# CaMarketPanel

A panel for selecting markets<br><br> **SASS-path:** _./styles/components/organisms/ca-market-panel.scss_

## Props

<!-- @vuese:CaMarketPanel:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|mode|Display mode for country selector. Advanced mode groups markets by groupKey and shows languages per market|`simple` or `advanced`|`false`|simple|

<!-- @vuese:CaMarketPanel:props:end -->


## Methods

<!-- @vuese:CaMarketPanel:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getCodeFromId|Get the language code from a language id|id (String)|

<!-- @vuese:CaMarketPanel:methods:end -->


## Computed

<!-- @vuese:CaMarketPanel:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|selectableMarkets|`{Array}`|List of selectable markets|No|
|marketsByGroupKey|`{Object}`|Markets grouped by groupKey|No|

<!-- @vuese:CaMarketPanel:computed:end -->


