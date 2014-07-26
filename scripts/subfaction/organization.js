function Organization() {
	this.name = chance.pick(['Obsidian Order', 'New Conglomerate', 'Tal Shiar', 'Doodle Dobble Incorparted', 'Acme Inc.']);
	this.credits = 0;
	this.is_corporation = false;//An organization may only be a corporation, holding company, government or political party
	this.is_holding_company = false;
	this.is_government = false;
	this.is_political_party = false;
	this.is_federal_government = false;//Possibly Many Planets?
	this.is_monarchy_government = false;
	this.is_republic_government = false;
	this.planets = [];	
	
	if (console_debug_verbose) {
		console.log("Created new organization " + this.name);
	}
	
	//Corporation Stats
	this.property = [];//Array to Items
	
	//Government Stats
	this.stability = 0;
	this.has_core_on_planets = [];
}