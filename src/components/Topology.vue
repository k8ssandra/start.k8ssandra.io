<template>
    <div class="topology">
       <h2>Topology</h2>
        <div>
            <label>Cluster Size</label><br />
            <input v-model.number="cluster_size" type="number">
        </div>
        <h5>DataCenters</h5>
        <div>
            <label>Name</label><br />
            <select v-model="datacenter_name">
            <option v-for="(item, key) in datacenters" :key="key" >
                {{ item }}
            </option>
            </select> 
        </div>
        <div>
            <label>Racks (array) </label><br />
        </div>
    </div>
</template>


<script>
export default {
  name: "Topology",
  components: {},
  data() {
    return {
        datacenters: [
            "datacenter1", "datacenter2", "datacenter3"
        ]
    };
  },
  computed: {
    cluster_size: {
      get() {
        return this.$store.state.k8_config.cluster_size;
      },
      set(value) {
        this.$store.commit("updateClusterSize", value);
      },
    },
    datacenter_name: {
      get() {
        return this.$store.state.k8_config.datacenters[0].name;
      },
      set(value) {
        this.$store.commit("updateDataCenterName", value);
      },
    },
  },
  methods: {},
};
</script>