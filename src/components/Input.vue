<template>
  <div class="input">
    <h2>Configurations</h2>
    <div class="form_sections">
      <div class="cassandra">
        <h3>Cassandra</h3>
        <span>*Required Fields</span>
        <ClusterInfo />
        <Topology />
        <NodeConfig />
      </div>
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
const codec = require('json-url')('lzma');


export default {

  
  name: "Input",
    beforeMount: function() {
      this.fillForm()
  },
  methods: {
      fillForm() {
        let data = this.$route.query.data;
        if(data) {
        codec.decompress(data).then(json => { 
          this.$store.commit("buildSettings", json);
          })
        }
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
  .input {
    max-width: 400px;
    h2 {
      padding: 20px 30px;
      background: var(--color-blue-dark);
      color: var(--color-white);
      border-radius: 10px 10px 0 0;
      margin: 0;
    }
  }

.form_sections {
  max-width:1440px;
  margin: 0 auto;
  display:flex;
  justify-content: space-around;
  flex-flow:row wrap;
  & > div {
    background-color: var(--color-white);
    width:100%;
    margin-bottom:20px;
    padding: 30px;
  }
}
</style>

<style lang="scss">
  input {
    /*width: 100%;*/
    padding: 7px 14px;
    background: var(--color-white);
    border: 1px solid var(--color-grey-medium);
    font-size: 14px;
    line-height: 24px;
  }

  input[type="submit"],
  button {
    padding: 12px 24px;
    border: 0;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    font-size: 15px;
    margin-bottom: 15px;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
    color: var(--color-black);
    background-color: var(--color-red);
    border-radius: 3px;
    font-weight: 700;
    box-shadow: 4px 4px 0 0 var(--color-black);

    &:hover {
      background-color: var(--color-yellow);
      text-decoration: underline;
    }
  }
</style>
