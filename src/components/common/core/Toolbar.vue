<template>
  <v-app-bar id="core-toolbar" app flat style="background: #eee;">
    <v-toolbar-title class="tertiary--text font-weight-light">
      <v-btn
        v-if="responsive"
        class="default v-btn--simple"
        dark
        icon
        @click.stop="onClickBtn"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      <span class="text-capitalize">{{ title }}</span>
    </v-toolbar-title>
    <v-divider class="mx-4 devider-color" inset vertical></v-divider>
    <search-box
      ref="searchbox"
      v-if="showSearchBox"
      dense
      :placeholder="placeholder"
      @search="onSearch"
      @clear="onClear"
    />
    <v-spacer />
    <v-select
      v-if="showUserFilter"
      v-model="selectedUser"
      :items="userList"
      item-value="key"
      item-text="value"
      label="Users"
      outlined
      hide-details
      dense
    ></v-select>
  </v-app-bar>
</template>

<script>
import { GetAll } from "@/services/user.js";
import { mapMutations } from "vuex";

export default {
  data: () => ({
    title: null,
    responsive: false,
    showSearchBox: false,
    showUserFilter: false,
    selectedUser: "-1"
  }),
  created() {
    GetAll().then(result => {
      this.setUserList(
        result.map(i => {
          return { key: i.id, value: i.name };
        })
      );
    });
  },
  watch: {
    $route(val) {
      this.title = val.name;
      this.showSearchBox = val.meta.hasSearchBox;
      this.showUserFilter = val.meta.hasUserFilter;

      this.setSearch("");
      this.setSelectedUser(-1);
      this.$refs.searchbox.reset();
    },
    selectedUser(value) {
      this.setSelectedUser(value);
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  computed: {
    placeholder() {
      return `Search ${this.title}...`;
    },
    userList() {
      return [{ key: -1, value: "All Users" }].concat(
        this.$store.state.userList
      );
    }
  },

  methods: {
    ...mapMutations([
      "setDrawer",
      "toggleDrawer",
      "setSearch",
      "setSelectedUser",
      "setUserList"
    ]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    onSearch(value) {
      this.setSearch(value);
    },
    onClear() {
      this.setSearch("");
    }
  }
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
