function Organization(id, name) {
	this.id = id;
	this.name = name;
	this.credits = 0;
	this.is_corporation = false;//An organization may only be a corporation, holding company, government or political party
	this.is_holding_company = false;//Possibly have one company hold other companies
	
	//Government
	this.is_government = false;
	this.is_political_party = false;
	this.is_dictatorship = false;
	this.is_republic = false;
	//Sub Government Properties
	this.is_military = false;
	this.is_navy = false;
	this.is_intelligence = false;
	this.is_research = false;
	this.force_limit = 0;
	
	this.leader_title = "";
	this.leader = undefined;
	this.tax_property = 5;
	this.tax_sales = 5;
	
	if (console_debug_verbose) {
		console.log("Created new organization " + this.name);
	}
	
	//Subfactions
	this.intelligence = undefined;
	this.military = undefined;
	this.navy = undefined;
	this.research = undefined;
	
	//Corporation Stats
	this.assets = [];//Array to Items
	
	//Government Stats
	this.stability = 1;
	this.has_core_on_cities = [];
}