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
          v-model="userData.address.email"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('EMAIL')"
        />
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">{{ $t('EMAIL') }}</h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.email }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="firstname"
          v-model="userData.address.firstName"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_FIRST_NAME')"
        />
        <div
          v-else-if="user.address.firstName"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_FIRST_NAME') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.firstName }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="lastname"
          v-model="userData.address.lastName"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_LAST_NAME')"
        />
        <div
          v-else-if="user.address.lastName"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_LAST_NAME') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.lastName }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="phone"
          v-model="userData.phone"
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

        <!-- <div
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
        </div> -->
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
          v-model="userData.address.co"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_CARE_OF')"
        />
        <div v-else-if="user.address.co" class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_CARE_OF') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.co }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="address"
          v-model="userData.address.addressLine1"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_ADDRESS')"
        />
        <CaInputText
          v-if="editMode"
          id="address2"
          v-model="userData.address.addressLine2"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_ADDRESS_2')"
        />
        <div
          v-else-if="user.address.addressLine1 || user.address.addressLine2"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_ADDRESS') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.addressLine1 }}
          </p>
          <p class="ca-account-settings__setting-value">
            {{ user.address.addressLine2 }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="zip"
          v-model="userData.address.zip"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_ZIP')"
        />
        <div v-else-if="user.address.zip" class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_ZIP') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.zip }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="city"
          v-model="userData.address.city"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_CITY')"
        />
        <div v-else-if="user.address.city" class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_CITY') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.city }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="country"
          v-model="userData.address.country"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_COUNTRY')"
        />
        <div
          v-else-if="user.address.country"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_COUNTRY') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.country }}
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
            v-model="userData.newsletter"
            :label="$t('YES')"
            :value="true"
          />
          <CaInputRadio
            v-model="userData.newsletter"
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
  data: () => ({
    userData: {}
  }),
  computed: {},
  watch: {},
  mounted() {
    this.userData = this.user;
  },
  methods: {
    saveUser(sectionRef) {
      // save user endpoint stuff
      this.$emit('save', this.userData);
      sectionRef.toggleEditMode();
    }
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-account-settings';
</style>
