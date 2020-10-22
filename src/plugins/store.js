import Vue from "vue";
import Vuex from "vuex";
import { set, toggle } from "@/utils/vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: null,
        search: "",
        selectedUser: -1,
        userList: []
    },
    getters: {
    },
    mutations: {
        setDrawer: set("drawer"),
        toggleDrawer: toggle("drawer"),
        setSearch: set("search"),
        setSelectedUser: set("selectedUser"),
        setUserList: set("userList")
    },
    actions: {},
    modules: {}
});
