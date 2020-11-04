import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ClassInfo from "../views/ClassInfo.vue";
import ClassList from "../views/ClassList.vue";
import StudentInfo from "../views/StudentInfo.vue";
import StudentList from "../views/StudentList.vue";
import TeacherList from "../views/TeacherList.vue";
import TeacherInfo from "../views/TeacherInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/class",
    name: "ClassInfo",
    component: ClassInfo
  },
  {
    path: "/classes",
    name: "ClassList",
    component: ClassList
  },
  {
    path: "/student",
    name: "StudentInfo",
    component: StudentInfo
  },
  {
    path: "/students",
    name: "StudentList",
    component: StudentList
  },
  {
    path: "/teacher",
    name: "TeacherInfo",
    component: TeacherInfo
  },
  {
    path: "/teachers",
    name: "TeacherList",
    component: TeacherList
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
