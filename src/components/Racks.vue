<template>
        <div class="racklist__container">
            <label>Racks (array) ** </label><br />
            <ul class="racklist__list">
              <li class="racklist__item" v-for="(rack, num) in racks" :key="num">
                <div class="racklist__primary">
                  <h4 class="racklist__racktitle">{{rack.name}}</h4>
                  <button @click.prevent="removeRack(num)">x</button>
                </div>
                <div v-if="hideNodes[num]">
                  <button @click.prevent="showNodes(num)">Add Nodes</button>
                </div>
                <div v-else class="racklist__nodes">
                    <ul class="racklist__nodelist">
                      <li v-for="(node, key) in rack.affinityLabels" class="racklist_node" :key="key" >
                        {{key}}:{{ node }} 
                        <button @click.prevent="removeNode(key, num)">x</button>
                      </li>
                    </ul>
                    <form v-on:submit.prevent="addNode(num)" class="rackadd">
                      <input v-model="nodeLabelValue[num]" placeholder="Label" minlength=3 type="text">
                      <input v-model="nodeValueValue[num]" placeholder="value" minlength=3 type="text">
                      <input type="submit"  value="add">
                    </form>                
                </div>

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
      hideNodes: [],
      nodeLabelValue: [],
      nodeValueValue: []

    };
  },
  computed: {
    racks: {
      get() {
        return this.$store.state.settings.config.cassandra.datacenters[0].racks;
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
        this.hideNodes.push(true);
        this.nodeLabelValue.push("");
        this.nodeValueValue.push("");
      } else {
        this.error;
      }
    },
    removeRack(num) {
      this.$store.commit("removeRack", num);
      this.$store.commit("updateTotalClusterSize");
      this.nodeLabelValue.splice(num, 1);
      this.nodeValueValue.splice(num, 1)
    },
    showNodes(num) {
      this.hideNodes[num] = false;
      this.$forceUpdate();
    },
    addNode(num) {
      let nodeLabel = this.nodeLabelValue[num];
      let nodeValue = this.nodeValueValue[num];
      this.$store.commit("addNode", { num, nodeLabel, nodeValue });
      this.nodeLabelValue[num] = "";
      this.nodeValueValue[num] = "";
    },
    removeNode(node, rack) {
      this.$store.commit("removeNode", { node, rack });

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