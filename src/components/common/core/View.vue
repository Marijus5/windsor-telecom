<template>
  <v-content>
    <v-container id="main-container" fluid>
      <v-fade-transition mode="out-in">
        <router-view @displayMessage="onDisplayMessage" />
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<script>
export default {
  /*  metaInfo () {
    return {
      title: 'Vuetify Material Dashboard by CreativeTim'
    }
  } */
  methods: {
    onDisplayMessage(value) {
      this.$emit("displayMessage", value);
    }
  }
};
</script>

<style>
#main-container {
  /*padding-bottom: 100px;*/
  padding: 0px 24px 0 24px;
}
</style>
