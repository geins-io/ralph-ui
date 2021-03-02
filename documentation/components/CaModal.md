# CaModal

A modal that can display a component inside it. Is triggered like so: `this.$store.commit('modal/open', modalSettings)`. modalSettings should be an object including component (String) and componentProps (Object). The component must emit event ready when content is loaded.<br><br> **SASS-path:** _./styles/components/molecules/ca-modal.scss_

