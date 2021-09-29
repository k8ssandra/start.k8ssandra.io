<template>
<div class="module reaper">
    <div class="module__heading">
        <h3>
          Reaper
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                  v-bind="attrs"
                  v-on="on"
              >
                fa-question
              </v-icon>
            </template>
            <span>Reaper tooltip text</span>
          </v-tooltip>
        </h3>
        <div>
    <!--        <input type="checkbox" id="checkbox" v-model="enabled">-->
    <!--        <label for="checkbox"> {{ enabled }}</label>-->
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