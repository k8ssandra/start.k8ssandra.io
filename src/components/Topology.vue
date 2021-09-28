<template>
    <div class="topology">
       <h4>Topology</h4>
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
            <label>Cluster Size (per-rack)</label><br />
            <v-slider
                min="0"
                max="100"
                v-model.number="cluster_size_per"
                thumb-label="always"
                track-color="#b2becd"
            >
              <template v-slot:prepend>
                0 GB
              </template>

              <template v-slot:append>
                100 GB
              </template>
            </v-slider>
        </div>
        <div>
          <span>Total Cluster Size: {{ cluster_size_total }}</span>
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

<style lang="scss" scoped>
  .topology > div {
    margin-top: 20px;

    &:last-of-type {
      margin: 0;
    }
  }

  span {
    font-size: 12px;
    line-height: 1.5;
    color: #6F7A87;
  }
</style>