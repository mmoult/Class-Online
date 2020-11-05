<template>
<div id="app">
	<h1>Class Online</h1>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/classes">Classes</router-link> |
		<router-link to="/teachers">Teachers</router-link> |
		<router-link to="/students">Students</router-link> 
    </div>
    <router-view />
	<div>
		<hr/>
		<p class="centered">©2020 Wade McMillan and Matthew Moulton <br/>
			<a class="centered" href='https://github.com/mmoult/Class-Online'> 
				<img id='icon' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2017%2F03%2F07%2F880593_media_512x512.png&f=1&nofb=1"/>
			</a>
		</p>
	</div>
</div>
</template>

<style>
#icon {
	width: 35px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #B3FFFF;
  padding: 15px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
