<template>
<div>
	<h2>Class Roster</h2>
		<table style="width:100%">
			<tr class="selectable">
				<th>ID</th>
				<th>Class Name</th>
        <th>Time Taught</th>
        <th>Days</th>
        <th>Professor ID</th>
			</tr>
			<tr v-for="classes in this.$root.$data.classes" :key="classes"
				class="selectable">
				<td><p class="link" @click="selectTeacher(classes.class_id)">
					{{ classes.class_id }}</p>
				</td>
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
