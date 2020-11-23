import Vue from "vue";
import App from "./App.vue";
import router from "./router";
/*
import classListData from "../res/classes.json"
import gradeData from "../res/grades.json"
import professorData from "../res/professors.json"
import userData from "../res/users.json"
*/

Vue.config.productionTip = false;

let data = {
  classes: [],
  students: [],
  teachers: [],
  grades: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount("#app");
