function System() {
	this.name = chance.pick(['Sol', 'Wolf 359', 'Alpha Centauri', 'Beta Sphinx', 'Taurus', 'Aquarius', 'Leo', 'Oasis', 'Omega Sagittarius', 'Hydra', 'Pegasus', 'Orion']);
	this.planets = [];//Pointer back to planets array
	this.moons = [];
	if (console_debug_verbose) {
		console.log("Created new system " + this.name);
	}
} 