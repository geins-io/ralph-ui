# CaFavoritesPage

All functionality for the favorites page<br><br> **Data:**<br> allProducts: `[]`<br>

## Methods

<!-- @vuese:CaFavoritesPage:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|processProducts|Remove discontinued products from favorites and sort them in the order they where added|products (Array)|

<!-- @vuese:CaFavoritesPage:methods:end -->


## Computed

<!-- @vuese:CaFavoritesPage:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|isAliases|`Boolean`|Are favorites saved as aliases?|No|
|filter|`Object`|Filter object for products query|No|

<!-- @vuese:CaFavoritesPage:computed:end -->


## MixIns

<!-- @vuese:CaFavoritesPage:mixIns:start -->
|MixIn|
|---|
|MixApolloRefetch|

<!-- @vuese:CaFavoritesPage:mixIns:end -->


