<template>
<div>
	<h2>Teacher Roster</h2>
		<table style="width:100%">
			<tr class="selectable">
				<th>ID</th>
				<th>Full Name</th>
			</tr>
			<tr v-for="teacher in this.$root.$data.teachers" :key="teacher"
				class="selectable">
				<td><p class="link" @click="selectTeacher(teacher.id)">
					{{ teacher.prof_id }}</p>
				</td>
				<td>{{ teacher.prof_name }}</td>
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
	  this.$root.$data.$clickId = id;
	  this.$router.push('/teacher');
	}
  }
}
</script>


<styles scoped>
.selectable:hover {
	background-color: #777777;
}
</styles>