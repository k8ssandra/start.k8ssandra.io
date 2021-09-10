<template>
    <div>
        <h5>Medusa S3 Compatible</h5>
        <div>
          <label>Region</label><br />
          <select v-model="region">
            <option v-for="(item, key) in regions" :key="key" >
                {{ item }}
            </option>
          </select> 
        </div>
        <div>
            <label>Host</label><br />
            <input v-model="host" placeholder="Host Name">
        </div>
        <div>
            <label>Port</label><br />
            <input v-model.number="port" type="number">
        </div>
        <div>
            Enabled:
            <input type="checkbox" id="checkbox" v-model="secure">
            <label for="checkbox"> {{ secure }}</label>
        </div>
        <div>
            <label>Bucket Name</label><br />
            <input v-model="name" placeholder="Bucket Name">
        </div>
        <div>
            <label>Storage Secret</label><br />
            <input v-model="storage_secret" placeholder="must follow k8s naming rules">
        </div>
    </div>
</template>

<script>
export default {
  name: "MedusaS3",
  data() {
    return {
      regions: ["region1", "region2", "region3", "region4"],
    };
  },
  computed: {
    region: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3_compatible.config.region;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatibleRegion", value);
      },
    },
    host: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3_compatible.config.host;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatibleHost", value);
      },
    },
    port: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3_compatible.config.port;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatiblePort", value);
      },
    },
    secure: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3_compatible.config.secure;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatibleSecure", value);
      },
    },
    name: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3_compatible.config.bucket_name;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatibleName", value);
      },
    },
    storage_secret: {
      get() {
        return this.$store.state.k8_config.medusa.provider_s3_compatible.config.secret;
      },
      set(value) {
        this.$store.commit("updateMedusaS3CompatibleStorageSecret", value);
      },
    },
  },
};
</script>