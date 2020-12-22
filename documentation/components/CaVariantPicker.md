# CaVariantPicker

The shell for all variant pickers. displays the title above and the picker chosen by type below<br><br> **SASS-path:** _./styles/components/molecules/ca-variant-picker.scss_

## Props

<!-- @vuese:CaVariantPicker:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|variants|A list of variants (VariantType from the API)|`Array`|`true`|-|
|variantsData|Variants picker data. A object consisting of variantDimensions, chosenSku and hasMultipleDimensions passed from MixVariantHandler|`Object`|`true`|-|
|title|The title for the picker|`String`|`true`|-|
|type|The type of picker to use. Accepts `color`, `display` and `panel`|`color`, `display`, `panel`|`false`|`panel`|

<!-- @vuese:CaVariantPicker:props:end -->


## Events

<!-- @vuese:CaVariantPicker:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|replaceProduct|-|-|
|changeSku|-|-|

<!-- @vuese:CaVariantPicker:events:end -->


## Slots

<!-- @vuese:CaVariantPicker:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|title|-|-|

<!-- @vuese:CaVariantPicker:slots:end -->


