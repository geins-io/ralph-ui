# Changelog

<!--
Sections to use

### Added

### Changed

### Deprecated

### Removed

### Fixed
-->

## [23.2.0] - 2024-09-13

### Added

- Support for authentication refresh via headers instead of third party cookies, since they are being blocked by browsers.

## [23.1.0] - 2024-05-24

### Changed

- Getting cart on server if cart id exists, otherwise getting it on first add to cart

## [23.0.1] - 2024-05-23

### Fixed

- Fixed so that the cart only attemps to fetch 5 times on error, to not end up with infinite retries

## [23.0.0] - 2024-05-21

This major update will require you to update your storefront to Ralph Storefront v2.6.0.

### Added

- Default markup and style to the JSON widget with info and tips on how to use it

### Changed

- New image sizes for products and cms widgets
- Some general style improvements

### Removed

- Removed everything related to the `useStartPage` functionality from `plugins/router.js` and `middleware/ralph-default.js` that is never used and produces uneccerary error messages

## [22.1.0] - 2024-03-20

This update includes performance improvements and some bug fixes. It is recommended to update your storefront to Ralph Storefront v2.3.0 with this update to really see some performance improvements.

### Added

- Emitting the `PointerEvent` from `CaClickable`
- Option to set preloaded image sizes for product page through `$config.preLoadedProductImageSizes` (Array). This is good to improve the LCP metric for the product page
- Prop `fetchProductsOnServer` for `CaWidgetArea` to fetch products server side, which by default is set to `false`

### Changed

- Async and lazy loading for a lot of components
- Cart is not fetched server side, instead it's fetched in `MixGlobalInit` in `mounted` hook
- `$ralphLog` will now log both server and client side if active. Option to set `$config.ralphLog.onlyInClient` to turn off SSR logging

### Fixed

- Ctrl + click to open in new tab now works for prodcut card through `MixProductCard`
- Routing to other list page from search page bug

## [22.0.2] - 2024-03-11

### Fixed

- Fixed an issue with the cart cookie not being removed properly on the confirm page for external checkout
- Cart ID is now always saved as cookie even before anything is added to the cart
- External checkout will now init when it has data even if data does not exist at mounted
- Auto resetting cart if not valid

## [22.0.1] - 2024-03-06

### Fixed

- Fixed a bug with `CaFilterMultiTreeView` where no children was added to the item and therefore not showing any sub tree
- Fixed a CSS bug in `ca-list-filters` making the container too large on smaller screens if having long filter names
- No longer deselecting parents when deselecting children in `CaFilterMultiTreeView`
- CSS bug with `CaSkeleton` in `CaListFilters`

## [22.0.0] - 2024-02-29

This major update will require you to update your storefront to Ralph Storefront v2.2.0.

### Added

- New mixin `MixFetch`, used for fetching and mutating data from the api instead of apollo smart queries in components
- New global function `$fetchData`, used for fetching data from the api in asyncData or in the store
- New global function `$error404`, used for redirecting to 404 page
- New global function `$redirectToCanonical`, used for redirecting to the canonical url
- A more consistent and reliable way of handling errors
- New global function `$ralphLogError`, used for logging errors to the console
- New error events emitted to the store:
  - `error:api` - data payload: `error`
  - `error:404` - data payload: `error`
  - `error:500` - data payload: `error`
- A way to control what `$ralphLog` logs to the console in debug mode through the $config variable `ralphLog`, see Ralph Storefront v.2.2.0
- Some missing documentation for components and mixins
- Improved error feedback for `CaCheckoutInvoice`

### Changed

- All queries and mutations are now using the functionality from `MixFetch` instead of apollo smart queries, and are made in the asyncData or in the fetch hook
- `CaCheckoutExternal` is refactored and is no longer fetching is own confirm frame, use the one you get in `MixConfirmPage` instead
- Replaced all uses of `eventbus` with `this.$ralphBus`
- Option to set `refetchQueries` as a param for the `auth/update` action
- Refactoring of `CaWidgetArea` to use `MixFetch` or to get data from the parent, if it's a page. This to make a better handling of 404 errors amongst other things
- Refactoring of `MixVariantHandler` and make it work properly when variants has the same value

### Removed

- Removed `MixApolloRefetch` mixin, functionality exists in `MixFetch` instead
- Removed `CaCheckoutCarismar` component, use `CaCheckoutInvoice` instead
- Unnecessary `isSign` in `AuthClient`

