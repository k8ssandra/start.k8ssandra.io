<template>
  <div class="input">
    <h1>K8ssandra Configurator</h1>
    <div class="form_sections">
      <ClusterInfo />
      <Topology />
      <NodeConfig />
      <Stargate />
      <Reaper />
      <Medusa />
      <Monitoring />
      <ExportConfig />
    </div>
      </div> 
</template>

<script>

import ClusterInfo from '../components/ClusterInfo.vue';
import Topology from '../components/Topology.vue';
import NodeConfig from '../components/NodeConfig.vue';
import Stargate from '../components/Stargate.vue';
import Reaper from '../components/Reaper.vue';
import Medusa from '../components/Medusa.vue';
import Monitoring from '../components/Monitoring.vue';
import ExportConfig from '../components/ExportConfig.vue';


export default {
  name: "Input",
  components: {
    ClusterInfo,
    Topology,
    NodeConfig,
    Stargate,
    Reaper,
    Medusa,
    Monitoring,
    ExportConfig
  }
};
</script>

<style lang="scss">
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
  @media(min-width:600px) {
    width:48%;
  }
  @media(min-width:800px) {
    width:30%;
  }
  }
}
</style>


