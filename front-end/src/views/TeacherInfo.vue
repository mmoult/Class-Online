<template>
<div>
	<h2>{{currentTeacher.first_name}}  {{currentTeacher.last_name}}</h2>
	<p>Teacher ID: {{currentTeacher.id}}</p>
	<p>First Name: {{currentTeacher.first_name}}</p>
	<p>Last Name: {{currentTeacher.last_name}}</p>
	<p>Gender: {{currentTeacher.gender}}</p>
    <p>Age: {{currentTeacher.age}}</p>
	<p>Email: {{currentTeacher.email}}</p>
    <p>Years Teaching: {{currentTeacher.years_teaching}}</p>
	<p>Salary: {{currentTeacher.salary}}</p>
	<br/>
	<h3 style="text-decoration:underline">Classes Teaching</h3>

	<div v-if="classes.length == 0">
	  <p>No classes!</p>
	</div>
	<div v-else>
	  <table style="width:100%; padding:0 20%">
		<tr>
			<th>Course Name</th>
			<th>Hour</th>
			<th>Day</th>
		</tr>
		<tr v-for="myClass in classes" :key="myClass"
			class="selectable">
			<td>
				<p class="link" @click="$selectClass(myClass.class_id)">
				{{ myClass.class_name }}
				</p>
			</td>
			<td>{{ myClass.class_hour }}</td>
			<td>{{ myClass.class_day }}</td>
			<button @click="dropClass(myClass)" class="delete" style="margin-top:30%">X</button>
		</tr>
	  </table>
	</div>
	<h3>Teach a New Class</h3>
	<form>
	  <label for="class_id">Class Id:  </label>
	  <input type="text" id="class_id" v-model ="class_id" name="class_id"><br><br>
	  <label for="class_name">Class Name:</label>
	  <input type="text" id="class_name" v-model ="class_name" name="class_name"><br><br>
	  <label for="class_hour">Class Hour:  </label>
	  <input type="text" id="class_hour" v-model ="class_hour" name="class_hour"><br><br>
	  <label for="class_day">Class Day:</label>
	  <input type="text" id="class_day" v-model ="class_day" name="class_day"><br><br>
	</form>
	<button @click="addClass()">Submit</button>



<h3 style="text-decoration:underline; padding-top:2%">Other Options</h3>
<button style="margin-bottom:2%" @click="removeTeacher">Remove Teacher</button>

</div>

</template>

<script>
import axios from 'axios';
export default {
	data() {
	  return {
			class_id: "",
			class_name: "",
			class_hour: "",
			class_day: "",
		}
	},
  created() {
    this.$getClasses();
	this.$getStudents();
	this.$getProfessors();
	this.$getGrades();
  },
  computed: {
    currentTeacher() {
      console.log(this.$root.$data.teachers.filter(teacher => teacher.id == Number(this.$route.params.id)));
      return this.$root.$data.teachers.filter(teacher => teacher.id == Number(this.$route.params.id))[0];
    },
	classes() {
	  let myClasses = this.$root.$data.classes.filter(classe => classe.prof_id == Number(this.$route.params.id));
	  return myClasses;
	}
  },
  methods: {
		async addClass() {
		if(this.class_id == "") {
			alert("Please enter a Class Id.");
			return;
		}
		if(this.class_name == "") {
			alert("Please enter a Class Name.");
			return;
		}
		if(this.class_hour == "") {
			alert("Please enter a Class Hour.");
			return;
		}
		if(this.class_day == "") {
			alert("Please enter a Class Day.");
			return;
		}
			await axios.post('/api/classes', {
				id: this.class_id,
				class_name: this.class_name,
				prof_id: this.$route.params.id,
				class_hour: this.class_hour,
				class_day: this.class_day,
			});
			window.location.reload(false);
		},
		async dropClass(myClass) {
			if(confirm("Are you sure you want to drop " + myClass.class_name + "?")) {
				await axios.delete('/api/classes/'+myClass.class_id);
			window.location.reload(false); //reload
			}
		},
		async removeTeacher() {
			if(confirm("Are you sure you want to remove " +
				this.currentTeacher.first_name +" "+ this.currentTeacher.last_name + "?")) {
			  await axios.delete('/api/professors/'+this.$route.params.id);
			  await axios.delete('/api/classes/id/'+this.$route.params.id);
			  this.$router.push({name: 'TeacherList'});
			}
		}
	}
  }

</script>


<style scoped>

</style>
