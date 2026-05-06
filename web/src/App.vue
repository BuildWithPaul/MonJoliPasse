<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
  data() {
    return {
      decodedText: "",
    };
  },
  methods: {},
  watch: {},
})
export default class App extends Vue {}
</script>

<style>
#app {
  /* min-height: 100vh; */
}
</style>
