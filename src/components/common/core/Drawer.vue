<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
    :mini-variant="mini"
  >
    <v-img :src="backgoundImage" height="100%">
      <v-list-item>
        <v-list-item-avatar v-if="!mini">
          <v-icon>mdi-phone-voip</v-icon>
        </v-list-item-avatar>
        <v-list-item-title v-if="!mini">Winsor Telecom</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list class="fill-height">
        <v-list-item to="task-list" active-class="success">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-check-multiple-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Task List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="about" active-class="success">
          <v-list-item-icon>
            <v-icon>mdi-information-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations } from "vuex";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    /* logoUrl: `${process.env.BASE_URL}logo.gif`, */
    backgoundImage: `${process.env.BASE_URL}background3.jpg`,
    mini: false
  }),
  computed: {
    inputValue: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
    /* items() {
      return this.$t("Layout.View.items");
    } */
  },

  methods: {
    ...mapMutations(["setDrawer", "toggleDrawer"])
  }
};
</script>

<style lang="scss">
#app-drawer {
  .v-list {
    background-color: rgba(27, 27, 27, 0.54) !important;
    .v-list-item {
      border-radius: 4px;

      /* &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      } */
    }
  }
}
</style>
