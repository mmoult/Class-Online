import Vue from "vue";
import App from "./App.vue";
import router from "./router";
/*
old data imports
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
	grades: [],
}

//METHODS
//select methods
Vue.prototype.$selectStudent = function(id) {
	this.$router.push({name: 'StudentInfo', params: { id: id}});
}
Vue.prototype.$selectTeacher = function(id) {
	this.$router.push({name: 'TeacherInfo', params: { id: id}});
}
Vue.prototype.$selectClass = function(id) {
	this.$router.push({name: 'ClassInfo', params: { id: id}});
}
	
//GET methods
import axios from 'axios';
Vue.prototype.$getStudents = async function() {
	try {
		let response = await axios.get("/api/students");
		this.$root.$data.students = response.data;
		return true;
	} catch (error) {
		console.log(error);
	}
};
Vue.prototype.$getGrades = async function() {
	try {
		let response = await axios.get("/api/grades");
		this.$root.$data.grades = response.data;
		return true;
	} catch (error) {
		console.log(error);
	}
};
Vue.prototype.$getProfessors = async function() {
	try {
		let response = await axios.get("/api/professors");
		this.$root.$data.teachers = response.data;
		return true;
	} catch (error) {
		console.log(error);
	}
};
Vue.prototype.$getClasses = async function() {
	try {
		let response = await axios.get("/api/classes");
		this.$root.$data.classes = response.data;
		return true;
	} catch (error) {
		console.log(error);
	}
};

//POST methods
Vue.prototype.$postStudent = async function() {
  await axios.post('/api/students', {
	id: "0",
	user_name: "user",
	password: "pass",
	first_name: "Wade",
	last_name: "McMillan",
	email: "wade@mail.com",
	gender: "Male",
  });
}

new Vue({
	router,
	data,
	render: h => h(App)
}).$mount("#app");
