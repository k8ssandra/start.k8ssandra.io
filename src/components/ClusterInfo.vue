<template>
  <div class="clusterInfo">
    <h4>Cluster Info</h4>
    <div>
      <v-text-field
          v-model="name"
          :rules="[rules.required, rules.name, rules.firstLetter, rules.lastLetter]"
          counter="153"
          placeholder="Instance Name"
      >
        <template v-slot:prepend>
          <label>Name*</label>
        </template>
      </v-text-field>
    </div>
    <div>
      <v-textarea
          v-model="description"
          placeholder="Instance Description"
          counter="150"
          no-resize
          rows="4"
      >
        <template v-slot:prepend>
          <label>Description</label>
        </template>
      </v-textarea>
    </div>
    <div>
      <v-select
          v-model="version"
          :items="cassandra_versions"
          append-icon="fa-chevron-down"
          dense
      >
        <template v-slot:prepend>
          <label>Version*</label>
        </template>
      </v-select>
    </div>
    <div class="auth">
      Authentication*
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
      rules: {
        required: (value) => !!value || "Required.",
        name: (value) => {
          const pattern = /^[a-zA-Z0-9_-]*$/;
          return (
            pattern.test(value) ||
            "Must only contain alphanumeric characters, dashes & underscores"
          );
        },
        firstLetter: (value) => {
          let char1 = value.charAt(0);
          const letterCheck = /^[a-zA-Z0-9]*$/;
          return (
            letterCheck.test(char1) || "First letter needs to be alpha numeric"
          );
        },
        lastLetter: (value) => {
          let charLast = value.charAt(value.length - 1);
          const letterCheck = /^[a-zA-Z0-9]*$/;
          return (
            letterCheck.test(charLast) ||
            "Last letter needs to be alpha numeric"
          );
        },
      },
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
.clusterInfo > div {
  margin-top: 20px;
}

.v-textarea {
  padding: 0;
  margin: 0;
}

.clusterInfo::v-deep {
  .v-counter::after {
    content: " Characters";
  }

  textarea {
    padding: 7px 14px;
    border: 2px solid var(--color-grey-medium);
    font-size: 14px;
    line-height: 24px;
    color: var(--color-brand-black);
  }

  .v-text-field > .v-input__control > .v-input__slot {
    &::before,
    &::after {
      content: none;
    }
  }
}

.auth {
  .v-input {
    margin-left: auto;
  }
}
</style>
