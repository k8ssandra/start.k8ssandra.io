<template>
<div class="module monitoring">
  <h3>Monitoring</h3>

  <div>
      Kube Prometheus Stack
<!--      <input type="checkbox" id="checkbox" v-model="kube_prometheus">-->
<!--      <label for="checkbox"> {{ kube_prometheus }}</label>-->
      <v-switch
          v-model="kube_prometheus"
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
  <div>
      Service Monitors
<!--      <input type="checkbox" id="checkbox" v-model="service_monitors">-->
<!--      <label for="checkbox"> {{ service_monitors }}</label>-->
      <v-switch
          v-model="service_monitors"
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
  <div>
      Dashboards
<!--      <input type="checkbox" id="checkbox" v-model="dashboards">-->
<!--      <label for="checkbox"> {{ dashboards }}</label>-->
      <v-switch
          v-model="dashboards"
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

<style lang="scss" scoped>
  .monitoring > div {
    margin-top: 30px;
    display: flex;
    align-items: center;
    background: var(--color-grey-light);
    padding: 20px;
    font-size: 14px;
    font-weight: 700;

    .v-input {
      margin-left: auto;
    }
  }
</style>