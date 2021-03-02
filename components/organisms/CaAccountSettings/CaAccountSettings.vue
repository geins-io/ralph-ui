<template>
  <div class="ca-account-settings">
    <CaAccountSettingsBlock
      ref="settingsUser"
      :title="$t('ACCOUNT_USER_INFO_TITLE')"
      @save="saveUser($refs.settingsUser)"
    >
      <template #content="{editMode}">
        <CaInputText
          v-if="editMode"
          id="email"
          v-model="user.email"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('EMAIL')"
        />
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">{{ $t('EMAIL') }}</h3>
          <p class="ca-account-settings__setting-value">{{ user.email }}</p>
        </div>

        <CaInputText
          v-if="editMode"
          id="firstname"
          v-model="user.firstName"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_FIRST_NAME')"
        />
        <div v-else-if="user.firstName" class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_FIRST_NAME') }}
          </h3>
          <p class="ca-account-settings__setting-value">{{ user.firstName }}</p>
        </div>

        <CaInputText
          v-if="editMode"
          id="lastname"
          v-model="user.lastName"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_LAST_NAME')"
        />
        <div v-else-if="user.lastName" class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_LAST_NAME') }}
          </h3>
          <p class="ca-account-settings__setting-value">{{ user.lastName }}</p>
        </div>

        <CaInputText
          v-if="editMode"
          id="phone"
          v-model="user.phone"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_PHONE_NUMBER')"
        />
        <div v-else-if="user.phone" class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_PHONE_NUMBER') }}
          </h3>
          <p class="ca-account-settings__setting-value">{{ user.phone }}</p>
        </div>

        <div
          v-if="editMode"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
        >
          <h3
            class="ca-account-settings__setting-label ca-account-settings__setting-label--edit"
          >
            {{ $t('LABEL_GENDER') }}
          </h3>
          <CaInputRadio
            v-for="(gender, index) in genders"
            :key="index"
            v-model="user.gender"
            :label="gender.label"
            :value="gender.value"
          />
        </div>
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_GENDER') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ genders.find(i => i.value === user.gender).label }}
          </p>
        </div>
      </template>
    </CaAccountSettingsBlock>
    <CaAccountSettingsBlock
      ref="settingsAddress"
      :title="$t('ACCOUNT_BILLING_SHIPPING_TITLE')"
      @save="saveUser($refs.settingsAddress)"
    >
      <template #content="{editMode}">
        <CaInputText
          v-if="editMode"
          id="co"
          v-model="user.address.shipping.co"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_CARE_OF')"
        />
        <div
          v-else-if="user.address.shipping.co"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_CARE_OF') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.shipping.co }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="address"
          v-model="user.address.shipping.address"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_ADDRESS')"
        />
        <CaInputText
          v-if="editMode"
          id="address2"
          v-model="user.address.shipping.address2"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_ADDRESS_2')"
        />
        <div
          v-else-if="user.address.shipping.address"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_ADDRESS') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.shipping.address }}
          </p>
          <p class="ca-account-settings__setting-value">
            {{ user.address.shipping.address2 }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="zip"
          v-model="user.address.shipping.zip"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_ZIP')"
        />
        <div
          v-else-if="user.address.shipping.zip"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_ZIP') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.shipping.zip }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="city"
          v-model="user.address.shipping.city"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_CITY')"
        />
        <div
          v-else-if="user.address.shipping.city"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_CITY') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.shipping.city }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="country"
          v-model="user.address.shipping.country"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_COUNTRY')"
        />
        <div
          v-else-if="user.address.shipping.country"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_COUNTRY') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.shipping.country }}
          </p>
        </div>
      </template>
    </CaAccountSettingsBlock>
    <CaAccountSettingsBlock
      ref="settingsNewsletter"
      :title="$t('ACCOUNT_NEWSLETTER_TITLE')"
      @save="saveUser($refs.settingsNewsletter)"
    >
      <template #content="{editMode}">
        <div v-if="editMode" class="ca-account-settings__setting">
          <h3
            class="ca-account-settings__setting-label ca-account-settings__setting-label--edit"
          >
            {{ $t('LABEL_NEWSLETTER') }}
          </h3>
          <CaInputRadio
            v-model="user.newsletter"
            :label="$t('YES')"
            :value="true"
          />
          <CaInputRadio
            v-model="user.newsletter"
            :label="$t('NO')"
            :value="false"
          />
        </div>
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_NEWSLETTER') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.newsletter ? $t('YES') : $t('NO') }}
          </p>
        </div>
      </template>
    </CaAccountSettingsBlock>
    <CaAccountSettingsBlock
      :title="$t('ACCOUNT_PRIVACY_TITLE')"
      :editable="false"
    >
      <template #content>
        <ul class="ca-account-settings__actions">
          <li class="ca-account-settings__action">
            <button
              class="ca-account-settings__action-button"
              @click="
                $store.commit('contentpanel/open', {
                  name: 'account',
                  frame: 'change'
                })
              "
            >
              {{ $t('CHANGE_PASSWORD') }}
            </button>
          </li>
          <li class="ca-account-settings__action">
            <button class="ca-account-settings__action-button">
              {{ $t('DELETE_ACCOUNT') }}
            </button>
          </li>
        </ul>
        <CaFeedback
          :constant="true"
          :message="$t('ACCOUNT_PERSONAL_INFO_REMOVAL')"
        />
      </template>
    </CaAccountSettingsBlock>
  </div>
</template>
<script>
// @group Organisms
// @vuese
// The settings for a users account<br><br>
// **SASS-path:** _./styles/components/organisms/ca-account-settings.scss_
export default {
  name: 'CaAccountSettings',
  mixins: [],
  props: {
    // The user object received from the API
    user: {
      type: Object,
      required: true
    },
    // What genders is available
    genders: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    saveUser(sectionRef) {
      // save user endpoint stuff
      sectionRef.toggleEditMode();
    }
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-account-settings';
</style>