### Fixed

- Correct 404 handling for Pages through `MixContentPage`
- Suspention of external checkout frame now works properly
- Prevents refetching of queries on first init auth refresh, it's not needed
- Latest products and favorites mode in `CaWidgetProductList` now works properly
- Close product image modal gallery when backing from PDP
- Added missing `ca-account-header.scss`

## [21.1.0] - 2024-02-12

### Added

- `CaCheckoutInvoice` - component for manual invoice checkout
- Zip code data to order object for checkout confirm data

### Changed

- Changed trigger for global loading state
- Replaced Timeout in Vuex to remove POJO warning
- Using `checkoutMarket` instead of global market when adding promo code to cart

### Deprecated

- `CaCheckoutCarismar` - use `CaCheckoutInvoice` instead

### Fixed

- Correct name for authenticated middleware fixing "my account" issues
- Stop loading if current variant is picked

## [21.0.0] - 2023-12-14

This major update will require you to update your storefront to Ralph Storefront v2.0.0.

### Added

- Support for Node 16 ✨
- Internal function to persist Vuex state

### Changed

- Changed name of package changed from `@ralph/ralph-ui` to `@geins/ralph-ui`
- No support for Node 14
- Updated/Added/Removed dependencies
- Updated js and scss linting
- Routing to products is now done programatically instead of using `<NuxtLink>`
- Function `sizeChangeHandler` in `MixProductPage` is now called `skuChangeHandler`
- Changed name of `CaUdc` component to `CaNshift`
- Getting cart on confirm page from `checkout` query instead of `getCart` query
- Moved changelog to `CHANGELOG.md`
- Using `asyncData` instead of nuxt apollo module for fetching data on product page
- Renaming of plugins to kebab-case

### Removed

- Nosto integration
- Graphql combined query on product page

### Fixed

- Correct 404 handling on product page

## [20.3.5] - 2023-12-04

### Fixed

- The navigation menus to only display items with labels and eliminating empty items

## [20.3.4] - 2023-11-27

### Fixed

- `CaFilterMultiTreeView`: unselect children when parent is unselected
- `CaImage`: invalid property value (CSS)

## [20.3.3] - 2023-11-22

### Fixed

- Prevent closing `CaHeaderNavigation` when clicking between links

## [20.3.2] - 2023-11-06

### Fixed

- Added missed return

## [20.3.1] - 2023-11-06

### Fixed

- Made sure that no setInterval could keep running forever in case of error
- Prevent default on 'dragstart' event causing bug in `CaSlide` when using Firefox

## [20.3.0] - 2023-10-12

### Added

- Rows that shows if balance is being used to pay the order in cart summary

### Changed

- Apollo cache is now always cleared on log in and log out, not only when using price lists

### Fixed

- Bug that displayed current max count higher than total count in pagination
- Correct default values for checkbox bg color and border color

## [20.2.2] - 2023-10-05

### Fixed

- Bug that in some cases generates SSR errors because of conditional rendering
- Not showing title if `CaWidgetProductList` has no products

## [20.2.1] - 2023-10-03

### Changed

- Supply all image sizes for `isThumbnailModeGrid` in `CaProductGallery`.

## [20.2.0] - 2023-09-26

### Added

- Support in cart to show refunded items
- Showing refunds on order detail page under "My account"
- Generated documentation files

## [20.1.0] - 2023-09-06

### Added

- Limit of tries to relocate product in list pages to protect against infinite loops in erreoneous listings
- Option to scroll to top in `resetCurrentPage` function
- `regularPriceIncVat` and `regularPriceExVat` to price fragment
- Correct route handling for checkout confirm if using manual invoice
- Correct data for the `checkout:purchase` event when using manual invoice

### Fixed

- Bug that breaks the confirm page when using manual invoice
- Bug that in some cases showed the second page twice in list pagination
- Bug that didn't relocate product properly when backing from PDP to list page
- Retaining query and hash in multi lang / multi market pages when adding lang and market to url when it's missing
- Clear cache on auth refresh to ensure correct prices for customers with price lists

## [20.0.2] - 2023-08-15

### Fixed

- Meta data from API now works again for list pages that doesn't use `MixListPage`, for example list pages from external services (e.g. Voyado Elevate)

### Changed

- `MixMetaReplacement` and `head()` for list pages is moved from `MixListPage` to `MixListInfo`

