# CaReviewForm

Form component to add review (comment) <br><br> **SASS-path:** _./styles/components/molecules/ca-review-form.scss_

## Props

<!-- @vuese:CaReviewForm:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|productAlias|-|`String`|`false`|-|
|productStarRating|-|`Number`|`false`|null|

<!-- @vuese:CaReviewForm:props:end -->


## Methods

<!-- @vuese:CaReviewForm:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|openLoginPanel|Used to open login panel|-|
|confirmReviewForm|Validate inputs and submit form or show general error message|-|
|addReviewAPICall|API call with handling error or success|-|
|checkValid|Used to hide feedback if field becomes valid after error|valid (Boolean)|
|showErrorFeedback|Show generic error|-|
|setRate|set emitted rate from child component|rate (Number)|

<!-- @vuese:CaReviewForm:methods:end -->


## Computed

<!-- @vuese:CaReviewForm:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|shouldValidateCommentInput|-|indicate if stars should be validated depending on config value|No|

<!-- @vuese:CaReviewForm:computed:end -->


## MixIns

<!-- @vuese:CaReviewForm:mixIns:start -->
|MixIn|
|---|
|MixFetch|

<!-- @vuese:CaReviewForm:mixIns:end -->


