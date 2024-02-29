# MixFavoritesPage

All functionality for the favorites page<br><br> **Data:**<br> products: `null`<br> allProducts: `[]`<br>

## Methods

<!-- @vuese:MixFavoritesPage:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|processProducts|Remove discontinued products from favorites and sort them in the order they where added|products (Array)|

<!-- @vuese:MixFavoritesPage:methods:end -->


## Computed

<!-- @vuese:MixFavoritesPage:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|isAliases|`Boolean`|Are favorites saved as aliases?|No|
|filter|`Object`|Filter object for products query|No|

<!-- @vuese:MixFavoritesPage:computed:end -->


## MixIns

<!-- @vuese:MixFavoritesPage:mixIns:start -->
|MixIn|
|---|
|MixFetch|

<!-- @vuese:MixFavoritesPage:mixIns:end -->