## [20.0.1] - 2023-08-14

### Fixed

- Typo in CaMarketPanel classname
- Broken image filenames in `CaProductGalleryModal` (revert to previous code)
- Exclude duplicated first image in `CaProductGallery` when using `thumbnail-mode="grid"`

## [20.0.0] - 2023-07-24

This version has a lot of overall SEO improvements and also introduces full flexibility in creating your own widgets. Make sure to update your storefront according to the update commit in Ralph Storefront.

Note! If you are using GTM and update to this version you will need to implement and start using the `@geins/ralph-module-gtm` module instead, and change your GTM accordingly.

### Added

- Slot in CaFeedback that can be used instead of message
- Custom defaultSort for a page via `customSortRoutes` in \$config
- Improved SEO for pagination
- Gtin13 option in product schema
- Enabled product change in product card, passing an array insted of one product
- Prop `fetchProductsOnlyClientSide` for widget areas
- Overridable widget type
- JSON widget
- Mixin for brands page functionality
- Possibility to link directly to an active cart, like so: `www.example.com?action=cart#{cartId}`

### Fixed

- Bug in pagination
- Remove non-POJOs warning
- Bug with variant pickers showing more than 1 active variant when they share title
- Correct request url in page impression event
- Do not break checkout if no consents

### Changed

- Splitted listPageInfo into it's own query to allow externally fetched products and filters
- Product list and product are now fetched server side for SEO reasons
- Decreased number of api calls to products
- Separating top widget area from list page query

### Deprecated

- `getCheckout` & `getCheckoutAndOrder` queries, use checkout instead
- Use of Ralph UI internal GTM - use `@geins/ralph-module-gtm` instead (removing `$config.useExternalGtm` from config)
- The use of `product.images` on ProductType - use `product.productImages` instead

## [19.5.3] - 2023-06-30

### Fixed

- Hide show-all link in `<CaPanelNavigation />` if url is empty

## [19.5.2] - 2023-06-09

### Fixed

- Handle outside click for `<CaHeaderNavigation />`

## [19.5.1] - 2023-05-22

### Fixed

- Setting external shipping fee even if it's 0

## [19.5.0] - 2023-05-20

Note! If you want to use the more SEO-friendly version of the list pagination, you have to remove CaListPagination from your storefront to use the one from Ralph UI instead.

### Added

- CaListPagination component (moved from Ralph Storefront to Ralph UI and improved according to SEO standards)
- Html attributes from i18n
- Canonical from i18n

## [19.4.0] - 2023-05-20

### Added

- Option to set `$config.useExternalGtm` to use disable the internal pushes to GTM
- Added `orderCart` and `orderId` to `checkout:purchase` event payload

### Fixed

- Sending `product-detail:impression` event when changing variant on product page
- Only sending `page:impression` if path has actually changed (not just query params)

## [19.3.0] - 2023-05-17

### Added

- Added `merchentData` to the checkout store. Will get sent with createOrUpdateCheckout if set
- Making `articleNumber` and `sellingPriceIncVat` always available
- Added `index` and `pageSize` to the `product:impression` event payload

### Fixed

- Correct product to be sent with `cart:add` and `cart:remove` events

## [19.2.1] - 2023-05-12

### Fixed

- Turned of debugging in checkout

## [19.2.0] - 2023-05-12

### Added

- Possibility to add an external shipping fee in checkout
- Possibility to add full product object to favorite data payload

### Fixed

- Updated vuese documentation

## [19.1.1] - 2023-05-10

### Fixed

- Fixed bug with currentMaxCount being wrong when server side rendering paginated list

## [19.1.0] - 2023-05-04

This update improves the events push and adds some events.

### Added

- Events:
  - `widget:click` - data payload: `{ href }`
  - `menu:click` - data payload: `{ item }`
  - `search:click` - data payload: `{ type, data }`

### Changed

- Menus are now again fetched even server-side. Added a prop to MixMenu to fetch only client-side if needed: `onlyClientSide`
- State removed from events payload since it's reachable anyways

## [19.0.0] - 2023-04-21

You will need to make these updates to your storefront to be able to use this version of Ralph UI:

- Remove CaToggleFavorite from your storefront to use the one from Ralph UI instead
- Remove `plugins/get-path.js` and use `plugins/ralph.js` instead
- Add `events.js` to your store folder and import store from `ralphevents` (see commit in Ralph Storefront for reference)
- Update click handlers for CaProductCard (see commit in Ralph Storefront for reference)

