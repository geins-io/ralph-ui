# MixVariantPicker

## Props

<!-- @vuese:MixVariantPicker:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|variants|A list of variants (VariantType from the API)|`Array`|`true`|-|
|variantsData|Variants picker data. A object consisting of variantDimensions, chosenSku and hasMultipleDimensions passed from MixVariantHandler|`Object`|`true`|-|
|title|The title for the picker|`String`|`true`|-|
|productId|The product id, must be provided if multiple variants with same value exists, to show correct chosen-state|`Number`|`false`|-|

<!-- @vuese:MixVariantPicker:props:end -->


## Events

<!-- @vuese:MixVariantPicker:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|close-content-panel|-|-|
|changeSku|Sku variant is changed|chosen sku data (Object)|
|replaceProduct|Non sku variant is changed|prod alias (String)|

<!-- @vuese:MixVariantPicker:events:end -->


## Methods

<!-- @vuese:MixVariantPicker:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getChosenValue|Get chosen value for specified level|level (Number)|
|getStock|Get stock status text for variant provided|variant (Object)|
|chooseVariant|Choose variant. Emits relpaceProduct for non sku variants and changeSku for sku variants|variant (Object)|
|getModifiers|Get modifier classes for variant choice button|variant (Object)|

<!-- @vuese:MixVariantPicker:methods:end -->


## Computed

<!-- @vuese:MixVariantPicker:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|variantTypeColor|`Boolean`|Is variants of type color?|No|
|chosenLabel|`String`|Label of the chosen variant|No|
|variantsLevel|`Number`|Level of current variants|No|
|chosenVariant|`Object`|Currently chosen variant|No|
|chosenHex|`String`|Currently chosen hex attribute if available|No|
|chosenSku|`Object`|Chosen sku object|No|

<!-- @vuese:MixVariantPicker:computed:end -->


## MixIns

<!-- @vuese:MixVariantPicker:mixIns:start -->
|MixIn|
|---|
|MixStockHandler|

<!-- @vuese:MixVariantPicker:mixIns:end -->


