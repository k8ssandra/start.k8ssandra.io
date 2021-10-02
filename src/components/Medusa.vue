<template>
<div class="module medusa">
  <span class="module__pretitle">Medusa</span>
  <div class="module__heading">
    <h3>
      Backup & Restore
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              v-bind="attrs"
              v-on="on"
          >
            fa-question
          </v-icon>
        </template>
        <span>Medusa provides a mechanism for backing up and restoring your K8ssandra data in a simple manner to local or cloud object stores.</span>
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
      <div class="separator"></div>
        <h4>Backend</h4>
        <div>
          <label>Provider</label>
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
        <div v-if="provider">
          <div class="separator"></div>
          <div class="provider__details">
            <h4>{{ details[provider]['title'] }} Configuration</h4>
            <a class="provider__docs" :href="details[provider]['docs']" target="_blank">View Documentation<v-icon>fa-external-link-alt</v-icon></a>

              <div v-if="provider === 's3' || provider === 's3_compatible'" >
                <MedusaS3Region />
              </div>
              <div v-if="provider === 's3_compatible'">
                <MedusaS3Compatible />
              </div>
              <!-- <div v-if="provider === 'local'">
                 <MedusaLocal />
              </div> -->
              <div>
                <label>Bucket Name</label>
                <v-text-field
                    v-model="bucketName"
                    placeholder="Name"
                    hint="Bucket must already exist. K8ssandra will not provision this for you."
                    persistent-hint
                ></v-text-field>
              </div>
              <div>
                  <label>
                    Storage Secret
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                        >
                          fa-question-circle
                        </v-icon>
                      </template>
                      <span>{{ details[provider]['tooltip'] }} </span>
                    </v-tooltip>
                  </label>
                <v-text-field
                    v-model="storage_secret"
                    placeholder="Secret"
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
      details: {
        s3: {
          title: "S3",
          tooltip:
            "Kubernetes secret containing AWS CLI config file in the `medusa_s3_credentials` key. Note if you are using IAM roles attached to EC2 instances this secret must exist, but be empty. See the Medusa docs for the Medusa docs for more information.",
          docs: "https://github.com/thelastpickle/cassandra-medusa/blob/master/docs/aws_s3_setup.md",
        },
        s3_compatible: {
          title: "S3 Compatible",
          tooltip:
            "At this time when using IAM roles attached to EC2 secrets you MUST specify an empty secret here.",
          docs: "https://github.com/thelastpickle/cassandra-medusa/blob/master/docs/minio_setup.md",
        },
        google_storage: {
          title: "GCS",
          tooltip:
            "Kubernetes secret name containing a service account JSON file under the key `medusa_gcp_key.json`",
          docs: "https://github.com/thelastpickle/cassandra-medusa/blob/master/docs/gcs_setup.md",
        },
        azure_blobs: {
          title: "Azure Blob",
          tooltip:
            "Kubernetes secret containing Azure connection information in the key `medusa_azure_credentials.json`",
          docs: "https://github.com/thelastpickle/cassandra-medusa/blob/master/docs/azure_blobs_setup.md",
        },
      },
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
  .provider__details  {
    h4 {
      margin-bottom: 0px;
    }
  a.provider__docs, a.provider__docs .theme--light.v-icon {
    color: var(--color-brand-light-blue);
    font-size: 12px;
    line-height: 1;
  }
  .theme--light.v-icon {
    margin-left: 5px;
    text-decoration: none;
  }
}
}

.settings {
  margin-top: 40px;
}
</style>