### Added

- `events` (store/ralphevents.js) added to store with the following events emitted:

  - `cart:add` - data payload: `{ item, product }`
  - `cart:remove` - data payload: `{ item, product }`
  - `page:impression` - data payload: `{ route }`
  - `product:click` - data payload: `{ product, page, index, pageSize }`
  - `product:impression` - data payload: `{ product, page }`
  - `product-detail:impression` - data payload: `{ product }`
  - `favorite:add` - data payload: `{ productId }`
  - `favorite:remove` - data payload: `{ productId }`
  - `checkout:impression` - data payload: `{}`
  - `checkout:update` - data payload: `{ checkout }`
  - `checkout:purchase` - data payload: `{ order }`
  - `user:login` - data payload: `{}`
  - `user:logout` - data payload: `{}`
  - `user:register` - data payload: `{}`
  - `user:password-reset` - data payload: `{ email, resetKey }`
  - `user:delete` - data payload: `{}`
  - `newsletter:subscribe` - data payload: `{ email }`

All events also has a payload of:

- `type` - the type of event (e.g. `cart:add`)
- `timestamp` - the timestamp of the event
- `state` - the current state of the store with these properites:

  - `auth`
  - `cart`
  - `channel`
  - `checkout`
  - `currentRouteName`
  - `customerType`
  - `favorites`
  - `vatIncluded`

- `CaToggleFavorite` component (moved from Ralph Storefront to Ralph UI)
- Global log function `$ralphLog` used like so: `this.$ralphLog(message, ...args)`
- `currentLocale`and `currentCurency`in store/channel for it to be included in the state in event payload

### Changed

- Using toggleFavorite acrion instead of toggleFavorite mutation to be able to emit events

### Fixed

- Fixed error with server side rendering checkout page without cart id
- Moved `ralph-create` script from wrong folder so that it works now

### Deprecated

- `plugins/get-path.js` - use `plugins/ralph.js` instead
- Mutaion `toggleFavorite` - use action `toggleFavorite` instead

## [18.1.2] - 2023-04-12

### Fixed

- Fixed error with sorting set to default when server-side rendering search page

## [18.1.1] - 2023-03-30

Make sure your storefront does not overwrite the `head()` in `layout/default.vue` if you want to use the default meta data functionality. Also, if you have multilang support in your site, remove the meta settings of pwa module in `nuxt.config.js` to avoid problems with default meta not translating.

### Fixed

- Improved default meta

## [18.1.0] - 2023-03-29

### Added

- Extended support for 2 level menu in `CaInfoPageMenu`.
- New component `CaAccordionNavigation` with support for 2 level menu. For displaying a menu as an accordion.

## [18.0.2] - 2023-03-24

### Fixed

- Secure being on search page before setting "RELEVANCE" as sort option (can happen while routing to search page)

## [18.0.1] - 2023-03-24

You will need to either update your `sortOptions` data in `CaListSettings.vue` to include the new `RELEVANCE` option or you can use the new mixin `MixProductListSort` to handle the sort options. If you decide to use the new mixin (strongly recommended!), make sure to update your lang keys accordinlgy and to remove existing variables, props and watch in `CaListSettings.vue`, see update commit (to Ralph UI 18.0.2) in Ralph for reference.

### Added

- `RELEVANCE` sort option for product list (only used on search page)
- Mixin `MixProductListSort` for handling product list sort options

## [17.4.1] - 2023-03-22

### Removed

- Removed customer specific widgets until they will be available to all

## [17.4.0] - 2023-03-21

### Added

- Support for Avarda checkout in CaCheckoutExternal

### Fixed

- Nullcheck in CaMarketSelectorButton to avoid error when non existing market is selected by wrong env or cookie

## [17.3.2] - 2023-03-16

### Fixed

- Breadcrumbs computations - category tree added as dependency

## [17.3.1] - 2023-03-15

### Added

- SASS-variable for `$c-input-checkbox-check`

### Fixed

- Menu item with external link opened with same tab or window (when missing `targetBlank` property)
- encodeURI for links

## [17.3.0] - 2023-03-14

### Added

- `renderMode` for CaVariantPickerPanel to separate panel from button if needed for layout reasons
- CSS variables for ca-icon-and-text

### Changed

- Separated functionality from CaSearch to MixSearch

