# CaAccountPanel

The account panel. Includes content panel frames 'login', 'create', 'reset' and 'change'<br><br> **SASS-path:** _./styles/components/molecules/ca-account-panel.scss_

## Methods

<!-- @vuese:CaAccountPanel:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setFrame|Set frame for content panel|Content panel frame (String)|
|createAccountHandler|Decides what action the create account button should have (different in different frames)|-|
|showFeedback|Show feedback|Feedback (Object)|
|closePanelAfterDelay|Closes panel after a delay of 1000 ms to let the user see the feedback|-|
|login|Log in action|-|
|createAccount|Create account action|-|
|resetPassword|Reset password action|-|
|changePassword|Reset password action|-|
|checkValid|Used to hide feedback if field becomes valid after error|-|
|enterHandler|Decides what action Enter key should trigger (different for different frames)|-|
|resetFields|Reset all fields|-|

<!-- @vuese:CaAccountPanel:methods:end -->


## Computed

<!-- @vuese:CaAccountPanel:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|loginMode|`Boolean`|Decides if the panel is in login mode|No|
|createMode|`Boolean`|Decides if the panel is in create mode|No|
|resetMode|`Boolean`|Decides if the panel is in reset mode|No|
|changeMode|`Boolean`|Decides if the panel is in change mode|No|
|title|`String`|Decides the title of the panel|No|
|currentFrame|`String`|Decides the current frame of the content panel|No|
|credentials|`Object`|Decides the credentials to be used for login, create account and change password|No|

<!-- @vuese:CaAccountPanel:computed:end -->


## MixIns

<!-- @vuese:CaAccountPanel:mixIns:start -->
|MixIn|
|---|
|MixFetch|

<!-- @vuese:CaAccountPanel:mixIns:end -->


