<template>
        <div>
          <label>Region</label><br />
<!--          <select v-model="region">-->
<!--            <option v-for="(item, key) in regions" :key="key" >-->
<!--                {{ item }}-->
<!--            </option>-->
<!--          </select>-->
          <v-select
              v-model="region"
              :items="regions"
              single-line
              append-icon="fa-chevron-down"
          ></v-select>
        </div>
</template>

<script>
export default {
  name: "MedusaS3",
  data() {
    return {
      regions: ["eu-west-1", "us-east-1", "us-east-2", "us-west-1", "us-west-2", "af-south-1", "ap-south-1", "af-east-1"],
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