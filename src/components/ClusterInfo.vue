<template>
  <div class="clusterInfo">
    <h2>Cluster Info</h2>
    <div>
      <label>Name*</label><br />
      <input v-model="name" placeholder="Instance Name">
    </div>
    <div>
      <label>Description</label><br />
      <textarea v-model="description" placeholder="Instance Description"></textarea>
    </div>
    <div>
      <label>Version*</label><br />
        <select v-model="version">
          <option v-for="(item, key) in cassandra_versions" :key="key" >
            {{ item }}
          </option>
        </select> 
  </div>
  <div>
    Authentication:
    <input type="checkbox" id="checkbox" v-model="authentication">
    <label for="checkbox"> {{ authentication }}</label>
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


