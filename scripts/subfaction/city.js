function City(planet) {
	this.name = chance.city();
	this.planet = planet;
	this.locations = [];//Pointer integer back to global locations array
	this.population = chance.integer({min: 50, max: 300000});
	if (console_debug_verbose) {
		console.log("Created new city " + this.name);
	}
	
	this.updateLocationUI
}