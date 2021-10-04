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

  @media screen and (max-width: 992px) {
    max-width: 600px;
    margin: 0 auto;
  }

  h2 {
    padding: 20px 30px;
    background: var(--color-brand-dark-blue);
    color: var(--color-white);
    border-radius: 10px 10px 0 0;
    margin: 0;

    @media screen and (max-width: 768px) {
      padding: 20px;
    }
  }

  h3 {
    display: flex;
    align-items: center;
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

    .v-text-field {
      margin-top: 0;
      padding-top: 0;
      flex-wrap: wrap;

      &:not(.v-textarea) .v-input__slot {
        border: 2px solid var(--color-grey-medium);
      }

      .v-input__prepend-outer {
        margin: 0;
      }
    }

    .v-input__slot {
      margin-bottom: 0;
    }

    .v-text-field__details {
      flex-direction: column;
      min-height: initial;
    }

    .v-text-field__suffix {
      color: var(--color-grey-dark);
    }

    .rackadd .v-text-field:not(.v-textarea) .v-input__slot {
      border: 0;
    }

    .v-text-field__suffix {
      padding-right: 14px;
    }

    .v-text-field .v-counter {
      color: var(--color-grey-dark) !important;
    }

    .v-text-field .v-counter,
    .v-messages__message {
      color: var(--color-grey-dark);
      order: -1;
      margin: 8px 0 0;
    }

    .v-text-field.v-input--has-state.error--text {
      .v-input__control > .v-text-field__details > .v-counter {
        color: var(--color-grey-dark);
      }

      .v-messages__message {
        color: var(--color-brand-red);
        font-style: italic;
      }

      .v-input__slot {
        border-color: rgba(249, 48, 93, .6);
      }
    }

    select {
      width: 100%;
      padding: 7px 14px;
      border: 2px solid var(--color-grey-medium);
    }

    .v-select__selection {
      font-size: 14px;
    }

    .v-select__selections,
    .v-select__slot input {
      padding-left: 14px;

      + .v-input__append-inner {
        margin-top: 7px;
        margin-right: 6px;

        .v-icon {
          font-size: 16px;
          line-height: 1;
          color: #0097FF;
        }
      }
    }

    .v-input__slider {
      position: relative;
      margin-top: 32px;

      .v-slider--horizontal {
        margin: 0;
      }

      .v-input__prepend-outer,
      .v-input__append-outer {
        position: absolute;
        bottom: 0;
        margin: 0;
        font-size: 12px;
        line-height: 18px;
      }

      .v-input__slot {
        margin-bottom: 0;
        padding-bottom: 10px;
      }

      .v-input__prepend-outer {
        left: 0;
      }

      .v-input__append-outer {
        right: 0;
      }

      .theme--light.v-slider .v-slider__track-fill {
        background: var(--color-brand-yellow) !important;
      }

      .v-slider__track-background {
        width: 100%;
      }

      .v-slider__thumb-container {
        color: var(--color-brand-light-blue) !important;
        caret-color: var(--color-brand-light-blue) !important;
      }

      .v-slider--horizontal .v-slider__thumb-label {
        width: auto !important;
        height: auto !important;
        padding: 5px 3px 3px;
        border-radius: 0;
        transform: translateY(-20%) translateY(-8px) translateX(-50%) rotate(0) !important;
        background: var(--color-brand-yellow) !important;
        border-color: var(--color-brand-yellow) !important;
        color: var(--color-brand-black);
        font-size: 16px;
        line-height: 1;

        > * {
          transform: rotate(0);
        }
      }
    }

    .v-input--switch {
      &.v-input {
        align-items: center;
      }

      &.v-input--selection-controls {
        margin-top: 0;

        > .v-input__append-outer {
          margin: 0 0 0 6px;
        }

        > .v-input__prepend-outer {
          margin: 0 14px 0 0;
        }
      }

      .v-input__append-outer,
      .v-input__prepend-outer {
        font-size: 12px;
        font-weight: 400;
        color: var(--color-brand-black);
      }

      .v-input__slot {
        margin: 0;
      }

      .v-input--selection-controls__ripple {
        display: none;
      }

      .v-input--switch__track.theme--light {
        background: var(--color-grey-medium) !important;
        color: var(--color-grey-medium) !important;
        opacity: 1;

        &.primary--text {
          background: var(--color-brand-black) !important;
        }
      }

      .v-input--switch__thumb.theme--light {
        color: var(--color-brand-black) !important;

        &.primary--text {
          color: var(--color-brand-yellow) !important;
        }
      }

      .v-messages {
        min-height: initial;
      }

      &.v-input--switch--inset .v-input--switch__track,
      &.v-input--switch--inset .v-input--selection-controls__input {
        margin: 0;
      }
    }

    h4 {
      margin-top: 30px;
    }

    label {
      display: flex;
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 1;
      font-weight: 700;
      color: var(--color-brand-black);
    }

    .error--text label {
      color: var(--color-brand-red);
    }

    .rackadd > label {
      color: var(--color-white);
    }

    .provider__secure,
    .rackadd {
      label {
        margin-top: 0;
      }
    }

    .provider__secure label {
      margin-bottom: 0;
    }

    .module__heading {
      display: flex;
      align-items: center;

      h3 {
        padding-right: 60px;

        @media screen and (max-width: 768px) {
          padding-right: 5px;
        }
      }

      > div {
        margin-top: 0;
        margin-left: auto;
      }
    }

    .module__pretitle {
      font-size: 10px;
      text-transform: uppercase;
      text-decoration: underline;
      letter-spacing: 1.43px;
    }

    .v-text-field > .v-input__control > .v-input__slot::before,
    .v-text-field > .v-input__control > .v-input__slot::after {
      content: none;
    }

    .v-messages {
      min-height: initial;
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

    @media screen and (max-width: 768px) {
      padding: 20px;
    }
  }
}
</style>
