<template>
    <div class="topology">
       <h2>Topology</h2>
        <div>
            <label>DataCenters*</label><br />
            <select v-model="datacenter_name">
            <option v-for="(item, key) in datacenters" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
        <Racks />
        <div>
            <label>Cluster Size( per-rack)</label><br />
            <input v-model.number="cluster_size_per" type="number" min="1" max="100">
        </div>
        <div>
          <h3>Total Cluster Size: {{ cluster_size_total }}</h3>
        </div>
    </div>
</template>


<script>
import Racks from "./Racks.vue";

export default {
  name: "Topology",
  components: {
    Racks,
  },
  data() {
    return {
      datacenters: ["", "dc1", "dc2", "dc3"],
    };
  },
  computed: {
    cluster_size_per: {
      get() {
        return this.$store.state.settings.k8_config.cluster_size_per;
      },
      set(value) {
        this.$store.commit("updateClusterSize", value);
        this.$store.commit ("updateTotalClusterSize");
      },
    },
    cluster_size_total: {
      get() {
        return this.$store.state.settings.config.cassandra.datacenters[0].size;
      }
    },
    datacenter_name: {
      get() {
        return this.$store.state.settings.config.cassandra.datacenters[0].name;
      },
      set(value) {
        this.$store.commit("updateDataCenterName", value);
      },
    },
  },
};
</script>

<style lang="scss">
</style>