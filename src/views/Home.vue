<template>
  <div class="home">
    <h1>K8ssandra Configurator</h1>
  <div class="container">
    <Input />
    <Result />
  </div> 
    </div> 

</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
import Result from "@/components/Result.vue";

export default {
  name: "Home",
  components: {
    Input,
    Result,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  max-width: 1440px;
}
</style>