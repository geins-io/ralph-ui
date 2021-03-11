# CaAccountPanel

The account panel. Includes content panel frames 'login', 'create', 'reset' and 'change'<br><br> **SASS-path:** _./styles/components/molecules/ca-account-panel.scss_

## Methods

<!-- @vuese:CaAccountPanel:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|setFrame|Set frame for content panel|Content panel frame (String)|
|createAccountHandler|Decides what action the create account button should have (different in different frames)|-|
|showFeedback|Show feedback|Feedback (Object)|
|closePanelAfterDelay|Closes panel after a delay of 2000 ms|-|
|login|Log in action|-|
|loginAndRegisterCallback|Callback for when account is created or login is successfull|Callback result (Object)|
|createAccount|Create account action|-|
|resetPassword|Reset password action|-|
|changePassword|Reset password action|-|
|checkValid|Used to hide feedback if field becomes valid after error|-|
|enterHandler|Decides what action Enter key should trigger (different for different frames)|-|

<!-- @vuese:CaAccountPanel:methods:end -->