### Fixed

- Fix for weird behaviour in multi filter tree view + better markup
- Ratio fix for CaImage
- Support for links in menu without children when using menuState 'click'

## [17.2.0] - 2023-03-14

### Added

- Add widgets: `Image Map` and `Text On Image`

## [17.1.2] - 2023-02-28

### Fixed

- CSS code standard improvements
- Bug in getPath for sites not using marketInPath

## [17.1.1] - 2023-02-23

### Fixed

- Widget Flowbox - fixed bug with initialization (generating pseudo id), loading widget only on client side, handle dynamic product flow option

## [17.1.0] - 2023-02-23

### Added

- Add widget Category Puffs

## [17.0.0] - 2023-02-21

This update will require you to add `channel.js` to your store folder. You will also need to update your .env-file to use `FALLBACK_MARKET_ALIAS` instead of `FALLBACK_MARKET_ID` and the format should be for example "se" for Sweden. Also, fallback markets need to be fetched from the api in nuxt.config. You also need to add `@mixin scrollbarStyle`. See commit in Ralph for reference for all this.

### Added

- Redirect for not allowed langugaes on market
- New market selector panel
- Market group component
- Market item component
- Generated documentation files
- `currentRouterName` in store

### Changed

- Moved channelId, marketAlias and markets into new section of store: channel
- All market routing is now handled through default middleware
- Global `$getPath` function now takes market and locale as arguments
- Separated checkoutMarket from currentMarket to avoid routing to unavailable markets
- Separated currentWidget function from CaWidget to make it easier to override
- .env-variable `FALLBACK_MARKET_ID` is now called `FALLBACK_MARKET_ALIAS`

### Deprecated

- CaCountrySelectorPanel - use CaMarketPanel instead

### Fixed

- Fix for console error for enableBodyScroll when leaving PDP

## [16.2.0] - 2023-02-14

### Added

- Add Flowbox widget

## [16.1.0] - 2023-02-14

### Added

- Components for a review(comment) section: stars voting, form to add review, list of reviews with pagination
- ! please make sure to set up 2 new properties in publicRuntimeConfig in nuxt.config.js: `showProductReviewSection` and `showStarsInProductReviewForm`

## [16.0.0] - 2023-02-10

This update will require you to add settings `marketInPath` and `useStartPage` to publicRuntimeConfig in nuxt.config.js. Also some changes to start page/front page. See commit in Ralph for reference

### Added

- Support for market in path / route
- Global getPath function to get internal paths with market

### Changed

- Using @nuxtjs/router module with the router.js file to modify all routes

## [15.2.0] - 2023-02-09

### Added

- New prop to control in which state to open the menu - `hover` or `click`. Defaults to `hover`. How to use:

```js
<CaHeaderNavigation
  menu-state="click"
  class="only-computer"
  menu-location-id="main-desktop"
/>
```

## [15.1.7] - 2023-02-02

### Changed

- Improved input types in account settings and checkout for better user experience.

## [15.1.6] - 2023-02-01

### Added

- Define default host and port for Vuese
- Script to run documentation in parallel during the development

## [15.1.5] - 2023-01-31

### Fixed

- Checkout not updating when changing marketId but keeping same currency

## [15.1.4] - 2023-01-31

### Added

- Broadcasting change of marketId between tabs

### Changed

- MarketId now only has one source of truth, removing unnecessary calls to createOrUpdateCheckout
- Country selector now updating according to external changes in marketId

## [15.1.3] - 2023-01-30

### Fixed

- Fix for nShift (udc) bug in setting externalShippingId. Needs addition of `:data-is-set="udcDataSet"` to CaUdc widget in CaCheckout

## [15.1.2] - 2023-01-27

### Fixed

- Fix for non functioning favorite removal

## [15.1.1] - 2023-01-25

### Added

- Global function to clear apollo cache in store

### Changed

- Name of MixCache to more describing MixApolloRefetch

### Fixed

- Changing marketId will now trigger refetch of active Apollo queries

## [15.1.0] - 2023-01-25

This version number ha already been wrongly used by a dev release, will release 15.1.1 as next

## [15.0.0] - 2023-01-23

### Added

- Global multiple language, market and currency support
- Country selector component

### Changed

- Favorites are now using product id instead of alias, but will support alias
- Moved apollo-config.js into Ralph UI
- Moved call for global meta into Ralph UI

### Fixed

