<template>
    <div class="topology">
       <h4>
         Topology
         <v-tooltip right>
           <template v-slot:activator="{ on, attrs }">
             <v-icon
                 v-bind="attrs"
                 v-on="on"
             >
               fa-question
             </v-icon>
           </template>
           <span>Defining a topology of datacenters and racks allows K8ssandra to place data replicas across failure boundaries in your infrastructure.</span>
         </v-tooltip>
       </h4>
        <div>
            <label>DataCenters*</label>
            <v-text-field
                v-model="datacenter_name"
            ></v-text-field>
        </div>
        <Racks />
        <div>
            <label>
              Nodes Per Rack
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                      v-bind="attrs"
                      v-on="on"
                  >
                    far fa-question-circle
                  </v-icon>
                </template>
                <span>K8ssandra requires each rack contain the same number of nodes to prevent data imbalance.</span>
              </v-tooltip>
            </label>
            <v-slider
                min="1"
                max="100"
                v-model.number="cluster_size_per"
                thumb-label="always"
                track-color="#b2becd"
            >
            </v-slider>
        </div>
        <div>
          <span>{{ cluster_size_total }} Nodes Total</span>
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
      datacenters: ["dc1", "dc2", "dc3"],
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
      margin-top: 12px;
    }
  }

  span {
    font-size: 12px;
    line-height: 1.5;
    color: #6F7A87;
  }
</style>