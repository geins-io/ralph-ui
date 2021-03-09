# CaInputText

Text field, use v-model to bind value<br><br> **SASS-path:** _./styles/components/atoms/ca-input-text.scss_

## Props

<!-- @vuese:CaInputText:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|label|The label of the field, showed as "placeholder" when field empty or not in focus|`String`|`false`|-|
|placeholder|The field placeholder, can be used if not using label|`String`|`false`|-|
|value|The value of the field, use v-model to bind data|`String` /  `Number`|`true`|-|
|description|A description text for the field|`String`|`false`|-|
|required|Is the field requierd?|`Boolean`|`false`|true|
|disabled|Is the field disabled?|`Boolean`|`false`|false|
|autocomplete|The autocomplete attribute|`String`|`false`|null|
|loading|Show a loading spinner in the field|`Boolean`|`false`|false|
|type|Type of field|`String`|`false`|text|
|id|Id of field, also used as name|`String`|`false`|-|
|valid|Used to handle validation outside input scope|`Boolean`|`false`|true|
|errorMessage|What error text should be displayed if field not vaild|`String`|`false`|null|
|validate|Set to use built in validation|`email`, `passwordStrength`, `passwordMatch`, `empty`|`false`|-|
|passwordToMatch|The password to match if using the `passwordMatch` validation|`String`|`false`|-|

<!-- @vuese:CaInputText:props:end -->


## Events

<!-- @vuese:CaInputText:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|Input has been made|Field value (String/Number)|
|validation|Validation has been made|Is valid (Boolean)|

<!-- @vuese:CaInputText:events:end -->


## Methods

<!-- @vuese:CaInputText:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|validateInput|Validate input, sets `fieldValid` and returns bool|-|
|validateEmail|Used by `validateInput` to validate email address|email (String)|
|validateIfError|Validates field instantly if not valid, used on keyup|-|
|blurHandler|Controls what happens on field blur|-|
|togglePasswordVisible|Toggle field type for password|-|

<!-- @vuese:CaInputText:methods:end -->


## Computed

<!-- @vuese:CaInputText:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|modifiers|`Object`|All the modifier classes|No|
|allValid|`Boolean`|Is field valid?|No|
|inputListeners|`Object`|Used to be a transparent wrapper for the text input, all events will be passed through|No|
|inputType|`String`|Returns field type, used for toggeling password field|No|
|passwordToggleText|`String`|Returns text for password field toggle|No|

<!-- @vuese:CaInputText:computed:end -->


