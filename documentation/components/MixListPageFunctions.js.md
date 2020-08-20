# MixListPageFunctions.js

All functionality for the list page<br><br> **Data:**<br> productList: `[]`<br> totalCount: `0`<br> skip: `0`<br> take: `15`<br> pageSize: `15`<br> sort: `'LATEST'`<br> defaultSort: `'LATEST'`<br> listInfo: `null`<br> filters: `{}`<br> selection: `{ categories: [], brands: [] }`<br> filterParamQuery: `{}`<br> queryPage: `1`

## Methods

<!-- @vuese:MixListPageFunctions.js:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|loadMore|Load next chunk of products|-|
|loadPrev|Load previous chunk of products|-|
|setInitPriceSelection|Set price filter selection|lowest price (Number), highest price (Number)|
|setInitPriceLowest|Set price filter selection for lowest price|price (Number)|
|setInitPriceHighest|Set price filter selection for highest price|price (Number)|
|sortChangeHandler|Update the sort setting|new value (String)|
|filterChangeHandler|Update the filter selections|new value (Object)|
|pushURLParams|Set filter selection in URL|-|
|readURLParams|Read filter selection from URL|-|

<!-- @vuese:MixListPageFunctions.js:methods:end -->

