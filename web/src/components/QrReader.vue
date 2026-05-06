<template>
  <div class="hello">
    <!-- {{ cameraPermission }} -->

    <div class="d-grid">
      <h2>Étape 1 : Importer votre passe</h2>
      <img
        v-show="false"
        id="imgQR"
        class="fit-picture"
        src=""
        alt="Grapefruit slice atop a pile of other slices"
      />

      <div class="row">
        <div class="col-lg py-2">
          <label class="w-100 btn btn-lg btn-primary px-2">
            <b-icon-upload />&nbsp;&nbsp; Importer une image<input
              type="file"
              accept="image/jpeg, image/png"
              @change="previewFiles"
              hidden
            />
          </label>
        </div>
        <div class="col-lg py-2">
          <button
            class="w-100 btn btn-primary btn-lg"
            type="button"
            id="dropdownMenuButton1"
            @click="toggleCamera()"
            aria-expanded="false"
            data-bs-toggle="button"
            autocomplete="off"
          >
            <b-icon-camera />&nbsp;&nbsp; Scanner avec la camera
          </button>
        </div>
      </div>

      <video
        v-show="camera"
        class="w-100 round-border"
        id="webcam-preview"
      ></video>

      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </symbol>
      </svg>

      <div v-if="isLastScanSuccess != null">
        <div
          v-if="isLastScanSuccess"
          class="py-2 alert alert-success d-flex align-items-center"
          role="alert"
        >
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          >
            <use xlink:href="#check-circle-fill" />
          </svg>
          <div>
            Votre passe à été importer avec succès. Vous pouvez maintenant le
            personnaliser !
          </div>
        </div>
        <div
          v-else
          class="alert alert-warning d-flex align-items-center"
          role="alert"
        >
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Warning:"
          >
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <div>
            Impossible de lire de détecter le QR code. Veuillez en essayer un
            autre.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import qr from "./QrCustomiser.vue";
import QrScanner from "qr-scanner"; // if installed via package and bundling with a module bundler like webpack or rollup

@Options({
  components: { qr },
  props: {
    msg: String,
  },
  data() {
    return {
      el: "#app",
      cameraPermission: "prompt",
      codeReader: null,
      isLastScanSuccess: null,
      camera: false,
    };
  },
  async mounted() {
    // this.isLastScanSuccess = true;
    // this.camera = false;
    // this.$emit("onQrCodeChange", "d,dkndnkdn");
  },
  methods: {
    toggleCamera() {
      if (!this.camera) {
        this.camera = true;
        this.startScanner();
      } else this.camera = false;
    },
    async previewFiles(event: { target: { files: any } }) {
      // var context = this;
      var selectedFile = event.target.files[0];
      QrScanner.scanImage(selectedFile)
        .then((result: any) => {
          this.isLastScanSuccess = true;
          this.camera = false;
          this.$emit("onQrCodeChange", result);

          this.$gtag.event("newScan", { method: "fromFile" });
          var qre = document.getElementById("customise");
          if (qre) qre.scrollIntoView();
        })
        .catch((error: any) => console.log(error || "No QR code found."));
    },

    async startScanner() {
      console.log(await QrScanner.hasCamera());
      var videoElem = document.getElementById(
        "webcam-preview"
      ) as HTMLVideoElement;
      console.log(videoElem);

      this.codeReader = new QrScanner(videoElem, (result) => {
        this.codeReader.stop();
        console.log("Found QR code!", result);
        this.$emit("onQrCodeChange", result);
        // console.log(result.getText());
        this.isLastScanSuccess = true;
        this.camera = false;
        this.$gtag.event("newScan", { method: "fromCamera" });

        var qre = document.getElementById("customise");
        if (qre) qre.scrollIntoView();
      });
      this.codeReader.setCamera("environment"); // async
      this.codeReader.start();
    },

    async askCameraPerm() {
      var context = this;
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function () {
          context.cameraPermission = "granted";
          context.initScanner();
        })
        .catch(function (err) {
          context.cameraPermission = "denied";
          console.log(err);
        });
    },
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<style>
.round-border {
  border-radius: 7px;
}
</style>
