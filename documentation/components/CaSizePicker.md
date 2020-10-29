# CaSizePicker

Used to pick a size variant of a product<br><br> **SASS-path:** _./styles/components/atoms/ca-size-picker.scss_

## Props

<!-- @vuese:CaSizePicker:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|sizes|An array of the available sizes|`Array`|`true`|-|
|chosenSku|The chosenSku object|`Object`|`true`|-|

<!-- @vuese:CaSizePicker:props:end -->


## Events

<!-- @vuese:CaSizePicker:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|reset|The chosen size no longer has a stock quantity, chosenSku needs a reset|-|
|changed|Size has been changed, update chosenSku|{id, value} (Object)|

<!-- @vuese:CaSizePicker:events:end -->


