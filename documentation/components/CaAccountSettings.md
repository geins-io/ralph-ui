# CaAccountSettings

The settings for a users account<br><br> **SASS-path:** _./styles/components/organisms/ca-account-settings.scss_

## Props

<!-- @vuese:CaAccountSettings:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|user|The user object received from the API|`Object`|`true`|-|
|genders|What genders is available|`Array`|`true`|-|

<!-- @vuese:CaAccountSettings:props:end -->


## Events

<!-- @vuese:CaAccountSettings:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|save|-|-|
|close-modal|-|-|

<!-- @vuese:CaAccountSettings:events:end -->


## Methods

<!-- @vuese:CaAccountSettings:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|saveUser|Save the user data|section (String)|
|triggerDeletePrompt|Trigger delete account prompt|-|
|deleteAccount|Delete the account|-|
|getVatDisplay|Get label for toggle|Boolean|

<!-- @vuese:CaAccountSettings:methods:end -->


## Computed

<!-- @vuese:CaAccountSettings:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|addressInput|`Object`|The full adress input object|No|
|customerTypes|`Array`|The customer types available|No|
|currentUserType|`Object`|The current user type|No|
|userIsOrganization|`Boolean`|If the user is an organization|No|

<!-- @vuese:CaAccountSettings:computed:end -->


## MixIns

<!-- @vuese:CaAccountSettings:mixIns:start -->
|MixIn|
|---|
|MixFetch|

<!-- @vuese:CaAccountSettings:mixIns:end -->


