import Vue from "vue";

export const GetAll = () => {

    let url = "users";

    return Vue.axios.get(url)
        .then(result => {
            return result.data;
        })
        .catch(function (error) {
            throw error;
        });
}