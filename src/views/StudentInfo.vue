<template>
<div>
<h2>{{currentStud.first_name}}  {{currentStud.last_name}}</h2>
<p>{{currentStud.first_name}}  {{currentStud.last_name}}</p>
</div>



</template>

<script>
export default {
  computed: {
    currentStud() {
      console.log(this.$root.$data.students.filter(student => student.id === this.$root.$data.$clickId));
      return this.$root.$data.students.filter(student => student.id === this.$root.$data.$clickId)[0];
    }
  }
}

</script>


<styles scoped>

</styles>
