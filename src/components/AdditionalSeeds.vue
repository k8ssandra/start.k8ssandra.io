<template>
    <div class="additionalSeeds">
        <label>Additional Seeds</label>
            <ul class="seeds_list">
              <li class="seeds__seed" v-for="(seed, num) in seeds" :key="num">
                  <div class="seed__primary">
                      {{seed}}
                <button @click.prevent="removeSeed(num)">x</button>
                </div>
                  </li>
            </ul>
              <form v-on:submit.prevent="addAddSeed" class="seedadd">
                <v-text-field
                    v-model="seedValue"
                    placeholder="Seed name"
                    minlength=3
                ></v-text-field>
                <input type="submit"  value="add">
              </form>    </div>
</template>

<script>
export default {
  name: "AdditionalSeeds",
  data() {
    return {
      seedValue: "",
    };
  },
  computed: {
    seeds: {
      get() {
        return this.$store.state.settings.config.cassandra.cassandraLibDirVolume
          .additionalSeeds;
      },
    },
  },
  methods: {
    addAddSeed() {
      let seedName = this.seedValue;
      if (seedName.length >= 3) {
        this.$store.commit("addAddSeed", seedName);
        this.seedValue = "";
      } else {
        this.error;
      }
    },
    removeSeed(num) {
      this.$store.commit("removeSeed", num);
    },
  },
};
</script>

<style lang="scss" scoped>
.seeds_list {
  list-style: none;
}
</style>