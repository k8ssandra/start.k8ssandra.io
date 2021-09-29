<template>
  <div class="input">
    <h2>Configurations</h2>
    <div class="form_sections">
      <div class="cassandra">
        <h3>Cassandra</h3>
        <span>*Required Fields</span>
        <div class="separator"></div>
        <ClusterInfo />
        <div class="separator"></div>
        <Topology />
        <div class="separator"></div>
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
    background: var(--color-brand-dark-blue);
    color: var(--color-white);
    border-radius: 10px 10px 0 0;
    margin: 0;
  }

  &::v-deep {
    input:not([type="submit"], [type="checkbox"]) {
      width: 100%;
      padding: 7px 14px;
      background: var(--color-white);
      font-size: 14px;
      line-height: 24px;
      max-height: none;
    }

    .v-text-field:not(.v-textarea) .v-input__slot {
      border: 2px solid var(--color-grey-medium);
    }

    .rackadd .v-text-field:not(.v-textarea) .v-input__slot {
      border: 0;
    }

    .v-text-field__suffix {
      padding-right: 14px;
    }

    select {
      width: 100%;
      padding: 7px 14px;
      border: 2px solid var(--color-grey-medium);
    }

    .v-select__selections {
      padding-left: 14px;
    }

    h4 {
      margin-top: 30px;
    }

    label {
      margin-top: 20px;
      font-size: 14px;
      line-height: 1;
      font-weight: 700;
    }

    .provider__secure label {
      margin-top: 0;
    }

    .module__heading {
      display: flex;

      > div {
        margin-top: 0;
        margin-left: auto;
      }
    }

    .v-text-field > .v-input__control > .v-input__slot::before,
    .v-text-field > .v-input__control > .v-input__slot::after {
      content: none;
    }
  }
}

span {
  font-size: 12px;
  line-height: 18px;
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
