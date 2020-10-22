<template>
  <v-text-field
    ref="textbox"
    outlined
    hide-details
    flat
    v-model="searchText"
    :label="label"
    :placeholder="placeholder"
    @keyup="keyup"
    @focus="$event.target.select()"
    :dense="dense"
    :background-color="backgroundColor"
    :rules="required ? [val => !!val || ''] : []"
  >
    <template v-slot:append>
      <v-progress-circular v-if="inProgress" size="24" color="primary" indeterminate></v-progress-circular>
      <v-icon v-else @click="iconClick">{{ searchIcon ? 'mdi-magnify' : 'mdi-close' }}</v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "search-box",
  props: {
    label: String,
    placeholder: String,
    dense: { type: Boolean, default: false },
    inputText: String,
    backgroundColor: String,
    required: { type: Boolean, default: false },
    pause: { type: Number, default: 1500 }
  },
  data: () => ({
    searchText: "",
    inProgress: false,
    applyLiveQueryTimeout: null,
    searchIcon: true
  }),
  created() {
    if (this.inputText) {
      this.searchText = this.inputText;
    }
  },
  methods: {
    keyup(e) {
      if (this.checkKeyPress(e)) {
        var _this = this;
        if (this.applyLiveQueryTimeout) {
          window.clearTimeout(this.applyLiveQueryTimeout);
          this.applyLiveQueryTimeout = null;
        }
        this.applyLiveQueryTimeout = window.setTimeout(function() {
          _this.applyLiveQueryTimeout = null;
          _this.inProgress = false;
          _this.$emit("search", _this.searchText);
          _this.searchIcon = false;
        }, this.pause);

        _this.inProgress = true;
        _this.searchIcon = true;
      }
    },
    checkKeyPress(e) {
      if (!e) {
        return true;
      }
      var keyCode = e.keyCode ? e.keyCode : e.which;
      if (!keyCode) {
        return true;
      }
      var keys = "/9/13/16/17/18/33/34/35/36/37/38/39/40/";
      return keys.indexOf("/" + keyCode + "/") == -1;
    },
    iconClick(e) {
      if (this.searchIcon) {
        this.keyup(e);
      } else {
        this.reset();
      }
    },
    reset() {
      this.searchIcon = true;
      this.searchText = "";

      this.$emit("clear");
    },
    setFocus() {
      //this.$refs.textbox.focus();
      this.$nextTick(() => this.$refs.textbox.focus());
    },
    setInput(value) {
      this.searchText = value;
      this.searchIcon = false;
    }
  }
};
</script>

<style lang="scss">
</style>


