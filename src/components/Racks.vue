<template>
        <div class="racklist__container">
            <label>
              Racks
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                      v-bind="attrs"
                      v-on="on"
                  >
                    far fa-question-circle
                  </v-icon>
                </template>
                <span>Racks usually align with availability zones in cloud deployments or redundancy boundaries on prem.</span>
              </v-tooltip>
            </label>
            <ul class="racklist__list">
              <li class="racklist__item" v-for="(rack, num) in racks" :key="num">
                <div class="racklist__primary">
                  <h4 class="racklist__racktitle">{{rack.name}}</h4>
                  <div class="racklist__title-container" v-show="rackEdit[num]">
                  <form v-on:submit.prevent="sumbitName(num)"  class="racklist__title-form">
                  <input type='text' v-model="rackNewName">
                  </form>
                  </div>
                  <div class="racklist__btns">
                  <button class="racklist__title-edit" @click.prevent="rackTitleEdit(num)">
                  <v-icon>
                    fas fa-pencil-alt
                  </v-icon>
                </button>
                  <button class="racklist__remove" @click.prevent="removeRack(num)"><v-icon>fa fa-times-circle</v-icon>
                  </button>
                  </div>
                </div>

                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header expand-icon="fa-chevron-circle-down">
                      <div class="racklist__nodeadd">
                        <button @click.prevent="showNodes(num)">Add Nodes</button>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <form v-on:submit.prevent="addNode(num)" class="rackadd">
                        <label>
                          Label
                          <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                  v-bind="attrs"
                                  v-on="on"
                              >
                                far fa-question-circle
                              </v-icon>
                            </template>
                            <span>Labels specified are matched to Kubernetes workers during scheduling to control where pods are placed within the cluster.</span>
                          </v-tooltip>
                        </label>
                        <v-combobox
                            v-model="nodeLabelValue[num]"
                            :items="label_items"
                            dense
                            minlength=3 type="text"
                            append-icon="fa-chevron-down"
                        ></v-combobox>

                        <label>Value</label>
                        <v-text-field
                            v-model="nodeValueValue[num]"
                            minlength=3 type="text"
                        ></v-text-field>
                        <input type="submit" value="add">
                      </form>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <div class="racklist__nodes">
                    <ul class="racklist__nodelist">
                      <li v-for="(node, key) in rack.affinityLabels" class="racklist_node" :key="key" >
                        <div>
                          <div><span>Label: </span> {{key}}</div>
                          <div><span>Value: </span> {{node}}</div>
                        </div>
                        <button class="racklist__remove" @click.prevent="removeNode(key, num)">
                          <v-icon
                          >
                            fa-times-circle
                          </v-icon>
                        </button>
                      </li>
                    </ul>
                </div>

              </li>
            </ul>
              <form v-on:submit.prevent="addRack" class="rackadd">
                <h5>Add Rack</h5>
                <label>Rack Name</label>
                <v-text-field
                    v-model="rackAddValue"
                    placeholder="Name"
                    minlength="3"
                ></v-text-field>
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
      rackEdit: [],
      rackNewName: "",
      nodeLabelValue: [],
      nodeValueValue: [],
    };
  },
  computed: {
    racks: {
      get() {
        return this.$store.state.settings.config.cassandra.datacenters[0].racks;
      },
    },
    label_items: {
      get() {
        return this.$store.state.settings.k8_config.label_items;
      },
    },
  },
  methods: {
    addRack() {
      let rackName = this.rackAddValue;
      if (rackName.length >= 3) {
        this.rackEdit.push(false);
        this.$store.commit("addRack", rackName);
        this.$store.commit("updateTotalClusterSize");
        this.$store.commit("updateTotalStargateSize");
        this.rackAddValue = "";
        this.nodeLabelValue.push("");
        this.nodeValueValue.push("");
      } else {
        this.error;
      }
    },
    removeRack(num) {
      this.$store.commit("removeRack", num);
      this.$store.commit("updateTotalClusterSize");
      this.$store.commit("updateTotalStargateSize");
      this.nodeLabelValue.splice(num, 1);
      this.nodeValueValue.splice(num, 1);
      this.rackEdit.splice(num, 1);
    },
    sumbitName(num) {
      let rackName = this.rackNewName;
      this.$store.commit("updateRackName", { num, rackName });
      this.rackEdit[num] = false;
      this.rackNewName = "";
      this.$forceUpdate();
    },
    rackTitleEdit(num) {
      if (this.rackEdit[num] === true) {
        this.sumbitName(num);
      }
      else {
      this.rackEdit = this.rackEdit.map(() => {
        return false;
      });
      this.rackEdit[num] = true;
      this.$forceUpdate();
      }
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
  background: var(--color-brand-black);
  /*margin: 20px 0;*/
  padding: 20px;

  input[type="submit"] {
    width: 100%;
    box-shadow: none;
    margin: 0;
    padding: 8px 20px;

    .v-expansion-panel-content & {
      background: transparent;
      border: 1px solid var(--color-brand-black);
    }
  }

  h5 {
    margin-bottom: 10px;
  }

  h5,
  label {
    color: var(--color-white);

    .v-expansion-panel-content & {
      color: var(--color-brand-black);
    }
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
    /*padding: 20px;*/
    .racklist__primary {
      display: flex;
      position: relative;
      width: 100%;
      justify-content: space-between;
      background: var(--color-brand-black);
      color: var(--color-white);
      padding: 10px;

      .racklist__racktitle {
        margin: 0;
        flex-grow: 1;
      }
      & > button {
        margin-left: 5px;
        height: 50px;
      }
      .racklist__title-container {
        background-color: var(--color-brand-black);
        position: absolute;
        top: 10px;
        left: 10px;
      }

      input[type="text"] {
        background: var(--color-brand-black);
        color: var(--color-white);
        border-width: 0;
        padding: 0;
        outline: var(--color-brand-black) !important;
        border-bottom: 2px solid var(--color-white);
        font-size: 22px;
        line-height: 26px;
        letter-spacing: -1.1px;
        font-family: var(--ff-museoSans);
        font-weight: 700;
      }
      .racklist__btns > button > .v-icon {
        color: var(--color-white);
        font-size: 16px;
        line-height: 1;
        margin-left: 10px;
      }
    }
  }

  .racklist__nodelist {
    list-style: none;
    padding: 0;
  }

  .racklist_node {
    display: flex;
    background: var(--color-white);
    margin: 0 10px 10px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;

    &:not(:last-of-type) {
      margin-bottom: 5px;
    }

    span {
      font-weight: 700;
    }

    .racklist__remove {
      margin-left: auto;
      text-decoration: none;
      border: 0;

      .v-icon.v-icon {
        color: var(--color-brand-red);
        font-size: 16px;
        line-height: 1;
      }
    }
  }
}

.racklist__item {
  > div {
    width: 100%;
  }

  .v-expansion-panel-header {
    width: 100%;
    padding: 12px 10px 9px;
    font-size: 18px;
    line-height: 21px;
    font-family: var(--ff-museoSans);
    font-weight: 700;
    background: var(--color-brand-yellow);
    text-align: left;
    min-height: initial !important;
  }

  .rackadd {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: var(--color-brand-yellow);

    label {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .v-input {
      margin: 0 0 14px;
      padding: 0;

      &:last-of-type {
        margin-bottom: 10px;
      }
    }

    .v-input__slot {
      margin: 0;
    }
  }

  .v-expansion-panels {
    padding: 10px;
  }

  .v-expansion-panel-content__wrap {
    padding: 0;
  }

  .v-expansion-panel-content {
    background: var(--color-brand-yellow);
  }

  .theme--light.v-expansion-panels {
    .v-expansion-panel {
      border-radius: 0;

      &::before {
        box-shadow: none;
      }
    }

    .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
      font-size: 16px;
      color: var(--color-brand-black);
    }
  }

  .v-input__slot {
    background: var(--color-white);

    .v-icon {
      color: var(--color-brand-black) !important;
    }
  }
}

.racklist__remove {
  font-size: 12px;
  line-height: 24px;
}

.racklist__container > .rackadd input[type=submit] {
  margin-top: 10px;
}
</style>