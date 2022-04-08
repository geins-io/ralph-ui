# CaInputSelect

A select input that works with v-model and has a native behavior on mobile devices<br><br> **SASS-path:** _./styles/components/atoms/ca-input-select.scss_

## Props

<!-- @vuese:CaInputSelect:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|options|Should be an array of objects containing 'label' and 'value' for every option|`Array`|`true`|-|
|label|The from element label|`String`|`false`|''|
|value|Use v-model to bind value|`String` /  `Number`|`true`|-|
|placeholder|Placeholder if no option is chosen|`String`|`false`|''|
|description|Add a description under the select|`String`|`false`|''|
|required|Is it required|`Boolean`|`false`|`true`|
|disabled|Used to disable the input|`Boolean`|`false`|`false`|

<!-- @vuese:CaInputSelect:props:end -->


## Events

<!-- @vuese:CaInputSelect:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|Triggered by user input change|The newly selected value (String, Number)|
|opened|-|-|

<!-- @vuese:CaInputSelect:events:end -->


## Methods

<!-- @vuese:CaInputSelect:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setInitialValue|Used to set initial value when mounted|-|
|selectOption|This is run to select an option|new value (String, Number) and label (String - optional)|
|toggleOptions|Opening and closing the dropdown|-|
|close|Closing the dropdown|-|
|getLabel|Get the label for a specific value in the list of options|value (String, Number)|

<!-- @vuese:CaInputSelect:methods:end -->


