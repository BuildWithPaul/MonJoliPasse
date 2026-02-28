<template>
  <!-- Responsive navbar-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container px-5">
      <a class="navbar-brand" href="#!">Mon Joli Passe</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="https://fr.wikipedia.org/wiki/Code_QR"
              >Comment marche un QR Code ?
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Header-->
  <header class="bg-dark py-4">
    <div class="container">
      <div class="row gx-5 justify-content-center">
        <div class="col-lg-6">
          <div class="text-center">
            <h1 class="display-5 fw-bolder text-white mb-2">
              Customise ton passe
            </h1>
            <p class="lead text-white-50 mb-4">
              Aucun QR Code n'est enregistré lors de l'utilisation du site.
            </p>
            <!-- <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <a class="btn btn-primary btn-lg px-4 me-sm-3" href="#features"
                >Get Started</a
              >
              <a class="btn btn-outline-light btn-lg px-4" href="#!"
                >Learn More</a
              >
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Features section-->
  <section class="border-bottom" id="features">
    <div class="container px-3 my-5">
      <div class="row">
        <div class="col-sm-8">
          <QrReader v-on:onQrCodeChange="onQrCodeChange" />
        </div>
        <div class="col-sm-4">
          <QrCustomiser :qrCodeData="decodedText" />
        </div>
      </div>
    </div>
  </section>
  <!-- Pricing section-->

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container px-5">
      <p class="m-0 text-center text-white">
        Fait en France avec ❤️ &nbsp; Contact : monjolipasse@gmail.com
      </p>
    </div>
  </footer>

  <!-- <Nav />
  <br />
  <br />

  <h2>Étape 1 : Scannez votre passe</h2>

  <QrReader v-on:childToParent="onQrCodeChange" />

  <h2>Étape 2 : Sélectionner ou importer une image</h2>
  <br />
  <HelloWorld :decodedData="decodedText" :msg="decodedText" />
  <Footer /> -->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import QrCustomiser from "./components/QrCustomiser.vue";
import QrReader from "./components/QrReader.vue";

@Options({
  components: {
    QrCustomiser,
    QrReader,
  },
  data() {
    return {
      decodedText: "",
    };
  },
  methods: {
    onQrCodeChange(decodedText: any) {
      this.decodedText = decodedText;
    },
  },
  created() {
    if (
      navigator.userAgent.includes("Instagram") ||
      navigator.userAgent.includes("FBAV")
    )
      this.$router.push({ name: "BrowserNotCompatible" });
    else this.$router.push({ name: "Home" });
  },
  watch: {
    qrCodeData() {
      console.log("qrCodeData");
      this.refresh();
    },
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
