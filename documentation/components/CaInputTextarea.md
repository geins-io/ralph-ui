# CaInputTextarea

Text field, use v-model to bind value<br><br> **SASS-path:** _./styles/components/atoms/ca-input-textarea.scss_

## Props

<!-- @vuese:CaInputTextarea:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|label|The label of the field, showed as "placeholder" when field empty or not in focus|`String`|`false`|-|
|placeholder|The field placeholder, can be used if not using label|`String`|`false`|-|
|value|The value of the field, use v-model to bind data|`String` /  `Number`|`true`|-|
|description|A description text for the field|`String`|`false`|-|
|required|Is the field requierd?|`Boolean`|`false`|true|
|disabled|Is the field disabled?|`Boolean`|`false`|false|
|id|Id of field, also used as name|`String`|`false`|-|
|valid|Used to handle validation outside input scope|`Boolean`|`false`|true|
|errorMessage|What error text should be displayed if field not vaild|`String`|`false`|null|
|maxlength|-|`Number`|`false`|null|

<!-- @vuese:CaInputTextarea:props:end -->


## Events

<!-- @vuese:CaInputTextarea:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|Input has been made|Field value (String/Number)|
|validation|Validation has been made|Is valid (Boolean)|

<!-- @vuese:CaInputTextarea:events:end -->


## Methods

<!-- @vuese:CaInputTextarea:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|validateInput|Validate input, sets `fieldValid` and returns bool|-|
|validateIfError|Validates field instantly if not valid, used on keyup|-|
|blurHandler|Controls what happens on field blur|-|

<!-- @vuese:CaInputTextarea:methods:end -->


## Computed

<!-- @vuese:CaInputTextarea:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|modifiers|`Object`|All the modifier classes|No|
|allValid|`Boolean`|Is field valid?|No|
|inputListeners|`Object`|Used to be a transparent wrapper for the text input, all events will be passed through|No|

<!-- @vuese:CaInputTextarea:computed:end -->


