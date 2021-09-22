<template>
    <div class="additionalSeeds">
        <h5>Additional Seeds</h5>
            <ul class="seeds_list">
              <li class="seeds__seed" v-for="(seed, num) in seeds" :key="num">
                  <div class="seed__primary">
                  <h4 class="seeds__seedtitle">{{seed}}</h4>
                  <!-- <button @click.prevent="removeSeed(num)">x</button> -->
                </div>
                  </li>
            </ul>
                  
                          <button @click.prevent="addAddSeed">Add Seed</button>
    </div>
</template>

<script>
export default {
  name: "AdditionalSeeds",
  computed: {
    seeds: {
      get() {
        return this.$store.state.settings.config.cassandra.cassandraLibDirVolume.additionalSeeds;
      },

    },
  },
  methods: {
    addAddSeed() {
        this.$store.commit("addAddSeed");

    },
  },
};
</script>