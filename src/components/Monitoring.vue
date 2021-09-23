<template>
<div class="module monitoring">
  <h2>Monitoring</h2>

  <div>
      Kube Prometheus Stack**:
      <input type="checkbox" id="checkbox" v-model="kube_prometheus">
      <label for="checkbox"> {{ kube_prometheus }}</label>
  </div>
      <div>
      Service Monitors**:
      <input type="checkbox" id="checkbox" v-model="service_monitors">
      <label for="checkbox"> {{ service_monitors }}11</label>
  </div>
      <div>
      Dashboards**:
      <input type="checkbox" id="checkbox" v-model="dashboards">
      <label for="checkbox"> {{ dashboards }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Monitoring",
  components: {},
  computed: {
    kube_prometheus: {
      get() {
        return this.$store.state.settings.config['kube-prometheus-stack'].enabled;
      },
      set(value) {
        this.$store.commit("updateMonitoringKubePrometheus", value);
      },
    },
    service_monitors: {
      get() {
        return this.$store.state.settings.config.monitoring.prometheus.provision_service_monitors;
      },
      set(value) {
        this.$store.commit("updateMonitoringServiceMonitors", value);
      },
    },
    dashboards: {
      get() {
        return this.$store.state.settings.config.monitoring.grafana.provision_dashboards;
      },
      set(value) {
        this.$store.commit("updateMonitoringDashboards", value);
      },
    },
  },
};
</script>