- Fix product list slider (add error in case of missing config variable). Clients' storefronts should be updated.
  Please make sure in nuxt.config.js in property `publicRuntimeConfig`:
  - Check if property `breakpoints` and `productListScrollSize` have a property `desktopBig` with a value set

## [14.9.23] - 2023-01-19

### Fixed

- Fix 'Add to Cart' and 'Remove from Cart' gtm events

## [14.9.22] - 2023-01-17

### Fixed

- Optional chaining/null check for gtm config object
- Linting issues for CaProductPriceHistory

## [14.9.21] - 2023-01-17

### Fixed

- Semantic improvements for presenting price data in price history component.

## [14.9.20] - 2023-01-16

### Added

- Add missing path attribute to cookie methods set/remove

## [14.9.19] - 2023-01-13

### Added

- Option to switch the key for GTM event items between `products` or `items` (defaults to products)

## [14.9.18] - 2023-01-11

### Fixed

- Added discount percentage to product object

## [14.9.17] - 2023-01-09

### Fixed

- Improve check for current breadcrumb level

## [14.9.16] - 2023-01-05

### Fixed

- Search check for multi language

## [14.9.14] - 2022-12-27

### Added

- Currency to gtm purchase event

## [14.9.13] - 2022-12-09

### Fixed

- Prevent duplicated price changes in product price history

## [14.9.12] - 2022-12-08

### Fixed

- Conditions for rendering in product price history

## [14.9.11] - 2022-12-01

### Added

- Graphql query for listpage info

## [14.9.10] - 2022-12-01

### Added

- Support to search for multi language

## [14.9.9] - 2022-11-29

### Added

- Component that displaying product price history as table or panel.

## [14.9.8] - 2022-11-16

### Added

- Option to hide filter values

## [14.9.7] - 2022-11-15

### Added

- Option to display variants using images
- Pass widget variables to config object
- Enable open class on toggle for accordions

## [14.9.6] - 2022-11-15

### Changed

- Prevent cart from crashing application when id not found

## [14.9.5] - 2022-11-8

### Added

- Aditional check for widonw.nosto

## [14.9.4] - 2022-11-7

### Added

- Identifier in product query

### Fixed

- Wrong path in switchToCanonicalor404

## [14.9.3] - 2022-11-3

### Fixed

- Breadcrumbs component to show all categories

## [14.9.2] - 2022-11-3

### Added

- Order filters by their order property

## [14.9.1] - 2022-11-1

### Fixed

- Separate nosto and gtm events in different conditionals

## [14.9.0] - 2022-11-1

### Fixed

- Set default color on icons and links fix for ios
- Pass order id and currency to gtm and nosto

## [14.8.25] - 2022-10-27

### Fixed

- Gallery on ios devices

## [14.8.24] - 2022-10-27

### Fixed

- Hide footer acordions if there are no menu items

## [14.8.22] - 2022-10-25

### Fixed

- Check if the shipping is valid

## [14.8.21] - 2022-10-24

### Changed

- Added check for if price is discounted in mixprice

## [14.8.20] - 2022-10-24

### Changed

- Removed temp identifiers from genders
- Check for nosto data

## [14.8.18] - 2022-10-23

### Fixed

- Hide the default nosto widget html

### Added

- wrap nosto method in timeout
- reduce timeout

## [14.8.13] - 2022-10-23

### Added

- Gender to meta replacment

## [14.8.12] - 2022-10-21

### Added

- Meta replacment for gender and brand

## [14.8.11] - 2022-10-20

### Removed

- Client render on widgets

## [14.8.10] - 2022-10-20

### Added

- Moved requests client side to increase TTFB
- Added Global cart id to load cart client side

## [14.8.9] - 2022-10-19

### Fixed

- Nosto js init only clientside

## [14.8.8] - 2022-10-19

### Revert

- Changes to MixVariantHandler from [14.8.4]

## [14.8.7] - 2022-10-18

### Fixed

- Nosto widgets on load

## [14.8.6] - 2022-10-17

### Added

- Enable option of product card design for quick add products

## [14.8.5] - 2022-10-14

### Fixed

- Filters not showing due to interavl beeing cleared too soon

## [14.8.4] - 2022-10-13

### Fixed

- Pass product SKU to variant picker

## [14.8.3] - 2022-10-12

### Update

- Set default market id if only one market

## [14.8.2] - 2022-10-12

### Changed

