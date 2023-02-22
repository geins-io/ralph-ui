# MixMetaReplacement

Used to replace meta placeholders with the actual value [count] = Number of products on the page (Lists) [dlong] = Long description (Products), primaryDescription (Lists) [dshort] = Short description (Products), secondaryDescription (Lists) [color] = Color (Currently not implemented) [gender] = Gender (Currently not implemented) [brand] = Brand [pid] = Product ID [cat] [category] = Main category name (Product) [price] = Product price (Product) [pmax] = Max filterable price, unformatted (List) [pmin] = Min filterable price, unformatted (List) MixMetaReplacement = Product Name (Product), Category/Brand name (Lists), Title (Content pages) [artnr] = Article number (Currently not implemented) [search] = Article number (Currently not implemented)

## Methods

<!-- @vuese:MixMetaReplacement:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|checkForGender|Check if string is included in array of genedrs|string (String)|
|unslug|Convert slug into words with capital letters|slug (String)|
|capitalize|Capitalize first letter of a string|string (String)|
|metaReplacement|Replace meta placeholders with correct values|Meta string (String)|

<!-- @vuese:MixMetaReplacement:methods:end -->


