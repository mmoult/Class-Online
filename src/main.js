import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import classListData from "../res/classes.json"
import gradeData from "../res/grades.json"
import professorData from "../res/professors.json"
import userData from "../res/users.json"

Vue.config.productionTip = false;

let data = {
  classes: classListData,
  students: userData,
  teachers: professorData,
  grades: gradeData
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount("#app");
