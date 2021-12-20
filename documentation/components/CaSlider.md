# CaSlider

A slider used for product sliding or image gallery<br><br> **SASS-path:** _./styles/components/molecules/ca-slider.scss_

## Props

<!-- @vuese:CaSlider:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|centered|Should the slider be centered?|`Boolean`|`false`|false|
|infinite|Should the slider have infinite sliding?|`Boolean`|`false`|true|
|nrOfSlides|Number of slides|`Number`|`true`|-|
|dots|Should dots be displayed|`Boolean`|`false`|false|
|arrows|Should arrows be displayed|`Boolean`|`false`|false|
|arrowIconName|First part of icon name for the arrows. Will add '-left', '-right', '-up' or '-down' as fitting|`String`|`false`|chevron|
|slidesToScroll|Number of slides to scroll|`Number`|`false`|1|

<!-- @vuese:CaSlider:props:end -->


## Events

<!-- @vuese:CaSlider:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|slideChange|-|-|

<!-- @vuese:CaSlider:events:end -->


## Slots

<!-- @vuese:CaSlider:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|slides|-|-|

<!-- @vuese:CaSlider:slots:end -->


## Methods

<!-- @vuese:CaSlider:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|shiftSlide|Used to shift slide. Use a negative or positive number for back or forth|slide change (Number), sliding transition (Boolean)|
|goToSlide|Go to specific slide|slide index (Number), sliding transition (Boolean)|
|setCurrentSlide|Used by shiftSlide and goToSlide to set a new value to currentSlide. Adjusts value to not show empty space when not infinite|slide (Number)|
|resetIndex|Used to reset the index when infinite sliding is used, when going from last to first again|-|
|nextSlide|Navigate to next slide|-|
|prevSlide|Navigate to previous slide|-|
|gestureStart|Handles the start of a touch or point and drag event|-|
|gestureMove|Handles moving of a touch or point and drag event|-|
|gestureEnd|Handles the end of a touch or point and drag event. Calls shiftSlide with corresponding value of the gesture|-|

<!-- @vuese:CaSlider:methods:end -->


