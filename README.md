# @ralph/ralph-ui

> Component library for Carismar

## Build Setup

```bash
# install dependencies
$ npm install

# create component
$ npm run create-component

# see documentation
$ npm run documentation-serve
```

# Changelog

<!--
Sections to use

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security
-->

All notable changes will be added to this section

## [10.3.2] - 2021-03-17

### Added

- Additional functions for CaInputSelect

## [10.3.1] - 2021-03-16

### Fixed

- Viewport height fix for content panel and modal

## [10.3.0] - 2021-03-16

### Added

- CaSpecifications will now take into account whether to "Show on site" or not

### Changed

- Changed default icon for filter trigger
- Improvements of the CaInputSelect component

## [10.2.2] - 2021-03-15

### Fixed

- Replace native broadcast api to npm package. Now work in safari too

## [10.2.1] - 2021-03-15

### Fixed

- Showing customer type toggle when authenticated as preview user

## [10.2.0] - 2021-03-11

### Added

- CaQuickAddProduct and CaQuickAddProducts components
- Fetching related products for PDP

### Fixed

- Logging in on checkout page will no longer route you to "my account", but let you stay in checkout

## [10.1.0] - 2021-03-10

### Added

- Save state of sign user in local store to reduce reqeusts count
- Add hook to catch render errors on server side

### Fixed

- Add new event 'variables-change' and watcher to widgetAreaVariables to inform parent component, that need update child state
- Fix problem with baseFilters, add new request if page contain variables in query

## [10.0.5] - 2021-03-08

### Fixed

- Total price on order summary is now shown inc VAT

## [10.0.4] - 2021-03-07

### Fixed

- Dynamic parts of CaMiniCart is now client only, solving server side rendering problems after cart call was moved to nuxtServerInit
- Added missing for-loop in CaFooterNavigationAccoridon
- Null-check for placeOrder

## [10.0.3] - 2021-03-04

### Fixed

- Updated CaFilterTrigger with hidden class
- Changing payment id when payment options changes
- Longer time until ralph-user-type cookie expires

## [10.0.2] - 2021-03-03

### Fixed

- Moved setCustomerTypeCookie to store
- Changed currentUserType i account page to referance saved user

## [10.0.1] - 2021-03-03

### Fixed

- Fixed broken variant picker

## [10.0.0] - 2021-03-03

This update requires a few updates of your storefront repo to work properly. You can use the update of the Ralph repo to 10.0.0 as a reference/merge it into your storefront.

### Added

- Customer types toggle
- Customer type handling for user
- Price inc/ex VAT handling
- Customer type filter for widget areas

### Changed

- Combined API calls for PLP
- Combined API calls for PDP
- Updated cart handling including broadcast between tabs

## [9.2.0] - 2021-02-17

### Added

- Dynamic navigation components for top bar, footer, header and panel
- Mixin for menus

### Changed

- Moved categories endpoint call to MixGlobalInit. Recommended to remove it from CaHeader with this update

### Deprecated

- CaNavigationSlim is replaced by CaPanelNavigation and can be removed when all customers are using the new menu system

## [9.1.4] - 2021-02-02

### Fixed

- Order ID fallback for purchase data layer

## [9.1.3] - 2021-02-02

### Fixed

- Fixes for documentation

## [9.1.2] - 2021-01-28

### Fixed

- Bugfix for data layer

## [9.1.1] - 2021-01-28

### Fixed

- Corrected the data layer variables to match the google analytics API

## [9.0.1] - 2021-01-12

### Fixed

- Null check for products in search

## [9.0.0] - 2021-12-29

### Added

- Added config for default shipping id in checkout

## [8.1.1] - 2021-12-28

### Changed

- Widget areas are now using alias-based filters. This makes it possible to show the widget areas before listInfo has been fetched

### Removed

- Removed categoryId and brandId from product page graphql query, since they wont be needed anymore

## [8.0.1] - 2021-12-22

### Fixed

- "Estimated shipping fee"-text will now be shown even for customers without a free shipping limit

## [8.0.0] - 2021-12-20

### IMPORTANT

- Update your storefront by merging/cherry-picking from Ralph Storefront's update to 8.0.0
- Sync with API release of "getCheckout"-change

### Added

- CaCheckoutExternal - copy of CaCheckoutKlarna that handles both Klarna and SVEA
- Debug-function for checkout

### Removed

- CaCheckoutKlarna, since all this functionality now exists in CaCheckoutExternal

### Changed

- Updated graphql-query getCheckout to include paymentType as a parameter

### Fixed

- Payment options will no longer have a delay before it looks selected after selecting it

## [7.4.3] - 2021-12-10

### Added

- Pagination in product list widget

### Fixed

- Showing "estimated shipping fee"-text even if customer has no amount limit for free shipping

## [7.3.3] - 2021-12-10

### Fixed

- Nullchecks for cart.data

## [7.3.2] - 2021-12-07

### Fixed

- Fixed the case for the GTM event name sent on purchase

## [7.3.1] - 2021-12-06

### Changed

- Parameters with the same name/label will now be grouped in CaSpecifications

## [7.2.1] - 2021-12-03

### Added

- Mixin for promise queue
- Debouncer function for createOrUpdateCheckout
- Debouncer function for product quantity changer
- Changelog introduced!

### Changed

- Enqueuing of mutation createOrUpdateCheckout
- Enqueuing of mutation updateCart

### Fixed

- Checkout will not break if you enter without cartId
- Checkout will update on every UDC/nShift update (fixes bug for not saving pickupPoint)
