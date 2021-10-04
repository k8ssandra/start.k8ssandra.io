<template>
        <div>
          <v-select
              v-model="region"
              :items="regions"
              single-line
              append-icon="fa-chevron-down"
              dense
              placeholder="Select"
          >
            <template v-slot:prepend>
              <label>Region</label>
            </template>
          </v-select>
        </div>
</template>

<script>
export default {
  name: "MedusaS3",
  data() {
    return {
      regions: ["us-east-2", "us-east-1",  "us-west-1",  "us-west-2",  "af-south-1",  "ap-east-1",  "ap-south-1",  "ap-northeast-3",  "ap-northeast-2",  "ap-southeast-1",  "ap-southeast-2",  "ap-northeast-1",  "ca-central-1",  "eu-central-1",  "eu-west-1",  "eu-west-2",  "eu-south-1",  "eu-west-3",  "eu-north-1",  "me-south-1",  "sa-east-1",  "us-gov-east-1",  "us-gov-west-1"],
    };
  },
  computed: {
    region: {
      get() {
        return this.$store.state.settings.config.medusa.storage_properties.region;
      },
      set(value) {
        this.$store.commit("updateMedusaS3Region", value);
      },
    },
  },
};
</script>