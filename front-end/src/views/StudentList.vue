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
			class="selectable" @click="$selectStudent(student.id)">
			<td><p class="link">{{ student.id }}</p></td>
			<td>{{ student.user_name }}</td>
			<td>{{ student.first_name }}</td>
			<td>{{ student.last_name }}</td>
			<td>{{ student.gender }}</td>
			<td>{{ student.email }}</td>
		</tr>
	</table>
	
	<h3 style="text-decoration:underline; padding-top:2%">Register a New Student</h3>
	<label for="studentId">Student ID: </label>
	<input type="text" id="studentId" name="studentId" placeholder="Student ID" v-model="studentId"/>
	<br/><br/>
	<label for="username">Username: </label>
	<input type="text" id="username" name="username" placeholder="Username" v-model="username"/>
	<br/><br/>
	<label for="password">Password: </label>
	<input type="text" id="password" name="password" placeholder="Password" v-model="password"/>
	<br/><br/>
	<label for="firstName">First Name: </label>
	<input type="text" id="firstName" name="firstName" placeholder="First Name" v-model="firstName"/>
	<br/><br/>
	<label for="lastName">Last Name: </label>
	<input type="text" id="lastName" name="lastName" placeholder="Last Name" v-model="lastName"/>
	<br/><br/>
	<label for="gender">Gender: </label>
	<input type="text" id="gender" name="gender" placeholder="Gender" v-model="gender"/>
	<br/><br/>
	<label for="email">Email: </label>
	<input type="text" id="email" name="email" placeholder="Email" v-model="email"/>
	<br/><br/>
	<button style="margin-bottom:2%" @click="addStudent()">Submit</button>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'StudentList',
  data() {
	return {
		studentID: "",
		username: "",
		firstName: "",
		lastName: "",
		gender: "",
		email: "",
		password: ""
	}
  },
  created() {
    this.$getStudents();
	this.$getClasses();
	this.$getProfessors();
	this.$getGrades();
  },
  methods: {
	async addStudent() {
		//check to verify the form has been filled out entirely
		if(this.studentId == "")
			alert("Please enter a student ID.");
		else if(this.username == "")
			alert("Please enter a username.");
		else if(this.password == "")
			alert("Please enter a password.");
		else if(this.firstName == "")
			alert("Please enter a first name.");
		else if(this.lastName == "")
			alert("Please enter a last name.");
		else if(this.email == "")
			alert("Please enter an email.");
		else if(this.gender == "")
			alert("Please enter a gender.");
		else {
			//now we can push to the api
			await axios.post('/api/students', {
				id: this.studentId,
				user_name: this.username,
				password: this.password,
				first_name: this.firstName,
				last_name: this.lastName,
				email: this.email,
				gender: this.gender
			});
			window.location.reload(false); //reload
		}
	}
  }
}
</script>


<style scoped>

</style>
