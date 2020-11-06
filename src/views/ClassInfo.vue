<template>
<div>
	<h2>{{currentClass.class_name}}</h2>
	<p>Class ID: {{currentClass.class_id}}</p>
	<p>Class Days: {{currentClass.class_day}}</p>
	<p>Class Hour: {{currentClass.class_hour}}</p>
  <span>Professor: <p class="link" @click="selectProfessor(currentProfessor.id)">{{currentProfessor.first_name}} {{currentProfessor.last_name}}</p> </span>
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
      this.$root.$data.$clickId = id;
      this.$router.push('/student');
    },
    selectTeacher(id) {
  	  console.log("HELLO " + id);
  	  this.$root.$data.$clickId = id;
  	  this.$router.push('/teacher');
  	}
  },
  computed: {
    currentClass() {

      return this.$root.$data.classes.filter(classe => classe.class_id === this.$root.$data.$clickId)[0];
    },
    currentProfessor() {
      console.log("3");
      console.log(this.$root.$data.teachers.filter(professor => professor.id === this.$root.$data.classes.filter(classe => classe.class_id === this.$root.$data.$clickId)[0].prof_id))
      return this.$root.$data.teachers.filter(professor => professor.id === this.$root.$data.classes.filter(classe => classe.class_id === this.$root.$data.$clickId)[0].prof_id)[0];
    },
  	currentStudents() {
  	  let myGrades = this.$root.$data.grades.filter(grade => grade.id === this.$root.$data.$clickId);
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
    }
}
</script>


<style scoped>

</style>
