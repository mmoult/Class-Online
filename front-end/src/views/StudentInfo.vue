Number(this.$route.params.id))<template>
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
	  <table style="width:100%; padding:0 15%">
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
				<p class="link" @click="$selectClass(myClass.class.class_id)">
				{{ myClass.class.class_name }}
				</p>
			</td>
			<td>
				<p class="link" @click="$selectTeacher(myClass.teacher.id)">
				{{ myClass.teacher.first_name }} {{ myClass.teacher.last_name }}
				</p>
			</td>
			<td>{{ myClass.grade }}</td>
			<td>{{ myClass.class.class_hour }}</td>
			<td>{{ myClass.class.class_day }}</td>
			<button @click="dropClass(myClass)" class="delete" style="margin-top:30%">X</button>
		</tr>
	  </table>
	</div>
	
	<h3 style="text-decoration:underline; padding-top:2%">Add a Class</h3>
	<p>
		Enter the class and grade to register the student for.<br/> A class can be found by the class ID. If you do not know the class
		ID,<br/> you may enter the course name and the system will try to find the correct course.
	</p>
	<form>
		<label for="classId">Class ID: </label>
		<input type="text" id="classId" name="classId" placeholder="Class ID" v-model="classId"/>
		<br/><br/>
		<label for="courseName">Course Name: </label>
		<input type="text" id="courseName" name="courseName" placeholder="Course Name" v-model="courseName" @blur="fillCourseName"/>
		<br/><br/>
		<label for="grade">Grade: </label>
		<input type="text" id="grade" name="grade" placeholder="Grade (0-100)" v-model="grade"/>
		<br/><br/>
	</form>
	<button @click="addClass()">Submit</button>
	
	<h3 style="text-decoration:underline; padding-top:2%">Other Options</h3>
	<button style="margin-bottom:2%" @click="removeStudent">Remove Student</button>
	
</div>



</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
		classId: "",
		courseName: "",
		grade: ""
	}
  },
  created() {
    this.$getClasses();
	this.$getStudents();
	this.$getProfessors();
	this.$getGrades();
  },
  computed: {
    currentStud() {
      return this.$root.$data.students.filter(student => student.id == Number(this.$route.params.id))[0];
    },
	classes() {
	  let grades = this.$root.$data.grades.filter(grade => grade.id == Number(this.$route.params.id));
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
	},
  },
  methods: {
    async fillCourseName() {
	  //find a matching course name
	  let result = await axios.get('/api/classes/find/'+this.courseName);
	  //great! This gives us an array of results. Hopefully, the user was smart, and there
	  //is only one. We select the first and plug in the data
	  if(result.data.length == 0) {
		alert("No class found by name '" + this.courseName + "'!");
		return;
	  }
	  this.classId = result.data[0].class_id;
	  this.courseName = result.data[0].class_name;
	  //console.log(result);
	},
	async addClass() {
		if(this.classId == "") {
		  await this.fillCourseName();
		}
		
		console.log(this.grade)
		if(this.grade == "") {
			alert("Please enter a grade.");
			return;
		}
		
		//now we can push to the api
		await axios.post('/api/grades', {
			id: this.$route.params.id,
			grade: this.grade,
			class_id: this.classId
		});
		window.location.reload(false); //reload
	},
	async dropClass(myClass) {
	  if(confirm("Are you sure you want to drop " + myClass.class.class_name + "?")) {
	    await axios.delete('/api/grades/'+this.$route.params.id+'/'+myClass.class.class_id);
		window.location.reload(false); //reload
	  }
	},
	async removeStudent() {
	  if(confirm("Are you sure you want to remove " +
			this.currentStud.first_name +" "+ this.currentStud.last_name + "?")) {
	    await axios.delete('/api/students/'+this.$route.params.id);
		await axios.delete('/api/grades/'+this.$route.params.id);
	    this.$router.push({name: 'StudentList'});
	  }
	}
  }
}
</script>


<style scoped>

</style>
