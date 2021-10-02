<template>
<div class="module reaper">
  <span class="module__pretitle">Reaper</span>
  <div class="module__heading">
        <h3>
          Repair
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  v-bind="attrs"
                  v-on="on"
              >
                fa-question
              </v-icon>
            </template>
            <span>Reaper provides an out of band anti-entropy mechanism for K8ssandra. It handles the periodic scheduling and execution of repair tasks keeping your data updated across replicas in case of failure.</span>
          </v-tooltip>
        </h3>
        <div>
            <v-switch
                v-model="enabled"
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
  </div>
</template>

<script>
export default {
  name: "Reaper",
  computed: {
    enabled: {
      get() {
        return this.$store.state.settings.config.reaper.enabled;
      },
      set(value) {
        this.$store.commit("updateReaperEnabled", value);
      },
    },
  },
};
</script>