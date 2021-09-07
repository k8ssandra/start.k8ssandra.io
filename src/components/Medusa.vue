<template>
<div class="module medusa">
    <h2>Medusa</h2>
    <div>
        Enabled:
        <input type="checkbox" id="checkbox" v-model="enabled">
        <label for="checkbox"> {{ enabled }}</label>
    </div>
    <div v-if="enabled" class="settings">
        <h5>Medusa Option</h5>
        <div>
          <label>Provider</label><br />
          <select v-model="provider">
            <option v-for="(item, key) in providers" :key="key" >
                {{ item }}
            </option>
          </select> 
        </div>
        <div v-if="provider === 'S3'">
          <MedusaS3 />
          </div>
          <div v-else-if="provider === 'S3 Compatible'">
            <MedusaS3Compatible />
          </div>
          <div v-else-if="provider === 'Google Cloud Storage'">
            <MedusaGCS />
          </div>
          <div v-else-if="provider === 'Azure Blob Storage'">
            <MedusaABS />
          </div>
          <div v-else-if="provider === 'Local'">
            <MedusaLocal />
          </div>
    </div>
  </div>
</template>

<script>
import MedusaS3 from "./MedusaS3.vue";
import MedusaS3Compatible from "./MedusaS3Compatible.vue";
import MedusaGCS from "./MedusaGCS.vue";
import MedusaABS from "./MedusaABS.vue";
import MedusaLocal from "./MedusaLocal.vue";


export default {
  name: "Medusa",
  components: {
    MedusaS3,
    MedusaS3Compatible,
    MedusaGCS,
    MedusaABS,
    MedusaLocal
  },
  data() {
    return {
      providers: [
        "S3",
        "S3 Compatible",
        "Google Cloud Storage",
        "Azure Blob Storage",
        "Local",
      ],
    };
  },
  computed: {
    enabled: {
      get() {
        return this.$store.state.k8_config.medusa.active;
      },
      set(value) {
        this.$store.commit("updateMedusaEnabled", value);
      },
    },
    provider: {
      get() {
        return this.$store.state.k8_config.medusa.provider;
      },
      set(value) {
        this.$store.commit("updateMedusaProvider", value);
      },
    },
  },
};
</script>