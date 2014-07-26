function Planet(name, system) {
	this.name = name;
	this.cities = [];//Pointer integer back to global cities array
	this.system = system;
	this.type = chance.pick(['terran', 'oceanic', 'volcanic', 'gas', 'desert', 'barren']);
	this.government = 0;//Link to Organization Array 0=Anarchy
	if (console_debug_verbose) {
		console.log("Created new planet " + this.name + " [" + this.type + "]");
	}
}