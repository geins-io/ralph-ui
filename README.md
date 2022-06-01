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

## [12.0.4] - 2022-05-24

### Fix

- Fix channelId dublication error

## [12.0.3] - 2022-05-20

### Fix

- Fix empty cart checkout

## [12.0.2] - 2022-05-19

### Fix

- Channelid dublicate fix

## [12.0.1] - 2022-05-19

### Add

- Add initial setup of nosto checkout

## [12.0.0] - 2022-05-18

This update requires you to have a folder called config in your repo, with a file called localeDomains.js. You can use the update of the Ralph repo to 12.0.0 as a reference/merge it into your storefront.

### Added

- ChannelId to all graphql queries
- Config folder for extendable default configs
- Locale domains default config

## [11.5.2] - 2022-05-18

### Fixed

- Fix low resolution in background images

## [11.5.1] - 2022-05-17

### Added

- Modify CaImage component, add background image to improve performance

## [11.5.0] - 2022-05-16

### Added

- New CaTabs component to toggle single area content
- New CaTabPanel component to handle CaTabs area content

## [11.4.11] - 2022-05-10

### Added

- Emitting "closed" event from CaSearch

## [11.4.10] - 2022-05-09

### Fixed

- Add right naming to x-channelid header

## [11.4.9] - 2022-05-09

### Fixed

- Add store logs

## [11.4.8] - 2022-05-09

### Fixed

- Add logs

## [11.4.7] - 2022-05-09

### Fixed

- Fix channelId headers

## [11.4.6] - 2022-05-06

### Fixed

- Fix pagination and product links for "Best match" sorting in category page
- Wrong nosto placements render

## [11.4.5] - 2022-05-04

### Fixed

- Reverted background image for pagewidget images
- Running scripts that is placed in HTML widget

## [11.4.4] - 2022-05-04

### Fixed

- Change label in category sort nosto to Best match

## [11.4.3] - 2022-05-04

### Fixed

- Add graphql nosto product list route to category
- Fix nosto placements

## [11.4.2] - 2022-04-25

### Fixed

- Add right method to get html from nosto and render it

## [11.4.1] - 2022-04-24

### Fixed

- Temporary rm nosto widget

## [11.4.0] - 2022-04-19

### Added

- Img banner background optimized img

### Fixed

- Remove caching from CaTopBarNavigation && CaHeaderNavigation to prevent hydration errors

## [11.3.1] - 2022-04-19

### Fixed

- Route to product if totalStock is 0 in productlist addToCartClick

## [11.3.0] - 2022-04-14

### Added

- Add to cart function for product card

## [11.2.4] - 2022-04-11

### Fixed

- Close modal with product image after leave product page

## [11.2.3] - 2022-04-11

### Added

- Get stock class method

## [11.2.2] - 2022-04-11

### Added

- Add default width and height to images && add lazy-hydrate components
- Add delay to load banner iframe
- Add cache components

## [11.2.1] - 2022-04-08

### Fixed

- Fixed crush without nosto tokens in env file

## [11.2.0] - 2022-04-08

### Added

- Nosto support

## [11.1.0] - 2022-04-08

### Added

- Support for static stock
- Component for shipping options

### Fixed

- Some documentation

## [11.0.0] - 2022-04-07

### Added

- Support for oversellable stock status
- Stock status display component

### Changed

- currentStock in MixStockHandler should now be the full stock object and not only a number

## [10.6.3] - 2022-04-01

### Added

- Append new plugin to get header 'x-channelId' and save it to store

## [10.6.2] - 2021-03-29

### Fixed

- Don't show widget product list skeletons when no products was found

## [10.6.1] - 2021-03-29

### Changed

- If using price lists, flush cache after log in / log out
- Rollback for reload on log in / log out

## [10.6.0] - 2021-03-28

### Added

- Gtm track events

## [10.5.1] - 2021-03-24

### Removed

- Focus and blur listeners for checkout

### Fixed

- Added 'safety nets' for external checkout and cart/get

## [10.5.0] - 2021-03-24

### Added

- getCart action in the store: `dispatch('cart/get')`
- Mixin for confirm page, functions moved from the Ralph Storefront

### Changed

- Resetting the cart now also gets a brand new one right after

### Removed

- resetAndRefetchCart removed from MixListPAge, wasn't used anywhere

## [10.4.1] - 2021-03-23

### Fixed

- Awaiting logout before reloading for customers with price lists
- Hiding activated campaigns box in cart when only campaigns with hideTitle applied

## [10.4.0] - 2021-03-23

### Added

- Authentication added to BroadcastChannel

### Fixed

- If customer is using price lists, reload on log in / log out to empty cache (this is a short term solution)

## [10.3.4] - 2021-03-18

### Fixed

- Forcing refresh of external checkout frame when changing customer type

## [10.3.3] - 2021-03-18

### Changed

- Added fetchPolicy no-cache to createOrUpdateCheckout

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
