<template>
<div>
	<h2>{{currentStud.first_name}}  {{currentStud.last_name}}</h2>
	<p>Student ID: {{currentStud.id}}</p>
	<p>Username: {{currentStud.user_name}}</p>
	<p>Password: {{currentStud.password}}</p>
	<p>Email: {{currentStud.email}}</p>
	<p>Gender: {{currentStud.gender}}</p>
	<br/>
	<h3 style="text-decoration:underline">Enrolled Classes</h3>
	
	<div v-if="classes.length == 0">
	  <p>No classes!</p>
	</div>
	<div v-else>
	  <table style="width:100%">
		<tr>
			<th>Course Name</th>
			<th>Professor</th>
			<th>Grade</th>
			<th>Hour</th>
			<th>Day</th>
		</tr>
		<tr v-for="myClass in classes" :key="myClass"
			class="selectable">
			<td>
				<p class="link" @click="selectClass(myClass.class.class_id)">
				{{ myClass.class.class_name }}
				</p>
			</td>
			<td>
				<p class="link" @click="selectProfessor(myClass.teacher.id)">
				{{ myClass.teacher.first_name }} {{ myClass.teacher.last_name }}
				</p>
			</td>
			<td>{{ myClass.grade }}</td>
			<td>{{ myClass.class.class_hour }}</td>
			<td>{{ myClass.class.class_day }}</td>
		</tr>
	  </table>
	</div>
	
</div>



</template>

<script>
export default {
  computed: {
    currentStud() {
      console.log(this.$root.$data.students.filter(student => student.id === this.$root.$data.$clickId));
      return this.$root.$data.students.filter(student => student.id === this.$root.$data.$clickId)[0];
    },
	classes() {
	  let grades = this.$root.$data.grades.filter(grade => grade.id === this.$root.$data.$clickId);
	  let myClasses = [];
	  for(let i=0; i<grades.length; i++) {
		for(let j=0; j<this.$root.$data.classes.length; j++) {
		  if(grades[i].class_id === this.$root.$data.classes[j].class_id) {
		    let teacher = this.$root.$data.teachers.filter(teacher =>
			    teacher.id === this.$root.$data.classes[j].prof_id)[0];
			// at this point, we have the teacher, class, and grade
			// So we can create the class object
			myClasses.push({grade: grades[i].grade, teacher:teacher, class:this.$root.$data.classes[j]});
		  }
		}
	  }
	  return myClasses;
	}
  }
}
</script>


<style scoped>

</style>
