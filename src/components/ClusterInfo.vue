<template>
  <div class="clusterInfo">
    <h4>Cluster Info</h4>
    <div>
      <label>Name*</label><br />
      <input v-model="name" placeholder="Instance Name">
    </div>
    <div>
      <label>Description**</label><br />
      <textarea v-model="description" placeholder="Instance Description"></textarea>
    </div>
    <div>
      <label>Version</label><br />
        <select v-model="version">
          <option v-for="(item, key) in cassandra_versions" :key="key" >
            {{ item }}
          </option>
        </select> 
    </div>
    <div class="auth">
      Authentication**:
<!--      <input type="checkbox" id="checkbox" v-model="authentication">-->
<!--      <label for="checkbox"> {{ authentication }}</label>-->
      <v-switch
        v-model="authentication"
        inset
      >
        <template v-slot:prepend>
          False
        </template>
        <template v-slot:append>
          True
        </template>
      </v-switch>
    </div>
  </div> 
</template>

<script>
export default {
  name: "ClusterInfo",
  components: {},
  data() {
    return {
      cassandra_versions: ["4.0.0", "3.11.10", "3.11.9", "3.11.8", "3.11.7"],
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.state.settings.config.cassandra.clusterName;
      },
      set(value) {
        this.$store.commit("updateName", value);
      },
    },
    description: {
      get() {
        return this.$store.state.settings.k8_config.description;
      },
      set(value) {
        this.$store.commit("updateDescription", value);
      },
    },
    version: {
      get() {
        return this.$store.state.settings.config.cassandra.version;
      },
      set(value) {
        this.$store.commit("updateVersion", value);
      },
    },
    authentication: {
      get() {
        return this.$store.state.settings.config.cassandra.auth.enabled;
      },
      set(value) {
        this.$store.commit("updateAuthentication", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .auth {
    display: flex;
    align-items: center;
    background: var(--color-grey-light);
    padding: 20px;
    font-size: 14px;
    font-weight: 700;
  }
</style>

<style lang="scss">
  // TODO: Clean up and move to proper scope
  .v-input--switch {
    &.v-input {
      align-items: center;
    }

    &.v-input--selection-controls {
      margin: 0;
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
      color: var(--color-brand-yellow);
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
  }
</style>
