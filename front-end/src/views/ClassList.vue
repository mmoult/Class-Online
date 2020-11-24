<template>
<div>
	<h2>Class Roster</h2>
		<table style="width:100%">
			<tr>
				<th>ID</th>
				<th>Class Name</th>
				<th>Time Taught</th>
				<th>Days</th>
				<th>Professor ID</th>
			</tr>
			<tr v-for="classes in this.$root.$data.classes" :key="classes"
				class="selectable" @click="$selectClass(classes.class_id)">
				<td><p class="link">{{ classes.class_id }}</p></td>
				<td>{{ classes.class_name }}</td>
				<td>{{ classes.class_hour }}</td>
				<td>{{ classes.class_day }}</td>
				<td>{{ classes.prof_id }}</td>
			</tr>
	</table>
</div>
</template>


<script>
export default {
  name: 'StudentList',
  created() {
    this.$getClasses();
	this.$getStudents();
	this.$getProfessors();
	this.$getGrades();
  },
}
</script>


<style scoped>

</styles>
