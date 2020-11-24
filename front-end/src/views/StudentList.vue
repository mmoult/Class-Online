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
</div>
</template>


<script>
export default {
  name: 'StudentList',
  created() {
    this.$getStudents();
	this.$getClasses();
	this.$getProfessors();
	this.$getGrades();
  },
}
</script>


<style scoped>

</style>
