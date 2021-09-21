<template>
  <div class="input">
    <div class="form_sections">
      <ClusterInfo />
      <Topology />
      <NodeConfig />
      <Stargate />
      <Reaper />
      <Medusa />
      <Monitoring />
    </div>
      </div> 
</template>

<script>

import ClusterInfo from '@/components/ClusterInfo.vue';
import Topology from '@/components/Topology.vue';
import NodeConfig from '@/components/NodeConfig.vue';
import Stargate from '@/components/Stargate.vue';
import Reaper from '@/components/Reaper.vue';
import Medusa from '@/components/Medusa.vue';
import Monitoring from '@/components/Monitoring.vue';

// import fillform from '@/helpers/'

export default {
  name: "Input",
    beforeMount: function() {
      this.fillForm()
  },
  methods: {
      fillForm() {
        // CDnotes - THis is the method that reads the querystring - the keys will have to align - but the info coming through the $route.query can be passed through the Vuex mutation. 
        this.$store.commit("updateName", this.$route.query.name);
        this.$store.commit("updateDescription", this.$route.query.description);
    }
  },
  components: {
    ClusterInfo,
    Topology,
    NodeConfig,
    Stargate,
    Reaper,
    Medusa,
    Monitoring,
  }
};
</script>

<style lang="scss" scoped>
.form_sections {
  max-width:1440px;
  margin: 0 auto;
  display:flex;
  justify-content: space-around;
  flex-flow:row wrap;
  & > div {
    background-color:#eee;
    width:100%;
    margin-bottom:20px;
    margin-left: 10vw;
    margin-right:10vw;
  }
}
</style>


