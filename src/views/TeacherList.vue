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
				class="selectable" @click="selectTeacher(teacher.id)">
				<td><p class="link">{{ teacher.id }}</p></td>
				<td>{{ teacher.first_name }}</td>
				<td>{{ teacher.last_name }}</td>
				<td>{{ teacher.gender }}</td>
				<td>{{ teacher.email }}</td>
			</tr>
	</table>
</div>
</template>


<script>
export default {
  name: 'StudentList',
  methods: {
	selectTeacher(id) {
	  console.log("HELLO " + id);
	  this.$router.push({name: 'TeacherInfo', params: { id: id}});
	}
  }
}
</script>


<style scoped>

</style>
