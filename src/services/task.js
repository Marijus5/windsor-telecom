import Vue from "vue";

export const GetByUser = (userId) => {

    let url = "todos";
    let params = userId == -1 ? "" : `?userId=${userId}`;

    return Vue.axios.get(url + params)
        .then(result => {
            return result.data;
        })
        .catch(function (error) {
            throw error;
        });
}

export const GetSingleTask = (id) => {

    let url = `todos/${id}`;

    return Vue.axios.get(url)
        .then(result => {
            return result.data;
        })
        .catch(function (error) {
            throw error;
        });
}

export const UpdateTask = (id, task) => {

    let url = `todos/${id}`;

    return Vue.axios.put(url, task)
        .then(result => {
            return result.data;
        })
        .catch(function (error) {
            throw error;
        });
}

export const CreateTask = (task) => {

    let url = "todos";

    return Vue.axios.post(url, task)
        .then(result => {
            return result.data;
        })
        .catch(function (error) {
            throw error;
        });
}

export const DeleteTask = (id) => {

    let url = `todos/${id}`;

    return Vue.axios.delete(url)
        .then(result => {
            return result.data;
        })
        .catch(function (error) {
            throw error;
        });
}