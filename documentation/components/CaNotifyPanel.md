# CaNotifyPanel

A panel where you can submit your email to get a back in stock alert for the product.<br><br> **SASS-path:** _./styles/components/molecules/ca-notify-panel.scss_

## Props

<!-- @vuese:CaNotifyPanel:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|product|The current product|`Object`|`true`|-|
|variant|The chosen sku variant to monitor|`Object`|`true`|-|

<!-- @vuese:CaNotifyPanel:props:end -->


## Methods

<!-- @vuese:CaNotifyPanel:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|subscribe|Triggers mutation in API to sign up for back in stock alerts|-|
|showFeedback|Show feedback|Feedback (Object)|
|validate|Show feedback|Feedback (Object)|

<!-- @vuese:CaNotifyPanel:methods:end -->


