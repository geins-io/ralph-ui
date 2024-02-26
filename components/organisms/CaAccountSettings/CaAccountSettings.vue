<template>
  <div class="ca-account-settings">
    <CaAccountSettingsBlock
      v-if="$config.customerTypesToggle"
      ref="settingsAccount"
      :title="$t('ACCOUNT_ACCOUNT_SETTINGS_TITLE')"
      :loading="loading"
      @save="saveUser($refs.settingsAccount)"
    >
      <template #content="{ editMode }">
        <div
          v-if="editMode"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
        >
          <h3
            class="ca-account-settings__setting-label ca-account-settings__setting-label--edit"
          >
            {{ $t('LABEL_CUSTOMER_TYPE') }}
          </h3>
          <CaInputRadio
            v-for="(type, index) in customerTypes"
            :key="index"
            v-model="userData.customerType"
            :label="$t('CUSTOMER_TYPE_' + type.type)"
            :value="type.type"
          />
        </div>
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_CUSTOMER_TYPE') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ $t('CUSTOMER_TYPE_' + user.customerType) }} ({{
              getVatDisplay(currentUserType.vat)
            }})
          </p>
        </div>
      </template>
    </CaAccountSettingsBlock>
    <CaAccountSettingsBlock
      ref="settingsUser"
      :title="
        userIsOrganization
          ? $t('ACCOUNT_ORGANIZATION_INFO_TITLE')
          : $t('ACCOUNT_USER_INFO_TITLE')
      "
      :loading="loading"
      @save="saveUser($refs.settingsUser)"
    >
      <template #content="{ editMode }">
        <CaInputText
          v-if="editMode"
          id="email"
          v-model="userData.email"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :disabled="true"
          :label="$t('EMAIL')"
          type="email"
        />
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('EMAIL') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.email }}
          </p>
        </div>
        <CaInputText
          v-if="editMode && $config.checkout.identityNumber"
          id="personalId"
          v-model="userData.personalId"
          :required="false"
          :validate="userIsOrganization ? '' : 'personalId'"
          :error-message="$t('FEEDBACK_PERSONAL_ID_NOT_VALID')"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="
            userIsOrganization
              ? $t('LABEL_ORGANIZATION_ID')
              : $t('LABEL_PERSONAL_ID')
          "
        />
        <div
          v-else-if="$config.checkout.identityNumber"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{
              userIsOrganization
                ? $t('LABEL_ORGANIZATION_ID')
                : $t('LABEL_PERSONAL_ID')
            }}
          </h3>
          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.personalId,
            }"
          >
            {{ user.personalId || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
          </p>
        </div>

        <CaInputText
          v-if="editMode && userIsOrganization"
          id="company"
          v-model="userData.address.company"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_COMPANY')"
        />
        <div
          v-else-if="userIsOrganization"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_COMPANY') }}
          </h3>
          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.address.company,
            }"
          >
            {{ user.address.company || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
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
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_FIRST_NAME') }}
          </h3>
          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.address.firstName,
            }"
          >
            {{ user.address.firstName || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
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
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_LAST_NAME') }}
          </h3>
          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.address.lastName,
            }"
          >
            {{ user.address.lastName || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="phone"
          v-model="userData.address.mobile"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_PHONE_NUMBER')"
          type="tel"
        />
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_PHONE_NUMBER') }}
          </h3>

          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.address.mobile,
            }"
          >
            {{ user.address.mobile || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
          </p>
        </div>

        <div
          v-if="editMode && $config.user.gender"
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
            v-model="userData.gender"
            :label="gender.label"
            :value="gender.value"
          />
        </div>
        <div
          v-else-if="$config.user.gender"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_GENDER') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ genders.find((i) => i.value === user.gender).label }}
          </p>
        </div>
      </template>
    </CaAccountSettingsBlock>
    <CaAccountSettingsBlock
      ref="settingsAddress"
      :title="$t('ACCOUNT_BILLING_SHIPPING_TITLE')"
      :loading="loading"
      @save="saveUser($refs.settingsAddress)"
    >
      <template #content="{ editMode }">
        <CaInputText
          v-if="editMode"
          id="careOf"
          v-model="userData.address.careOf"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_CARE_OF')"
        />
        <div
          v-else-if="user.address.careOf"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_CARE_OF') }}
          </h3>
          <p class="ca-account-settings__setting-value">
            {{ user.address.careOf }}
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
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_ADDRESS') }}
          </h3>
          <p
            v-if="!user.address.addressLine1 && !user.address.addressLine2"
            class="ca-account-settings__setting-value ca-account-settings__setting-value--not-specified"
          >
            {{ $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
          </p>
          <p
            v-if="user.address.addressLine1"
            class="ca-account-settings__setting-value"
          >
            {{ user.address.addressLine1 }}
          </p>
          <p
            v-if="user.address.addressLine2"
            class="ca-account-settings__setting-value"
          >
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
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_ZIP') }}
          </h3>
          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.address.zip,
            }"
          >
            {{ user.address.zip || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
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
        <div v-else class="ca-account-settings__setting">
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_CITY') }}
          </h3>
          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.address.city,
            }"
          >
            {{ user.address.city || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
          </p>
        </div>

        <CaInputText
          v-if="editMode && $config.user.country"
          id="country"
          v-model="userData.address.country"
          :required="false"
          class="ca-account-settings__setting ca-account-settings__setting--edit"
          :label="$t('LABEL_COUNTRY')"
        />
        <div
          v-else-if="$config.user.country"
          class="ca-account-settings__setting"
        >
          <h3 class="ca-account-settings__setting-label">
            {{ $t('LABEL_COUNTRY') }}
          </h3>
          <p
            class="ca-account-settings__setting-value"
            :class="{
              'ca-account-settings__setting-value--not-specified':
                !user.address.country,
            }"
          >
            {{ user.address.country || $t('ACCOUNT_SETTING_NOT_SPECIFIED') }}
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
              type="button"
              class="ca-account-settings__action-button"
              @click="
                $store.commit('contentpanel/open', {
                  name: 'account',
                  frame: 'change',
                })
              "
            >
              {{ $t('CHANGE_PASSWORD') }}
            </button>
          </li>
          <li class="ca-account-settings__action">
            <button
              type="button"
              class="ca-account-settings__action-button"
              @click="triggerDeletePrompt"
            >
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
import updateUserMutation from 'user/update.graphql';
import deleteUserMutation from 'user/delete.graphql';
import MixFetch from 'MixFetch';
// @group Organisms
// @vuese
// The settings for a users account<br><br>
// **SASS-path:** _./styles/components/organisms/ca-account-settings.scss_
export default {
  name: 'CaAccountSettings',
  mixins: [MixFetch],
  props: {
    // The user object received from the API
    user: {
      type: Object,
      required: true,
    },
    // What genders is available
    genders: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    userData: {},
    loading: false,
  }),
  computed: {
    addressInput() {
      const address = this.userData?.address;
      if (address) {
        delete address.__typename;
      }
      return address;
    },
    customerTypes() {
      return this.$config.customerTypes;
    },
    currentUserType() {
      const type = this.$store.state.customerType;
      return this.customerTypes.find((i) => i.type === type);
    },
    userIsOrganization() {
      return this.currentUserType.type === 'ORGANIZATION';
    },
  },
  watch: {
    user() {
      this.userData = this.user;
    },
  },
  mounted() {
    this.userData = this.user;
  },
  methods: {
    // @vuese
    // Save the user data
    // @arg section (String)
    async saveUser(sectionRef) {
      this.loading = true;

      const variables = {
        user: {
          address: this.addressInput,
          gender: this.userData.gender,
          personalId: this.userData.personalId,
          customerType: this.userData.customerType,
        },
      };

      const callback = (result) => {
        this.loading = false;
        this.userData = result.data.updateUser;
        this.$store.dispatch('changeCustomerType', this.userData.customerType);
        this.$cookies.remove('ralph-user-type', { path: '/' });
        this.$store.dispatch(
          'setCustomerTypeCookie',
          this.userData.customerType,
        );

        this.$emit('save', this.userData);
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('ACCOUNT_SAVE_FEEDBACK'),
          placement: 'bottom-center',
          mode: 'success',
        });
        this.$nextTick(() => {
          sectionRef.toggleEditMode();
        });
      };

      const callbackError = () => {
        this.loading = false;
        this.callbackError();
      };

      await this.mutateData(
        updateUserMutation,
        callback,
        variables,
        callbackError,
      );
    },
    // @vuese
    // Trigger delete account prompt
    triggerDeletePrompt() {
      const modalSettings = {
        component: 'CaPrompt',
        componentProps: {
          title: this.$t('ACCOUNT_DELETE_PROMPT_TITLE'),
          text: this.$t('ACCOUNT_DELETE_PROMPT_TEXT'),
          button: {
            text: this.$t('ACCOUNT_DELETE_PROMPT_BUTTON'),
            color: 'primary',
            clickHandler: this.deleteAccount,
          },
        },
      };
      this.$store.commit('modal/open', modalSettings);
    },
    // @vuese
    // Delete the account
    async deleteAccount() {
      this.$ralphBus.$emit('close-modal');
      this.$store.dispatch('loading/start');

      const callback = async () => {
        await this.$store.dispatch('auth/logout');
        this.$router.push({ path: this.$getPath('index') });
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('ACCOUNT_DELETE_FEEDBACK'),
          placement: 'bottom-center',
          mode: 'success',
        });
        this.$store.dispatch('events/push', {
          type: 'user:delete',
        });
      };

      await this.mutateData(deleteUserMutation, callback);
    },
    // @vuese
    // Get label for toggle
    // @arg Boolean
    getVatDisplay(vat) {
      return vat ? this.$t('INC_VAT') : this.$t('EX_VAT');
    },
  },
};
</script>
<style lang="scss">
@import 'organisms/ca-account-settings';
</style>
