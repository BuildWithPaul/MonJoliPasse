<template>
  <!-- qrCodeData QR.vue
    {{ qrCodeData }} -->

  <a
    id="downloadPhotoLink"
    download="mon-joli-passe.jpg"
    title="Download photo"
    href="https://unsplash.com/photos/GH_JThjyz90/download?ixid=MnwxMjA3fDB8MXxhbGx8Mnx8fHx8fDJ8fDE2NDMxMTU2Mzk&amp;force=true"
    ><span class="wl5gA">Download free</span></a
  >

  <div v-show="qrCodeData">
    <div id="customise" class="d-grid">
      <!-- Or -->
      <h2>Étape 2 : Customisez</h2>

      <div class="dropdown w-100 py-2">
        <button
          class="w-100 btn btn-primary btn-lg dropdown-toggle px-2"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Choisir mon image
        </button>
        <!-- {{ image }} -->
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('macron')"
              >Macron</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('nasa')"
              >Nasa</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('drake')"
              >Drake</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('illuminati')"
              >Illuminati</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.selectImage('baby')"
              >Baby</a
            >
          </li>
          <li>
            <a class="dropdown-item" v-on:click="this.openFileBrowser()">
              <b-icon-upload />&nbsp;&nbsp; Importer une image</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class=""></div>

      <div class=""></div>
      <div class=""></div>
    </div>

    <input
      v-show="false"
      id="browse"
      type="file"
      accept="image/jpeg, image/png"
      @change="onUploadFile"
      hidden
    />

    <div class="beta d-flex justify-content-between">
      <div class="w-100">
        <VueQr3
          :width="1024"
          :height="1024"
          :margin="10"
          v-if="forceRendering"
          :data="qrCodeData"
          :qrOptions="{
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'H',
          }"
          :imageOptions="{
            hideBackgroundDots: false,
            imageSize: 0.8,
            margin: 0,
          }"
          :dotsOptions="{
            type: 'square',
            color: '#000000',
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :image="image"
          :cornersSquareOptions="{ type: 'square', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          :download="false"
          myclass="my-qur w-100"
          imgclass="img-qr"
          downloadButton="mt-3 download-btn t-2 btn btn-primary btn-lg"
          :downloadOptions="{ name: 'mon-joli-pass', extension: 'png' }"
        >
        </VueQr3>

        <button
          class="w-100 btn btn-primary btn-lg mt-2"
          type="button"
          id="downloadButton"
          @click="download()"
          aria-expanded="false"
          data-bs-toggle="button"
          autocomplete="off"
        >
          <b-icon-download />&nbsp;&nbsp; Télécharger
        </button>
      </div>
    </div>
  </div>
  <!-- {{ forceRendering }} -->
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "qr",
  components: {
    VueQr3: defineAsyncComponent(() =>
      Promise.resolve(import("vue3-qr-code-styling"))
    ),
  },

  props: {
    qrCodeData: String,
  },
  data() {
    return {
      image: require(`@/assets/memes/macron.png`),
      forceRendering: false,
    };
  },
  setup() {
    return {};
  },
  watch: {
    async qrCodeData(value) {
      await this.refresh();
      console.log("qrCodeData" + value);
    },
  },
  async mounted() {},
  created() {},
  methods: {
    async createBlobFromData64(data64: string) {
      var res = await fetch(data64);
      var blob = await res.blob();
      var file = new File([blob], "file.png", { type: "image/png" });
      return file;
    },
    async createDownloadLink() {
      var data64 = this.convertQrCodeToData64();
      var img = await this.createBlobFromData64(data64);
      let formData = new FormData();
      formData.append("img", img);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        "http://localhost:8082/",
        // "https://monjolipasse-server.herokuapp.com/",
        requestOptions
      );
      const data = await response.json();
      // window.location.href = "http://localhost:8082/c" + data.url;
      console.log(data.name);
      // alert(data.name);
      var a = document.getElementById("downloadPhotoLink") as HTMLLinkElement;
      console.log(a);
      // a.href = `http://localhost:8082/download/${data.name}`;

      // a.href = `https://monjolipasse-server.herokuapp.com/download/${data.fileName}`;
    },
    convertQrCodeToData64() {
      var img = document.getElementsByClassName(
        "img-qr"
      )[0] as HTMLImageElement;
      return img.src;
    },
    createFileAndLink(url: string) {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: "image/png" });
          var objectURL = URL.createObjectURL(file);
          // window.location.href = "https://unsplash.com/";

          var a = document.getElementById(
            "downloadPhotoLink"
          ) as HTMLLinkElement;

          console.log(a);
          a.href = objectURL;
          // alert(objectURL);
          // a.download = "MonJoliPasse.png"; //File name Here
          a.click(); //Downloaded file
        });
    },
    changeTxtButton() {
      var btn = document.querySelector(".download-btn");
      if (btn) btn.innerHTML = "Télécharger";
    },
    onUploadFile(event: { target: { files: any[] } }) {
      this.image = URL.createObjectURL(event.target.files[0]);
      this.refresh();
    },

    async refresh() {
      this.forceRendering = false;
      await this.sleep(50);
      this.forceRendering = true;
      await this.sleep(100);
      this.changeTxtButton();
    },
    openFileBrowser() {
      var e = document.getElementById("browse");
      if (e) {
        e.click();
      }
    },
    onButtonDownloadClick() {
      // var e = document.getElementById("myBtn");
      // if (e) e.addEventListener("click", displayDate);
      // this.createDownloadLink(file);
    },

    download() {
      var img = document.getElementsByClassName(
        "img-qr"
      )[0] as HTMLImageElement;
      this.createFileAndLink(img.src);
    },
    async selectImage(imageName: any) {
      this.forceRendering = false;
      await this.sleep(50);

      // this.qrCodeData = "qrCodeData";
      this.image = require(`@/assets/memes/${imageName}.png`);
      this.forceRendering = true;
      await this.sleep(100);
      this.changeTxtButton();
    },
    sleep: function (ms: number | undefined) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
});
</script>

<style>
#downloadPhotoLink {
  display: none;
}
.hidden {
  display: none;
}
.my-qur img {
  width: 100%;
}
.download-btn {
  width: 100%;
}
.beta {
  color: yellow-300;
  background-color: indigo-900;
}
</style>
