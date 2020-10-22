<template>
  <div id="taskList">
    <v-row>
      <v-col cols="12">
        <material-card color="green" title="Task List">
          <v-data-table
            ref="taskList"
            :search="search"
            :headers="headers"
            :items="data"
            sort-by="title"
            loading-text="Loading... Please wait"
            no-data-text="No matches found."
            :items-per-page="itemsPerPage"
            :footer-props="{
              itemsPerPage: itemsPerPage,
              itemsPerPageOptions: itemsPerPageOptions
            }"
            :page.sync="page"
            :loading="loading"
            @click:row="onRowClick"
          >
            <template v-slot:item.userId="{ item }">
              <span class="user-id">{{ item.userId }}</span>
            </template>
            <template v-slot:item.title="{ item }">
              <span
                class="d-inline-block text-truncate"
                style="max-width: 400px;"
                >{{ item.title }}</span
              >
            </template>
            <template v-slot:item.completed="{ item }">
              <v-icon :color="item.completed ? 'green' : 'red'">{{
                item.completed ? "mdi-check" : "mdi-alert-outline"
              }}</v-icon>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent width="500">
      <task
        v-if="selectedTask"
        :data="selectedTask"
        @cancel="
          dialog = false;
          selectedTask = null;
        "
        @update="onUpdate"
        @addNew="onAddNew"
        @delete="onDelete"
      ></task>
      <v-skeleton-loader
        v-else
        class="mx-auto"
        width="100%"
        type="card, actions"
      ></v-skeleton-loader>
    </v-dialog>

    <div class="bottom-container">
      <div class="buttons-container">
        <v-btn @click="onOpenNew" color="primary" large>Add New</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetByUser,
  GetSingleTask,
  UpdateTask,
  CreateTask,
  DeleteTask
} from "@/services/task.js";
import Task from "@/components/Task.vue";

export default {
  components: { Task },
  data: () => ({
    headers: [
      {
        text: "",
        value: "id",
        width: 50
      },
      {
        text: "Title",
        value: "title"
      },
      {
        text: "User",
        value: "userId",
        width: 80
      },
      {
        text: "",
        value: "completed",
        sortable: false,
        width: 50,
        align: "center"
      }
    ],
    data: [],
    itemsPerPage: 10,
    page: 1,
    loading: false,
    itemsPerPageOptions: [5, 10, 15, 50],
    searchOptions: null,
    dialog: false,
    selectedTask: null
  }),
  created() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      GetByUser(this.selectedUser)
        .then(result => {
          this.data = result;
        })
        .catch(error => {
          this.$emit("displayMessage", {
            message: error.message,
            type: "error"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onOpenNew() {
      this.dialog = true;
      this.selectedTask = {
        userId: -1,
        title: "",
        completed: false,
        isNew: true
      };
    },
    onRowClick(item) {
      this.dialog = true;
      GetSingleTask(item.id)
        .then(result => {
          this.selectedTask = result;
        })
        .catch(error => {
          this.$emit("displayMessage", {
            message: error.message,
            type: "error"
          });
        });
    },
    onUpdate(eventData) {
      UpdateTask(eventData.data.id, eventData.data)
        .then(() => {
          this.dialog = false;
          this.selectedTask = null;

          this.$emit("displayMessage", {
            message: "Updated successfully",
            type: "success"
          });

          this.getTasks();
        })
        .catch(error => {
          this.$emit("displayMessage", {
            message: error.message,
            type: "error"
          });
        })
        .finally(() => {
          eventData.callBack();
        });
    },
    onAddNew(eventData) {
      CreateTask(eventData.data)
        .then(() => {
          this.dialog = false;
          this.selectedTask = null;

          this.$emit("displayMessage", {
            message: "Updated successfully",
            type: "success"
          });

          this.getTasks();
        })
        .catch(error => {
          this.$emit("displayMessage", {
            message: error.message,
            type: "error"
          });
        })
        .finally(() => {
          eventData.callBack();
        });
    },
    onDelete(eventData) {
      DeleteTask(eventData.id)
        .then(() => {
          this.dialog = false;
          this.selectedTask = null;

          this.$emit("displayMessage", {
            message: "Deleted successfully",
            type: "success"
          });

          this.getTasks();
        })
        .catch(error => {
          this.$emit("displayMessage", {
            message: error.message,
            type: "error"
          });
        })
        .finally(() => {});
    }
  },
  computed: {
    search() {
      return this.$store.state.search;
    },
    selectedUser() {
      return this.$store.state.selectedUser;
    }
  },
  watch: {
    selectedUser(value) {
      GetByUser(value)
        .then(result => {
          this.data = result;
        })
        .catch(error => {
          this.$emit("displayMessage", {
            message: error.message,
            type: "error"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  beforeRouteLeave(from, to, next) {
    if (this.selectedTask) {
      next(false);
    } else {
      next();
    }
  }
};
</script>

<style lang="scss">
#taskList {
  .v-card {
    margin-top: 25px !important;
  }
  .v-card--material-stats.v-card .v-offset .v-card {
    line-height: 0px !important;
  }
  tbody {
    tr {
      cursor: pointer !important;
    }
  }
  td > span.user-id {
    font-weight: bolder;
  }
}
</style>