# CaStarRating

Star rating component. This component can be used either to display rate (in read-only mode) or let user to rate using stars from 1-5. Half-star rates only visible for read-only mode - as te summary of rates shows average value. <br><br> **SASS-path:** _./styles/components/atoms/ca-star-rating.scss_

## Props

<!-- @vuese:CaStarRating:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|defaultRate|default rate - stars will be displayed based on this value on read only mode|`Number`|`false`|null|
|readOnly|indicator for read only mode - disable/enable preview mode for stars on hover and submitting a rate|`Boolean`|`false`|true|
|showCounter|indicator to show/hide numerical rate representation|`Boolean`|`false`|true|

<!-- @vuese:CaStarRating:props:end -->


## Events

<!-- @vuese:CaStarRating:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|getProductStarRate|-|-|

<!-- @vuese:CaStarRating:events:end -->


## Methods

<!-- @vuese:CaStarRating:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|resetPreview|Reset preview number value - show already chosen rate or show default state (no rate)|-|
|previewStars|Reset preview number value - trigger visible preview on stars (here used on hover to show preview rate on stars)|star (Number) - number of stars (rate) which is currently previewed (hover over)|
|saveRate|(Vote) method to confirm the rate|rate (Number) - picked rate by the user (turned off by read-only mode). Indicates how many stars user picked.|

<!-- @vuese:CaStarRating:methods:end -->


## Computed

<!-- @vuese:CaStarRating:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|currentRate|`Number`|indicates current rate (number of picked or hovered stars)|No|

<!-- @vuese:CaStarRating:computed:end -->


