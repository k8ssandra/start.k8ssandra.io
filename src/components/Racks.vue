<template>
        <div class="racklist__container">
            <label>Racks (array) ** </label><br />
            <ul class="racklist__list">
              <li class="racklist__item" v-for="(rack, num) in racks" :key="num">
                <div class="racklist__primary">
                  <h4 class="racklist__racktitle">{{rack.name}}</h4>
                  <button @click.prevent="removeRack(num)">x</button>
                </div>
                <div class="racklist__nodes">
                      <ul class="racklist__nodelist">
                        <li v-for="(node, num) in rack.affinityLabels" class="racklist_node" :key="num" >
                          {{ node }}
                        </li>
                      </ul>
                    <form v-on:submit.prevent="addNode(num)" class="rackadd">
                      <input v-model="nodeLabelValue" placeholder="Label" minlength=3 type="text">
                      <input v-model="nodeValueValue" placeholder="value" minlength=3 type="text">
                      <input type="submit"  value="add">
                    </form>                </div>
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
      nodeLabelValue: "",
      nodeValueValue: "",
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
    addNode(num) {
      let nodeLabel = this.nodeLabelValue;
      let nodeValue = this.nodeValueValue;
      this.$store.commit("addNode", { num, nodeLabel, nodeValue });
      this.nodeLabelValue = "";
      this.nodeValueValue = "";
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
    flex-flow: column nowrap;
    align-items: center;
    margin: 10px;
    background-color: #ddd;
    padding: 10px;
    .racklist__primary {
      display: flex;
      flex-direction: row nowrap;
      width: 100%;
      justify-content: space-between;
      .racklist__racktitle {
        margin: 0;
      }
      & > button {
        margin-left: 5px;
        height: 25px;
      }
    }
  }

  .racklist__nodelist {
    list-style: none;
  }
}
</style>