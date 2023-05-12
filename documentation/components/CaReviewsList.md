# CaReviewsList

Component to display paginated reviews (comments) for specific product<br><br> **SASS-path:** _./styles/components/molecules/ca-reviews-list.scss_

## Props

<!-- @vuese:CaReviewsList:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|productAlias|the review is assigned based on the product alias|`String`|`true`|-|

<!-- @vuese:CaReviewsList:props:end -->


## Methods

<!-- @vuese:CaReviewsList:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|goToReviewsPage|change page to display the other reviews|page (Number)|

<!-- @vuese:CaReviewsList:methods:end -->


## Computed

<!-- @vuese:CaReviewsList:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|pages|`Number`|total amount of available pages of products (page size indicated by var 'REVIEWS_PER_PAGE')|No|
|skipElements|`Number`|number of elements to skip (number of elements to cut from total list to display elements for current page)|No|
|canShowMainStarRate|`Boolean`|indicates if total product review count should be displayed|No|

<!-- @vuese:CaReviewsList:computed:end -->


