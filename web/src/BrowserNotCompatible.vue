<template>
  <div class="position-relative">
    <div class="position-absolute top-0 end-0">
      <b-icon-arrow-up-right
        style="padding-right: 20px; width: 150px; height: 150px"
      />
    </div>
  </div>
  <div class="fullscreen d-flex justify-content-center align-items-center">
    <h4>
      Cliquez sur l'icône <b-icon-three-dots-vertical />
      et ouvrez l'application sur votre navigateur principal.
    </h4>
  </div>
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
  mounted() {},
  created() {
    if (
      !navigator.userAgent.includes("Instagram") &&
      !navigator.userAgent.includes("FBAV")
    )
      this.$router.push({ name: "Home" });
    else this.$router.push({ name: "BrowserNotCompatible" });
  },
  methods: {},
  watch: {},
})
export default class App extends Vue {}
</script>

<style>
.fullscreen {
  height: 100vh;
}
</style>
