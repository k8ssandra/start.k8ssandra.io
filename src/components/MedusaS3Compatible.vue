<template>
    <div>
        <h5>Medusa S3 Compatible</h5>
        <div>
            <label>Host</label><br />
            <input v-model="host" placeholder="Host Name">
        </div>
        <div>
            <label>Port</label><br />
            <input v-model.number="port" type="number">
        </div>
        <div>
            Secure Enabled:
            <input type="checkbox" id="checkbox" v-model="secure">
            <label for="checkbox"> {{ secure }}</label>
        </div>
    </div>
</template>

<script>
export default {
  name: "MedusaS3",
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