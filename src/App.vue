<template>
  <v-app>
    <core-drawer />
    <core-toolbar />
    <core-view @displayMessage="onDisplayMessage" />
    <v-snackbar
      v-model="snackbar.show"
      bottom
      :color="snackbar.type"
      multi-line
    >
      {{ snackbar.message }}
      <v-btn icon @click="snackbar.show = false" dark>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
/* */
<script>
export default {
  name: "App",

  data: () => ({
    snackbar: { show: false, message: "", type: "info" }
  }),
  created() {},
  methods: {
    onDisplayMessage(value) {
      this.snackbar = Object.assign({ show: true }, value);
    }
  }
};
</script>
<style lang="scss">
@import "@/scss/index.scss";

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.bottom-container {
  position: fixed;
  bottom: 16px;
  margin: 0;

  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  padding-top: 10px;
  padding-bottom: 10px;

  .buttons-container {
    /*max-width: 1500px;*/
    margin: 0 auto;
    text-align: right;
    padding-right: 20px;
  }
}
</style>
