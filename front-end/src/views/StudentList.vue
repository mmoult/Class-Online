<template>
<div>
	<h2>Student Roster</h2>
	<table style="width:100%">
		<tr>
			<th>ID</th>
			<th>Username</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Gender</th>
			<th>Email</th>
		</tr>
		<tr v-for="student in this.$root.$data.students" :key="student"
			class="selectable" @click="selectStudent(student.id)">
			<td><p class="link">{{ student.id }}</p></td>
			<td>{{ student.user_name }}</td>
			<td>{{ student.first_name }}</td>
			<td>{{ student.last_name }}</td>
			<td>{{ student.gender }}</td>
			<td>{{ student.email }}</td>
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
    selectStudent(id) {
	  console.log("HELLO " + id);
	  this.$router.push({name: 'StudentInfo', params: { id: id}});
	},
  }
}
</script>


<style scoped>

</style>
