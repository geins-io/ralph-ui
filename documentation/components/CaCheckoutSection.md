# CaCheckoutSection

Used to wrap a section on the checkout page. Used for both the cart and the different steps of the checkout<br><br> **SASS-path:** _./styles/components/atoms/ca-checkout-section.scss_

## Props

<!-- @vuese:CaCheckoutSection:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|bottomArrow|Shows an arrow at the bottom of the box|`Boolean`|`false`|true|
|loading|Is the section loading?|`Boolean`|`false`|false|
|blocked|Block this section|`Boolean`|`false`|false|

<!-- @vuese:CaCheckoutSection:props:end -->


## Slots

<!-- @vuese:CaCheckoutSection:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|title|The checkout sections title|-|
|default|Content of the section|-|
|guard|The checkout sections guard text, shown when blocked|-|

<!-- @vuese:CaCheckoutSection:slots:end -->


