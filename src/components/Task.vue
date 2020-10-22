<template>
  <v-form id="task" v-model="valid" ref="form">
    <v-card>
      <v-card-text class="pt-1">
        <material-card color="green" title="Task">
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="data.userId"
                :readonly="!data.isNew"
                :items="userList"
                :rules="[rules.mandatory, rules.selected]"
                item-value="key"
                item-text="value"
                label="Users"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                class="mt-1"
                :rules="[rules.mandatory, rules.max(150)]"
                v-model="data.title"
                label="Task Description"
                no-resize
                rows="3"
                counter="150"
                outlined
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-switch
                v-model="data.completed"
                hide-details
                :readonly="data.isNew"
              >
                <template v-slot:label>
                  Status:
                  <span
                    class="ml-2"
                    :class="data.completed ? 'active' : 'inactive'"
                    >{{ data.completed ? "Complete" : "Incomplete" }}</span
                  >
                </template>
              </v-switch>
            </v-col>
          </v-row>
        </material-card>
      </v-card-text>
      <v-card-actions>
        <v-btn
          small
          v-if="!data.isNew"
          @click="deleteDialog = true"
          outlined
          color="error"
        >
          <v-icon left small>mdi-delete-outline</v-icon>Delete
        </v-btn>
        <v-spacer />
        <v-btn @click="$emit('cancel')">Cancel</v-btn>
        <v-btn
          @click="onUpdate"
          :disabled="!valid"
          :loading="inProgress"
          color="primary"
        >
          {{ buttonTitle }}
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon color="white">mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="deleteDialog" max-width="300px" persistent>
      <v-card>
        <v-card-title>
          <h3>Delete Task</h3>
        </v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" @click="deleteDialog = false">No</v-btn>
          <v-btn small @click="onDeleteAccept">Yes, I am sure</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
export default {
  props: { data: { type: Object } },
  name: "task",
  data: () => ({
    valid: false,
    inProgress: false,
    buttonTitle: "",
    deleteDialog: false,

    rules: {
      mandatory: val => !!val || "Required",
      selected: val => val != -1 || "Required",
      max: count => v => v.length <= count || `exided ${count} characters limit`
    }
  }),
  created() {
    this.buttonTitle = this.data.isNew ? "Save" : "Update";
  },
  methods: {
    onUpdate() {
      this.inProgress = true;
      let _this = this;

      this.$emit(
        this.data.isNew ? "addNew" : "update",
        Object.assign(
          {},
          {
            data: this.data,
            callBack: () => {
              _this.inProgress = false;
            }
          }
        )
      );
    },
    onDeleteAccept() {
      this.deleteDialog = false;

      this.$emit(
        "delete",
        Object.assign(
          {},
          {
            data: this.data
          }
        )
      );
    }
  },
  computed: {
    userList() {
      return [{ key: -1, value: "-- Select User --" }].concat(
        this.$store.state.userList
      );
    }
  }
};
</script>

<style lang="scss">
#task {
  .v-card {
    margin-bottom: 0px !important;
  }
  span.active {
    color: green;
  }
  span.inactive {
    color: red;
  }
}
</style>