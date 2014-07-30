function City(planet) {
	this.name = chance.city();
	this.planet = planet;
	this.locations = [];//Pointer integer back to global locations array
	this.population = chance.integer({min: 50, max: 300000});
	this.cores = [];//Any nation that has owned this city for more than 50 years has a core on it.
	this.nation = undefined;//Cities sovereign controller.
	this.occupied = undefined;//Only defined when militarily occupied.
	if (console_debug_verbose) {
		console.log("Created new city " + this.name);
	}
	
	this.updateLocationUI
}