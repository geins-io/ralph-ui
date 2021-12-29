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
