# CaModal

A modal that can display a component inside it. Is triggered like so: `this.$store.commit('modal/open', modalSettings)`. modalSettings should be an object including component (String) and componentProps (Object). The component must emit event ready when content is loaded.<br><br>(Aria label & description)[https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role] is based on element with ids "ca-modal__title" & "ca-modal__description". Make sure to specify these in loaded component **SASS-path:** _./styles/components/molecules/ca-modal.scss_

