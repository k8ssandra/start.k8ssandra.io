<template>
  <div class="input">
    <h1>K8ssandra Configurator</h1>
    <div class="form_sections">
      <ClusterInfo />
      <Topology />
      <NodeConfig />
      <Stargate />
    </div>
      </div> 
</template>

<script>

import ClusterInfo from '../components/ClusterInfo.vue';
import Topology from '../components/Topology.vue';
import NodeConfig from '../components/NodeConfig.vue';
import Stargate from '../components/Stargate.vue';


export default {
  name: "Input",
  components: {
    ClusterInfo,
    Topology,
    NodeConfig,
    Stargate
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
    width: 30%;
    min-width:300px;
    margin-bottom:20px;
    background-color:#eee;
  }
}
</style>


