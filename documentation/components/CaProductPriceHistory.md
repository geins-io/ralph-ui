# CaProductPriceHistory

A component that displays price history of product. <br><br> **SASS-path:** _./styles/components/atoms/ca-product-price-history.scss_

## Props

<!-- @vuese:CaProductPriceHistory:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|locale|locale used for date, like so: 'sv' or 'sv-SE'. Defaults to $i18n.defaultLocale if not set|`String`|`false`|-|
|showFullMonth|Set to true to display full month like so: 'december'. Defaults to short like so: 'dec'|`Boolean`|`false`|false|
|simple|Set to true to display only one line with lowest price.|`Boolean`|`false`|false|

<!-- @vuese:CaProductPriceHistory:props:end -->


## MixIns

<!-- @vuese:CaProductPriceHistory:mixIns:start -->
|MixIn|
|---|
|MixApolloRefetch|

<!-- @vuese:CaProductPriceHistory:mixIns:end -->


