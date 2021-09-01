<template>
  <div class="about">
    <h1>This is an about page</h1>
<<<<<<< HEAD
  </div>
</template>
=======
    <button @click="incrementCount">Increment</button>
  </div>
</template>

<script>

export default {
  name: 'About',
  components: {
    // HelloWorld
  }, 
  methods: {
    incrementCount() {
      this.$store.commit('INCREMENT_COUNT');
    }
  }
}
</script>
>>>>>>> 7ee5da0... converted to vue2
