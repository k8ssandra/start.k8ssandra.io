<template>
    <div class="additionalSeeds">
        <label>Additional Seeds</label>
            <ul class="seeds_list">
              <li class="seeds__seed" v-for="(seed, num) in seeds" :key="num">
                  <div class="seed__primary">
                    <v-text-field
                        :value=seed
                        readonly
                    ></v-text-field>
                <button @click.prevent="removeSeed(num)">
                  <v-icon
                  >
                    fa-trash
                  </v-icon>
                </button>
                </div>
                  </li>
            </ul>
              <form v-on:submit.prevent="addAddSeed" class="seedadd">
                <v-text-field
                    v-model="seedValue"
                    placeholder="Seed name"
                    minlength=3
                ></v-text-field>
                <input type="submit"  value="Add Seed">
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
        return this.$store.state.settings.config.cassandra.cassandraLibDirVolume.additionalSeeds;
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
  padding: 0;
  list-style: none;
}

.seed__primary {
  display: flex;
  margin-bottom: 10px;
  align-items: center;

  .v-text-field {
    margin-right: 15px;
  }

  button {
    margin-right: 5px;
    margin-left: auto;
  }
}

input[type="submit"] {
  margin-top: 10px;
}

.v-icon.v-icon {
  font-size: 16px;
  color: var(--color-brand-light-blue);
}
</style>