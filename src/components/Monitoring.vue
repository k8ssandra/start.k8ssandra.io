<template>
<div class="module monitoring">
  <h3>Monitoring</h3>

  <div>
      <label>
        Kube Prometheus Stack*
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-bind="attrs"
                v-on="on"
            >
              far fa-question-circle
            </v-icon>
          </template>
          <span>Deploy the prometheus-community/kube-prometheus-stack Helm chart alongside K8ssandra.</span>
        </v-tooltip>
      </label>
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
      <label>
        Service Monitors*
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-bind="attrs"
                v-on="on"
            >
              far fa-question-circle
            </v-icon>
          </template>
          <span>Deploy prometheus-operator ServiceMonitor Custom Resources for monitoring the K8ssandra cluster.</span>
        </v-tooltip>
      </label>
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
      <label>
        Dashboards
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-bind="attrs"
                v-on="on"
            >
              far fa-question-circle
            </v-icon>
          </template>
          <span>Deploy preconfigured Grafana Dashboards via Kubernetes ConfigMap objects.</span>
        </v-tooltip>
      </label>
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

    @media screen and (max-width: 480px) {
      padding: 10px;

      .v-tooltip + .v-icon.v-icon {
        margin-left: 4px;
      }
    }

    @media screen and (max-width: 420px) {
      .v-tooltip + .v-icon.v-icon {
        display: flex;
        margin-top: 4px;
        margin-left: 0;
        justify-content: flex-start;
      }
    }

    .v-input {
      margin-left: auto;
    }

    label {
      margin: 0;
      padding-right: 20px;
      display: flex;
      align-items: center;

      @media screen and (max-width: 480px) {
        padding-right: 5px;
      }

      @media screen and (max-width: 420px) {
        display: block;
      }
    }
  }
</style>