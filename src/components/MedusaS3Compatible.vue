<template>
    <div class="provider__details">
        <div>
            <label>Host</label>
            <v-text-field
                v-model="host"
                placeholder="Host Name"
            ></v-text-field>
        </div>
        <div>
            <label>Port</label>
            <v-text-field
                v-model="port"
                :rules="[rules.number]"
                persistent-hint
            ></v-text-field>
        </div>
        <div class="provider__secure">
            <label>Secure</label>
            <v-switch
                v-model="secure"
                inset
            >
                <template v-slot:prepend>
                    False
                </template>
                <template v-slot:append>
                    True
                </template>
            </v-switch>
        </div>
    </div>
</template>

<script>
export default {
  name: "MedusaS3",
  data() {
    return {
      rules: {
        number: (value) => {
          const pattern = /^[0-9]*$/;
          return (
            pattern.test(value) || "Must contain integers only"
          );
        }
      }
    }
  },
  computed: {
    host: {
      get() {
        return this.$store.state.settings.config.medusa.storage_properties.host;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatibleHost", value);
      },
    },
    port: {
      get() {
        return this.$store.state.settings.config.medusa.storage_properties.port;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatiblePort", value);
      },
    },
    secure: {
      get() {
        return this.$store.state.settings.config.medusa.storage_properties.secure;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatibleSecure", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.provider__secure {
  .v-input--selection-controls {
    margin-left: auto;
    padding: 0;
  }
}
</style>