<template>
<div class="module monitoring">
    <h2>Monitoring</h2>
    <div>
        Enabled:
        <input type="checkbox" id="checkbox" v-model="enabled">
        <label for="checkbox"> {{ enabled }}</label>
    </div>
    <div v-if="enabled" class="settings">
        <h5>Monitoring Option</h5>
    <div>
        Kube Prometheus Stack:
        <input type="checkbox" id="checkbox" v-model="kube_prometheus">
        <label for="checkbox"> {{ kube_prometheus }}</label>
    </div>
        <div>
        Service Monitors:
        <input type="checkbox" id="checkbox" v-model="service_monitors">
        <label for="checkbox"> {{ service_monitors }}</label>
    </div>
        <div>
        Dashboards:
        <input type="checkbox" id="checkbox" v-model="dashboards">
        <label for="checkbox"> {{ dashboards }}</label>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Monitoring",
  components: {},
  computed: {
    enabled: {
      get() {
        return this.$store.state.k8_config.monitoring.active;
      },
      set(value) {
        this.$store.commit("updateMonitoringEnabled", value);
      },
    },
    kube_prometheus: {
      get() {
        return this.$store.state.k8_config.monitoring.config.kube_prometheus_stack;
      },
      set(value) {
        this.$store.commit("updateMonitoringKubePrometheus", value);
      },
    },
    service_monitors: {
      get() {
        return this.$store.state.k8_config.monitoring.config.service_monitors;
      },
      set(value) {
        this.$store.commit("updateMonitoringServiceMonitors", value);
      },
    },
    dashboards: {
      get() {
        return this.$store.state.k8_config.monitoring.config.dashboards;
      },
      set(value) {
        this.$store.commit("updateMonitoringDashboards", value);
      },
    },
  },
};
</script>