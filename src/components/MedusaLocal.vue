<template>
    <div class="provider__details">
        <h4>Medusa Local</h4>
        <div>
            <label>Storage Class</label>
            <v-text-field
                v-model="storage_class"
                placeholder="Storage Class"
            ></v-text-field>
        </div>
        <div>
            <label>Size</label>
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
