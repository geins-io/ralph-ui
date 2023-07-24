# CaFeedback

An inline feedback box<br><br> **SASS-path:** _./styles/components/atoms/ca-feedback.scss_

## Props

<!-- @vuese:CaFeedback:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|Type of feedback|`info`, `success`, `error`|`false`|info|
|message|The feedback message to be displayed|`String`|`false`|-|
|constant|Set to true if the feedback message should be visible at all time|`Boolean`|`false`|false|

<!-- @vuese:CaFeedback:props:end -->


## Slots

<!-- @vuese:CaFeedback:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:CaFeedback:slots:end -->


## Methods

<!-- @vuese:CaFeedback:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|show|Show the feedback|-|
|hide|Hide the feedback|-|

<!-- @vuese:CaFeedback:methods:end -->


## Computed

<!-- @vuese:CaFeedback:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|icon|`String`|The icon to be used|No|
|typeClass|`String`|The type modifier class|No|

<!-- @vuese:CaFeedback:computed:end -->