- Removed opacity on checkout guards

## [14.8.1] - 2022-10-12

### Fixed

- Refresh cart on location change

## [14.8.0] - 2022-10-11

### Added

- Country selector for sotrefronts with multiple markets

### Fixed

- Proper clear of setInterval

## [14.7.4] - 2022-10-05

### Fixed

- Removed last bit of LazyHydrate, it was preventing nosto from loading

## [14.7.3] - 2022-10-04

### Fixed

- Check for nosto activated

## [14.7.2] - 2022-10-03

### Added

- Disabled lazy load if first widget of the page is image

### Fixed

- Proper check for product variant, to stop crashing the node server

### Updated

- Removed console logs

## [14.7.1] - 2022-09-30

### Added

- Dynamic currency for gtm events

## [14.7.0] - 2022-09-30

### Update

- Bump version to be same as deployed one on artifacts

## [14.6.8] - 2022-09-29

### Reverted

- Revert the removal of propagation, done in 14.6.6, as it didn't help the memory leak

## [14.6.7] - 2022-09-27

### Fixed

- Added support for discount filter

## [14.6.6] - 2022-09-27

### Added

- Nosto check for log in /out, memory leak tests

## [14.6.5] - 2022-09-27

### Updated

- Load menus serverside

## [14.6.4] - 2022-09-27

### Fixed

- Checking nostoAccountId instead of nostoAccountAppsKey for displaying nosto widget

## [14.6.3] - 2022-09-27

### Updated

- Revert the way 404 are handled

## [14.6.2] - 2022-09-23

### Fixed

- Bug in authClient not setting token for some clients

## [14.6.1] - 2022-09-22

### Updated

- Deselecting parent category in the tree view will deselect all children

## [14.6.0] - 2022-09-20

### Added

- Error handling and logging

## [14.5.0] - 2022-09-19

### Added

- Support for meta image with fallback

## [14.4.5] - 2022-09-13

### Changed

- Removed Lazy Hydration wrapper on CaWidgetContainer
  - It was wrapping all components in one therefor making it not do anything
- Moved the lazy hydration on the widget that renders, so it hydrates when visible

## [14.4.4] - 2022-09-12

### Fixed

- Added missing url variable for widgetArea call

## [14.4.3] - 2022-09-08

### Added

- Props for sizes attributes in CaProductGallery

## [14.4.2] - 2022-09-08

### Added

- Fetching balanceFormatted in UserType query

### Fixed

- Fixed an issue where auth client breaks if customer does not have nosto

## [14.4.1] - 2022-09-08

### Changed

- Reorganize tree view component
- Proper recursion
- Toggle acordion if selection has been made

### Fixed

- Fixed an issue where accordion wouldn't toggle if a child is selected

## [14.4.0] - 2022-09-07

### Changed

- Enable excludeFacets for products query filter in MixtListPage
- Added ARIA label attributes & componentProps made optional for Modal
- Hide plus icon if product gallery has no overlay

## [14.3.6] - 2022-09-06

### Fixed

- Toggle parrent categories when rendering the tree and only a child is selected

## [14.3.5] - 2022-09-05

### Changed

- Split Tree view component into 2 separate components, one for logic one for recursion
- Tree View no properly works with infinite number of child categories

## [14.3.4] - 2022-08-30

### Changed

- Added mouseover and mouseleave events for CaHeaderNavigation items so that it can close when menu item is clicked

## [14.3.3] - 2022-08-29

### Changed

- Made the product parameter optional for the AddToCart mixin to make it possible to use mixin without triggering the info popup.

## [14.3.2] - 2022-08-26

### Fixed

- When a child node is unmarked, in the filter tree view, the parent has to be unmarked as well. Otherwise nothing changes in the filtered list

## [14.3.1] - 2022-08-23

### Fixed

- Fixed conditionals when checking for Nosto ID or Config

## [14.3.0] - 2022-08-18

### Added

- Added Tree view multi filter

## [14.2.0] - 2022-08-16

### Added

- Info page menu

## [14.1.0] - 2022-07-29

### Added

- Rich text widget

## [14.0.3] - 2022-07-26

### Fixed

- Removed console log
- Fixed problem with product gallery css
- Fallback for no filters in filters callback

## [14.0.2] - 2022-07-26

### Added

- Brands query

### Fixed

- Spelling error in class name

## [14.0.1] - 2022-07-15

### Added

