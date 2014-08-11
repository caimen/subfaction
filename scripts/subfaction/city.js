function City(id, planet, image) {
	this.id = id;
	this.name = chance.city();
	this.planet = planet;
	this.locations = [];//Pointer integer back to global locations array
	this.population = chance.integer({min: 100000, max: 300000});
	this.x = chance.integer({min: 0, max: 80000});//Need to make sure coordinates don't wreck into eacother on the same planet eventually
	this.y = chance.integer({min: 0, max: 80000});
	this.image = image;
	this.border_north = undefined;
	this.border_north_distance = undefined;
	this.border_east = undefined;
	this.border_east_distance = undefined;
	this.border_south = undefined;
	this.border_south_distance = undefined;
	this.border_west = undefined;
	this.border_west_distance = undefined;
	this.is_capital = false;
	this.description = "";
	this.cores = [];//Any nation that has owned this city for more than 50 years has a core on it.
	this.nation = undefined;//Cities sovereign controller.
	this.occupied = undefined;//Only defined when militarily occupied.
	if (console_debug_verbose) {
		console.log("Created new city " + this.name);
	}
	
	this.examine = function() {
		
		$("#city_name").html("");
		$("#city_description").html("");
		$("#city_properties").html("");
		$("#city_image").html("");
		
		if (this.is_capital) {
			if (organizations[this.nation].is_republic) {
				this.description = "This city is the capital city of the Republic of " + organizations[this.nation].name + ". ";
			}
			else {
				this.description = "This city is the capital city of the Nation of " + organizations[this.nation].name + ". ";
			}
		}
		else {
			if (organizations[this.nation].is_republic) {
				this.description = "This city is the sovereign territory of the Republic of " + organizations[this.nation].name + ". ";
			}
			else {
				this.description = "This city is the sovereign territory of the Nation of " + organizations[this.nation].name + ". ";
			}
		}
		
		$("#city_name").append("<strong>" + this.name + "</strong>");
		$("#city_description").append(this.description);
		if (this.image !== undefined) {
			$("#city_image").append('<a target="_blank" href="' + images[this.image].page_url + '"><img style="max-width: 160px; max-height: 160px;" src="' + images[this.image].image_url + '" alt="' + images[this.image].attribution + '" title="' + images[this.image].attribution + '" /></a>');
		}
		
		//Properties
		$("#city_properties").append("<li>Population: " + this.population + "</li>");
		
		//UI ready
		$("#city_dialog").dialog({ minWidth: 500 });
		

	}
	
	this.updateLocationUI
}