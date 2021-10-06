<template>
  <div class="additionalSeeds">
    <label>Additional Seeds</label>
      <button v-if="!showForm" @click.prevent="toggleForm" class="toggle__seeds">Add Seed</button>
        <div v-if="showForm" class="seeds__form">
          <form v-on:submit.prevent="addAddSeed" class="seedadd">
            <v-text-field
                v-model="seedValue"
                placeholder="Seed name"
                minlength=3
            >
              <template v-slot:prepend>
                <label>Seed Name</label>
              </template>
            </v-text-field>
            <input type="submit"  value="Add Seed">
          </form>

          <ul class="seeds_list">
            <li class="seeds__seed" v-for="(seed, num) in seeds" :key="num">
              <div class="seed__primary">
                <span>{{ seed }}</span>
                <button @click.prevent="removeSeed(num)">
                  <v-icon
                  >
                    fa-times-circle
                  </v-icon>
                </button>
              </div>
            </li>
          </ul>
        </div>
  </div>
</template>

<script>
export default {
  name: "AdditionalSeeds",
  data() {
    return {
      seedValue: "",
      showForm: false,
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
      if (this.seeds.length < 1) {
        this.showForm = false;
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    }
  },
};
</script>

<style lang="scss" scoped>
.seeds_list {
  padding: 0;
  list-style: none;

  .seeds__seed {
    &:not(:last-of-type) {
      margin-bottom: 5px;
    }

    &:first-of-type {
      margin-top: 20px;
    }
  }
}

.seed__primary {
  display: flex;
  padding: 4px 10px;
  align-items: center;
  background: var(--color-white);

  span {
    font-size: 12px;
    flex-grow: 1;
    padding-right: 10px;
    word-break: break-word;
  }

  .v-text-field {
    margin-right: 15px;
  }

  button {
    margin-left: auto;
    line-height: 16px;
  }
}

input[type="submit"] {
  margin-top: 10px;
  width: 100%;
}

.v-icon.v-icon {
  font-size: 16px;
  color: var(--color-brand-red);
}

.seeds__form {
  padding: 20px;
  background: var(--color-grey-light);

  .v-text-field label {
    margin-top: 0;
  }

  &::v-deep .v-text-field .v-input__slot {
    border: 1px solid var(--color-white) !important;
  }
}
</style>