- Fix slow loading of layout components && move getMenuAtLocation to client

## [14.0.0] - 2022-07-13

### Added

- Theme support for a lot of components with css variables
- Support for new full url routing for list pages
- Added grid mode for product gallery thumbs
- Support for price filter
- Support for hidden header mode on scroll

## [13.2.0] - 2022-07-12

### Fixed

- Fix view skeleton without apiKey
- Fix layout shift title

## [13.1.19] - 2022-07-11

### Added

- Skeleton to NostoSection

### Fixed

- Walley payment method fix for null orderId

## [13.1.18] - 2022-07-07

### Fixed

- Fix send headers after send to the client in checkout page

## [13.1.17] - 2022-07-07

### Fixed

- Remove nosto from plugins

## [13.1.16] - 2022-07-04

### Added

- Add WALLEY way to pay on nosto

## [13.1.15] - 2022-07-01

### Fixed

- Fix nosto add to card && move to mixin same methods

## [13.1.14] - 2022-06-28

### Fixed

- Fix nosto add to card && move to mixin same methods

## [13.1.13] - 2022-06-28

### Fixed

- Fixes nShift bug related to input fields in nShift frame without debouncer
- Fixed bug in gtm push that causes error in checkout on reload

## [13.1.12] - 2022-06-28

### Fixed

- Fix visibility title on empty nosto list

## [13.1.11] - 2022-06-28

### Added

- Add nosto formatting data to CaQuickAddProducts

## [13.1.10] - 2022-06-27

### Fixed

- Fix server requests to product widget in CaWidgetProductList

## [13.1.9] - 2022-06-23

### Fixed

- Fix static parameters for filters

## [13.1.8] - 2022-06-23

### Added

- Srcset prop for CaImage

## [13.1.7] - 2022-06-22

### Fixed

- Set Filtermode with any ui filters

## [13.1.6] - 2022-06-22

### Fixed

- Feedback for nShift/UDC handled correctly

## [13.1.5] - 2022-06-22

### Fixed

- Set Filtermode with right condition

## [13.1.4] - 2022-06-21

### Fixed

- Fix filters cache in category page

## [13.1.3] - 2022-06-20

### Added

- Move nostoAppsKey to another var

## [13.1.2] - 2022-06-17

### Added

- Add filtermode to product request

## [13.1.1] - 2022-06-17

### Fixed

- Move nosto product req to client

## [13.1.0] - 2022-06-16

### Added

- Walley Checkout support

### Fixed

- Cart items change when modifying promo code

### Removed

- Unnecessary check for checkout-container element on external checkout init

## [13.0.9] - 2022-06-15

### Fixed

- Minor fix of product combine query

## [13.0.8] - 2022-06-11

### Fixed

- Minor nosto fix of checkout event

## [13.0.7] - 2022-06-10

### Removed

- Removed channel-settings from store

## [13.0.6] - 2022-06-10

### Fixed

- Reverted new baseUrl handling until better solution is found

## [13.0.5] - 2022-06-10

### Fixed

- JSON.parse for baseUrl

## [13.0.4] - 2022-06-09

### Fixed

- Fix search channelId empty value

## [13.0.3] - 2022-06-09

### Fixed

- Fix combine variables in no filter request

## [13.0.2] - 2022-06-09

### Added

- Divide requests, move filter request from withAreaCombine

## [13.0.1] - 2022-06-09

### Fixed

- Fix nosto checkout event
- Fix bug with latest/favorite widget

## [13.0.0] - 2022-06-08

This update will need you to add a channelSettings.js file in the config folder and to change your environment variables. See Project Ralph for reference

### Added

- Added languageId to all endpoints
- Added currentBaseUrl which is based on channelId
- Added fallback for channelId
- Added channelSettings to store

## [12.2.1] - 2022-06-06

### Added

- Add nosto checkout event

### Fixed

- Fix headers errors

## [12.2.0] - 2022-06-02

### Added

- Extend WidgetProductList with latest viewed/favorites products mode

## [12.1.0] - 2022-06-01

### Fixed

- Revert version to 12.0.4

## [12.0.4] - 2022-05-24

### Fixed

- Fix channelId dublication error

## [12.0.3] - 2022-05-20

### Fixed

- Fix empty cart checkout

## [12.0.2] - 2022-05-19

### Fixed

- Channelid dublicate fix

## [12.0.1] - 2022-05-19

### Added

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
