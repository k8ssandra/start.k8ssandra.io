<template>
        <div class="racklist__container">
            <label>Racks (array) ** </label><br />
            <ul class="racklist__list">
              <li class="racklist__item" v-for="(rack, num) in racks" :key="num" >
                {{rack.name}}
              <button @click.prevent="removeRack(num)">x</button>
              </li>
              </ul>
              
              
              <form v-on:submit.prevent="addRack" class="rackadd">
                <input v-model="rackAddValue" placeholder="Name" minlength=3 type="text">
                <input type="submit"  value="add rack">
              </form>
        </div>
</template>


<script>
export default {
  name: "Racks",
  data() {
    return {
      rackAddValue: "",
    };
  },
  computed: {
    racks: {
      get() {
        return this.$store.state.config.cassandra.datacenters[0].racks;
      },
    },
  },
  methods: {
    addRack() {
      let rackName = this.rackAddValue;
      if (rackName.length >= 3) {
        this.$store.commit("addRack", rackName);
        this.$store.commit("updateTotalClusterSize");
        this.rackAddValue = "";
      } else {
        this.error;
      }
    },
    removeRack(num) {
      this.$store.commit("removeRack", num);
      this.$store.commit("updateTotalClusterSize");

    },
  },
};
</script>

<style lang="scss">
.rackadd {
  background: #ddd;
  margin: 20px;
  padding: 10px;
}

ul.racklist__list {
  padding-left: 0;
  margin: 5px 10px;
  & > li {
    display: flex;
    align-items: center;
    margin: 10px;
    justify-content: space-between;
    background-color: #ddd;
    padding: 10px;
    & > button {
      margin-left: 5px;
      height: 25px;
    }
  }
}
</style>