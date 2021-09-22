<template>
<div class="module medusa">
    <h2>Medusa</h2>
    <div>
        Enabled**:
        <input type="checkbox" id="checkbox" v-model="enabled">
        <label for="checkbox"> {{ enabled }}</label>
    </div>
    <div v-if="enabled" class="settings">
        <h5>Medusa Option</h5>
        <div>
          <label>Provider**</label><br />
          <select v-model="provider">
            <option v-for="(item, key) in providers" :key="key" >
                {{ item }}
            </option>
          </select> 
        </div>
        <div v-show="provider">
        <div v-if="provider === 's3' || provider === 's3_compatible'" >
          <MedusaS3Region />
          </div>
        <div v-if="provider === 's3_compatible'">
          <MedusaS3Compatible />
        </div>
          <div v-if="provider === 'local'">
             <MedusaLocal />
          </div>
          <div v-else>
                          <div>
                <label>Bucket Name</label><br />
                <input v-model="bucketName" placeholder="Bucket Name">
              </div>
              <div>
                  <label>Storage Secret</label><br />
                  <input v-model="storage_secret" placeholder="must follow k8s naming rules">
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import MedusaS3Region from "./MedusaS3Region.vue";
import MedusaS3Compatible from "./MedusaS3Compatible.vue";
import MedusaLocal from "./MedusaLocal.vue";

export default {
  name: "Medusa",
  components: {
    MedusaS3Region,
    MedusaS3Compatible,
    MedusaLocal,
  },
  data() {
    return {
      providers: [
        "s3",
        "s3_compatible",
        "google_storage",
        "azure_blobs",
        "local",
      ],
    };
  },
  computed: {
    enabled: {
      get() {
        return this.$store.state.settings.config.medusa.enabled;
      },
      set(value) {
        this.$store.commit("updateMedusaEnabled", value);
      },
    },
    provider: {
      get() {
        return this.$store.state.settings.config.medusa.storage;
      },
      set(value) {
        this.$store.commit("updateMedusaProvider", value);
      },
    },
    bucketName: {
      get() {
        return this.$store.state.settings.config.medusa.bucketName;
      },
      set(value) {
        this.$store.commit("updateMedusaBucketName", value);
      },
    },
    storage_secret: {
      get() {
        return this.$store.state.settings.config.medusa.storageSecret;
      },
      set(value) {
        this.$store.commit("updateMedusaStorageSecret", value);
      },
    },
  },
};
</script>