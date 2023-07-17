# CaVariantPicker

The shell for all variant pickers. displays the title above and the picker chosen by type below<br><br> **SASS-path:** _./styles/components/molecules/ca-variant-picker.scss_

## Props

<!-- @vuese:CaVariantPicker:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|variants|A list of variants (VariantType from the API)|`Array`|`true`|-|
|variantsData|Variants picker data. A object consisting of variantDimensions, chosenSku and hasMultipleDimensions passed from MixVariantHandler|`Object`|`true`|-|
|title|The title for the picker|`String`|`false`|-|
|productId|The product id, must be provided if multiple variants with same value exists, to show correct chosen-state|`Number`|`false`|0|
|type|The type of picker to use. Accepts `color`, `display`, `panel` & `image`|`color`, `display`, `panel`, `image`|`false`|`panel`|
|panelRenderMode|Use if using type panel and the panel needs to be separated from button in layout)|`both`, `only-panel`, `only-button`|`false`|both|

<!-- @vuese:CaVariantPicker:props:end -->


## Events

<!-- @vuese:CaVariantPicker:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|replaceProduct|-|-|
|changeSku|-|-|
|notify|-|-|

<!-- @vuese:CaVariantPicker:events:end -->


## Slots

<!-- @vuese:CaVariantPicker:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|title|-|-|

<!-- @vuese:CaVariantPicker:slots:end -->


