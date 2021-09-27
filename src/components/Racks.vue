<template>
        <div class="racklist__container">
            <label>Racks</label><br />
            <ul class="racklist__list">
              <li class="racklist__item" v-for="(rack, num) in racks" :key="num">
                <div class="racklist__primary">
                  <h4 class="racklist__racktitle">{{rack.name}}</h4>
                  <button class="racklist__remove" @click.prevent="removeRack(num)">Remove</button>
                </div>
                <div v-if="hideNodes[num]">
                  <button @click.prevent="showNodes(num)">Add Nodes</button>
                </div>
                <div v-else class="racklist__nodes">
                    <ul class="racklist__nodelist">
                      <li v-for="(node, key) in rack.affinityLabels" class="racklist_node" :key="key" >
                        {{key}}:{{ node }} 
                        <button class="racklist__remove" @click.prevent="removeNode(key, num)">Remove</button>
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
  background: var(--color-grey-light);
  /*margin: 20px 0;*/
  padding: 20px;

  input[type="submit"] {
    box-shadow: none;
    margin: 0;
    padding: 8px 20px;
  }
}

ul.racklist__list {
  padding-left: 0;
  margin: 0;
  & > li {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 10px 0;
    background-color: var(--color-grey-light);
    padding: 20px;
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

  .racklist__item {
    > div {
      width: 100%;
    }

    button:not(.racklist__remove) {
      width: 100%;
      padding: 6px;
      font-size: 14px;
      line-height: 28px;
      font-weight: 700;
      border: 1px dashed var(--color-brand-black);
      border-radius: 3px;
    }

    .rackadd {
      display: flex;
      padding: 0;

      input[type="text"] {
        margin-right: 5px;
      }
    }
  }

  .racklist__remove {
    font-size: 12px;
    line-height: 24px;
    text-decoration: underline;
  }
</style>