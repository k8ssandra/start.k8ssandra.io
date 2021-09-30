<template>
<div class="module medusa">
    <div class="module__heading">
    <h3>
      Medusa
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              v-bind="attrs"
              v-on="on"
          >
            fa-question
          </v-icon>
        </template>
        <span>Medusa tooltip text</span>
      </v-tooltip>
    </h3>
      <div>
          <v-switch
              v-model="enabled"
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
    <div v-if="enabled" class="settings">
        <h4>Medusa Option</h4>
        <div>
          <label>Provider</label><br />
<!--          <select v-model="provider">-->
<!--            <option v-for="(item, key) in providers" :key="key" >-->
<!--                {{ item }}-->
<!--            </option>-->
<!--          </select>-->
          <v-select
              v-model="provider"
              :items="providers"
              single-line
              append-icon="fa-chevron-down"
          ></v-select>
        </div>
        <div v-show="provider">
          <div class="separator"></div>
        <div v-if="provider === 's3' || provider === 's3_compatible'" >
          <MedusaS3Region />
          </div>
        <div v-if="provider === 's3_compatible'">
          <MedusaS3Compatible />
        </div>
          <!-- <div v-if="provider === 'local'">
             <MedusaLocal />
          </div> -->
          <div v-else class="provider__details">
              <div>
                <label>Bucket Name</label><br />
                <v-text-field
                    v-model="bucketName"
                    placeholder="Bucket Name"
                ></v-text-field>
              </div>
              <div>
                  <label>Storage Secret</label><br />
                <v-text-field
                    v-model="storage_secret"
                    placeholder="must follow k8s naming rules"
                ></v-text-field>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import MedusaS3Region from "./MedusaS3Region.vue";
import MedusaS3Compatible from "./MedusaS3Compatible.vue";
// import MedusaLocal from "./MedusaLocal.vue";

export default {
  name: "Medusa",
  components: {
    MedusaS3Region,
    MedusaS3Compatible,
    // MedusaLocal,
  },
  data() {
    return {
      providers: [
        "s3",
        "s3_compatible",
        "google_storage",
        "azure_blobs",
        // "local",
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

<style lang="scss" scoped>
  .medusa {
    h4 {
      margin-bottom: 20px;
    }

    &::v-deep {
      .provider__details > div,
      .settings > div {
        margin-top: 20px;
      }
    }
  }
</style>