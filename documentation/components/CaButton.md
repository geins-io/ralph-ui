# CaButton

A button for click events or links<br><br> **SASS-path:** _./styles/components/atoms/ca-button.scss_

## Props

<!-- @vuese:CaButton:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|href|Set this if you want to use button as a link. If set to internal link NuxtLink will be used for routing. Using localePath (nuxt-i18n) to return localized URL|`String`|`false`|''|
|disabled|Use to disable button|`Boolean`|`false`|`false`|
|size|The size of the button|'s', 'm', 'l'|`false`|m|
|type|Type of button|'default', 'full-width'|`false`|default|
|color|Color of button|'primary', 'secondary'|`false`|primary|
|loading|Set button in loading state|`Boolean`|`false`|false|
|noFunction|Set to true to use button style without it being an actual button|`Boolean`|`false`|false|

<!-- @vuese:CaButton:props:end -->


## Events

<!-- @vuese:CaButton:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|clicked|-|-|

<!-- @vuese:CaButton:events:end -->


## Slots

<!-- @vuese:CaButton:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|Button text / content|-|

<!-- @vuese:CaButton:slots:end -->


## MixIns

<!-- @vuese:CaButton:mixIns:start -->
|MixIn|
|---|
|MixLinkHandler|

<!-- @vuese:CaButton:mixIns:end -->


