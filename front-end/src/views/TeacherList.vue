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
			class="selectable" @click="$selectTeacher(teacher.id)">
			<td><p class="link">{{ teacher.id }}</p></td>
			<td>{{ teacher.first_name }}</td>
			<td>{{ teacher.last_name }}</td>
			<td>{{ teacher.gender }}</td>
			<td>{{ teacher.email }}</td>
		</tr>
	</table>
	<h3 style="text-decoration:underline; padding-top:2%">Register a New Teacher</h3>
	<label for="prof_id">Student ID: </label>
	<input type="text" id="prof_id" name="prof_id" placeholder="Professor ID" v-model="prof_id"/>
	<br/><br/>
	<label for="first_name">First Name: </label>
	<input type="text" id="first_name" name="first_name" placeholder="First Name" v-model="first_name"/>
	<br/><br/>
	<label for="last_name">Last Name: </label>
	<input type="text" id="last_name" name="last_name" placeholder="Last Name" v-model="last_name"/>
	<br/><br/>
	<label for="email">Email: </label>
	<input type="text" id="email" name="email" placeholder="Email" v-model="email"/>
	<br/><br/>
	<label for="gender">Gender: </label>
	<input type="text" id="gender" name="gender" placeholder="Gender" v-model="gender"/>
	<br/><br/>
	<label for="years_teaching">Years Teaching: </label>
	<input type="text" id="years_teaching" name="years_teaching" placeholder="Years Teaching" v-model="years_teaching"/>
	<br/><br/>
	<label for="age">Age: </label>
	<input type="text" id="age" name="age" placeholder="Age" v-model="age"/>
	<br/><br/>
	<label for="salary">Salary: </label>
	<input type="text" id="salary" name="salary" placeholder="Salary" v-model="salary"/>
	<br/><br/>

	<button style="margin-bottom:2%" @click="addTeacher()">Submit</button>
	</div>
	</template>


<script>
import axios from 'axios';
export default {
  name: 'TeacherList',
  data() {
	return {
		prof_id: "",
		first_name: "",
		last_name: "",
		email: "",
		gender: "",
		years_teaching: "",
		age: "",
		salary: ""
	}
  },
  created() {
    this.$getStudents();
	this.$getClasses();
	this.$getProfessors();
	this.$getGrades();
  },
  methods: {
	async addTeacher() {
		//check to verify the form has been filled out entirely
		if(this.prof_id == "")
			alert("Please enter a Professor ID.");
		else if(this.firstName == "")
			alert("Please enter a first name.");
		else if(this.lastName == "")
			alert("Please enter a last name.");
		else if(this.email == "")
			alert("Please enter an email.");
		else if(this.gender == "")
			alert("Please enter a gender.");
		else if(this.years_teaching == "")
			alert("Please enter  years taught.");
		else if(this.age == "")
			alert("Please enter an age.");
		else if(this.salary == "")
			alert("Please enter a salary.");
		else {
			//now we can push to the api
			await axios.post('/api/professors', {
			id: this.prof_id,
			first_name: this.first_name,
			last_name: this.last_name,
			email: this.email,
			gender: this.gender,
			years_teaching: this.years_teaching,
			age: this.age,
			salary: this.salary
			});
			window.location.reload(false); //reload
		}
	}
  }
}

</script>


<style scoped>

</style>
