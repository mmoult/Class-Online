<template>
<div>
	<h2>Teacher Roster</h2>
	<table style="width:100%">
		<tr class="selectable">
			<th>ID</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Gender</th>
			<th>Email</th>
		</tr>
		<tr v-for="teacher in this.$root.$data.teachers" :key="teacher"
			class="selectable" @click="selectTeacher(teacher.id)">
			<td><p class="link">{{ teacher.id }}</p></td>
			<td>{{ teacher.first_name }}</td>
			<td>{{ teacher.last_name }}</td>
			<td>{{ teacher.gender }}</td>
			<td>{{ teacher.email }}</td>
		</tr>
	</table>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'StudentList',
  created() {
    this.getClasses();
	this.getStudents();
	this.getProfessors();
	this.getGrades();
  },
  methods: {
    async getClasses() {
	  try {
        let response = await axios.get("/api/classes");
        this.classes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
	async getProfessors() {
	  try {
        let response = await axios.get("/api/professors");
        this.professors = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
	},
	async getStudents() {
	  try {
        let response = await axios.get("/api/students");
        this.students = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
	},
	async getGrades() {
	  try {
        let response = await axios.get("/api/grades");
        this.grades = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
	},
	selectTeacher(id) {
	  console.log("HELLO " + id);
	  this.$router.push({name: 'TeacherInfo', params: { id: id}});
	}
  }
}
</script>


<style scoped>

</style>
