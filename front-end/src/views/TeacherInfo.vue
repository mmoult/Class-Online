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
				<p class="link" @click="selectClass(myClass.class_id)">
				{{ myClass.class_name }}
				</p>
			</td>
			<td>{{ myClass.class_hour }}</td>
			<td>{{ myClass.class_day }}</td>
		</tr>
	  </table>
	</div>

</div>



</template>

<script>
import axios from 'axios';
export default {
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
    selectClass(id) {
	  console.log("HELLO " + id);
	  this.$router.push({name: 'ClassInfo', params: { id: id}});
	}
  },
  computed: {
    currentTeacher() {
      console.log(this.$root.$data.teachers.filter(teacher => teacher.id === Number(this.$route.params.id)));
      return this.$root.$data.teachers.filter(teacher => teacher.id === Number(this.$route.params.id))[0];
    },
	classes() {
	  let myClasses = this.$root.$data.classes.filter(classe => classe.prof_id === Number(this.$route.params.id));
    console.log(myClasses)
	  return myClasses;
	}
  }
}
</script>


<style scoped>

</style>
