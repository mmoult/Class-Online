<template>
<div>
	<h2>{{currentClass.class_name}}</h2>
	<p>Class ID: {{currentClass.class_id}}</p>
	<p>Class Days: {{currentClass.class_day}}</p>
	<p>Class Hour: {{currentClass.class_hour}}</p>
	<span style="display:flex; width:100%; justify-content:center;">
	  <p>Professor:</p>
	  <p class="link" style="margin-left:5px" @click="selectTeacher(currentProfessor.id)">
	    {{currentProfessor.first_name}} {{currentProfessor.last_name}}
	  </p>
	</span>
	<br/>
	<h3 style="text-decoration:underline">Students Enrolled</h3>

	<div v-if="currentStudents.length == 0">
	  <p>No Students!</p>
	</div>
	<div v-else>
  <table style="width:100%">
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Grade</th>
  </tr>
  <tr v-for="myStudent in currentStudents" :key="myStudent"
    class="selectable">
    <td>
      <p class="link" @click="selectStudent(myStudent.student.id)">
      {{ myStudent.student.first_name}}
      </p>
    </td>
    <td>
      <p class="link" @click="selectStudent(myStudent.student.id)">
      {{ myStudent.student.last_name}}
      </p>
    </td>
    <td>{{ myStudent.student.email }}</td>
    <td>{{ myStudent.grade }}</td>
  </tr>
  </table>
	</div>

</div>
</template>


<script>
export default {
  methods: {
    selectStudent(id) {
	  console.log("HELLO " + id);
	  this.$router.push({name: 'StudentInfo', params: { id: id}});
	},
	selectTeacher(id) {
	  console.log("HELLO " + id);
	  this.$router.push({name: 'TeacherInfo', params: { id: id}});
	}
  },
  created() {
    this.getClasses();
	this.getProfessors();
	this.getStudents();
	this.getGrades();
  },
  computed: {
    currentClass() {
      return this.$root.$data.classes.filter(classe => classe.class_id === Number(this.$route.params.id))[0];
    },
    currentProfessor() {
	  let theClass = this.$root.$data.classes.filter(classe => classe.class_id === Number(this.$route.params.id))[0];
      console.log(this.$root.$data.teachers.filter(professor => professor.id === theClass.prof_id))
      return this.$root.$data.teachers.filter(professor => professor.id === theClass.prof_id)[0];
    },
  	currentStudents() {
	  let myGrades = this.$root.$data.grades.filter(grade => grade.class_id === Number(this.$route.params.id));
      let myStudents = [];
      for(let i=0; i<myGrades.length; i++) {
        for(let j=0; j<this.$root.$data.students.length; j++) {
    	  if(myGrades[i].id === this.$root.$data.students[j].id) {
      	    myStudents.push({grade: myGrades[i].grade, student:this.$root.$data.students[j]});
          }
        }
  	  }
      console.log(myGrades);
      console.log(myStudents);
      return myStudents;
    }
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
  }
}
</script>


<style scoped>

</style>
