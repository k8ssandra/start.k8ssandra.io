<template>
    <div class="provider__details">
        <h4>Medusa Local</h4>
        <div>
            <label>Storage Class</label><br />
            <v-text-field
                v-model="storage_class"
                placeholder="Storage Class"
            ></v-text-field>
        </div>
        <div>
            <label>Size</label><br />
<!--            <input v-model.number="size" type="number">-->
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

      .v-input__prepend-outer,
      .v-input__append-outer {
        position: absolute;
        bottom: 0;
        margin: 0;
        font-size: 12px;
        line-height: 18px;
      }

      .v-input__slot {
        margin-bottom: 0;
      }

      .v-input__prepend-outer {
        left: 0;
      }

      .v-input__append-outer {
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
          width: auto !important;
          height: auto !important;
          padding: 5px 3px 3px;
          border-radius: 0;
          transform: translateY(-20%) translateY(-6px) translateX(-50%) rotate(0) !important;
          background: var(--color-brand-yellow) !important;
          border-color: var(--color-brand-yellow) !important;
          color: var(--color-brand-black);
          font-size: 16px;
          line-height: 1;

          > * {
              transform: rotate(0);
          }
      }
  }
</style>