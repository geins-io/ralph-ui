# MixBrandsPage.js

The full functionality for the brands page **Data:**<br> brands: `[]`<br> isLoading: `true`<br> brandsTree: `[]`<br> isGroupFilter: `false`<br> activeGroupFilter: `''`<br>

## Methods

<!-- @vuese:MixBrandsPage.js:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|updateBrandsFromFacets|Updates the brands from the facets|facets (Object)|
|getAllBrandsByInitial|Returns all brands by initial character|character (String)|
|createBrandsTree|Creates the brands tree|-|
|setGroupFilter|Sets the group filter|group (String)|

<!-- @vuese:MixBrandsPage.js:methods:end -->


## Computed

<!-- @vuese:MixBrandsPage.js:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|sortedBrands|`Array`|Returns the brands sorted by alias|No|
|getOneBrandPerCharacter|`Array`|Returns one bradn per character|No|
|getAllInitialCharacters|`Array`|Returns all initial characters|No|

<!-- @vuese:MixBrandsPage.js:computed:end -->


## MixIns

<!-- @vuese:MixBrandsPage.js:mixIns:start -->
|MixIn|
|---|
|MixFetch|

<!-- @vuese:MixBrandsPage.js:mixIns:end -->


