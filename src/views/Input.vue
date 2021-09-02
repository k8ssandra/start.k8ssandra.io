<template>
  <div class="input">
    <h1>This is the input page</h1>
    <div>
      <h3>count up example</h3>
      <button @click="incrementCount">Increment</button>
    </div>
    <div>
      <h3> Binded text entry </h3>
      <label>{{text}}</label><br />
      <input v-model="text">
    </div>
  </div> 
</template>

<script>
export default {
  name: "Input",
  components: {
  },
  computed: {
    text: {
      get() {
        return this.$store.state.text;
      },
      set(value) {
        this.$store.commit("updateText", value);
      },
    },
  },
  methods: {
    incrementCount() {
      this.$store.commit("INCREMENT_COUNT");
    }
  },
};
</script>


