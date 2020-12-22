# MixVariantHandler

Handling all product variant data. Expects product object to work with. Is using MixStockHandler<br><br> **Data:**<br> chosenSku: `{ id: null, value: '' }`<br>

## Methods

<!-- @vuese:MixVariantHandler:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setDefaultSku|Function to set default sku when no variants exists|-|
|setSku|Set chosenSku object values|id (Number), value (String)|
|resetSku|Resets chosenSku|-|
|checkForProductVariant|Looks for the product variant level until found and then returns the current Product variant|variants (Array)|
|getCurrentVariant|Get the current chosen variant for the passed in variants level|variants (Array)|

<!-- @vuese:MixVariantHandler:methods:end -->


## Computed

<!-- @vuese:MixVariantHandler:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|baseVariants|`Array`|A list of variants on the base level of variants data|No|
|hasVariants|`Boolean`|Does more than one base variant exist?|No|
|currentBaseVariant|`Object`|Current variant on the base level|No|
|baseVariantType|`String`|Type of the current base level variant|No|
|hasMultipleDimensions|`Boolean`|Does more than one dimension of variants exist on this product?|No|
|secondDimensionVariants|`Array`|List of the second dimension variants for the current variant|No|
|currentSecondDimensionVariant|`Object`|The currently chosen variant on the second dimension level|No|
|secondDimensionVariantType|`String`|The type of the current second dimension variant|No|
|currentProductVariant|`Object`|The variant object for the current product|No|
|skuVariants|`Array`|The list of sku variants for the current product|No|
|hasSkuVariants|`Boolean`|Does more than one sku variants exist for current product?|No|
|skuIsChosen|`Boolean`|Is a sku chosen?|No|
|chosenSkuVariant|`Object`|The variant object for the chosen sku|No|
|chosenSkuStock|`Number`|The stock total for the chosen sku|No|
|chosenSkuId|`Number`|Id for the chosen sku, used for watching|No|
|currentStock|`Number`|Return total stock quantity based on chosen sku variant or else product total stock. Overriding currentStock from MixStockHandler|No|
|variantPickerData|`Object`|The object of data needed by the variant pickers to work properly|No|

<!-- @vuese:MixVariantHandler:computed:end -->


## MixIns

<!-- @vuese:MixVariantHandler:mixIns:start -->
|MixIn|
|---|
|MixStockHandler|

<!-- @vuese:MixVariantHandler:mixIns:end -->


