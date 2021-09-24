<template>
    <div>
        <h5>Medusa Local</h5>
        <div>
            <label>Storage Class</label><br />
            <input v-model="storage_class" placeholder="Storage Class">
        </div>
        <div>
            <label>Size</label><br />
            <input v-model.number="size" type="number">
            <v-slider
                hint="X Clusters total"
                min="0"
                max="100"
                v-model.number="size"
                thumb-label="always"
                track-color="#b2becd"
            >
                <template v-slot:prepend>
                    0 GB
                </template>

                <template v-slot:append>
                    100 GB
                </template>
            </v-slider>
        </div>
    </div>
</template>

<script>
export default {
  name: "MedusaLocal",
  computed: {
    storage_class: {
      get() {
        return this.$store.state.settings.config.medusa.storageClass;
      },
      set(value) {
        this.$store.commit("updateMedusaLocalClass", value);
      },
    },
    size: {
      get() {
        return this.$store.state.settings.config.medusa.size;
      },
      set(value) {
        this.$store.commit("updateMedusaLocalSize", value);
      },
    },
  },
};
</script>


<style lang="scss">
//TODO: Clean up and move to proper scope
  .v-input__slider {
    position: relative;

      .v-slider--horizontal {
        margin: 0;
      }

      .v-input__prepend-outer {
        position: absolute;
        bottom: 0;
        left: 0;
      }

      .v-input__append-outer {
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .theme--light.v-slider .v-slider__track-fill {
          background: var(--color-brand-yellow) !important;
      }

      .v-slider__thumb-container {
          color: var(--color-brand-light-blue) !important;
          caret-color: var(--color-brand-light-blue) !important;
      }

      .v-slider--horizontal .v-slider__thumb-label {
          border-radius: 0;
          transform: translateY(-20%) translateY(-12px) translateX(-50%) rotate(0) !important;
          background: var(--color-brand-yellow) !important;
          border-color: var(--color-brand-yellow) !important;
          color: var(--color-brand-black);

          > * {
              transform: rotate(0);
          }
      }
  }
</style>