# CaWidgetBanner

The banner widget, displaying an image with text and button<br><br> **SASS-path:** _./styles/components/molecules/ca-widget-banner.scss_

## Methods

<!-- @vuese:CaWidgetBanner:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onPlaying|Action for when video is playing|-|
|onReady|Action for when the vimeo player is mounted inside the iframe|-|
|onMessageReceived|Handle messages sent from the Vimeo iframe|event|
|postMessage|Post messages to the Vimeo iframe, mainly to register event listeners inside|action (String), value (String)|
|clickHandler|Pushing the widget:click event|-|

<!-- @vuese:CaWidgetBanner:methods:end -->


## MixIns

<!-- @vuese:CaWidgetBanner:mixIns:start -->
|MixIn|
|---|
|MixWidgetImage|

<!-- @vuese:CaWidgetBanner:mixIns:end -->


