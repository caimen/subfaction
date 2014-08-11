function Item(id, name, type) {
	//My perhaps silly way of doing inheritance in javascript, LOL I HAVE NO IDEA WHAT I'M DOING -DOG
	switch (type) {
		case "wearable": 
			this.attack = 0;
			this.defense = 0;			//Defense rating
			this.shield = 0;			
			this.shield_recharge = 0;	//How many ticks it take to recharge shield
			this.speed = 0;
			this.maneuver = 0;
			this.phsyical_resistance = 0;
			this.projectile_resistance = 0;
			this.rail_resistance = 0;
			this.phase_resistance = 0;
			
			this.is_wearable_head = false;
			this.is_wearable_neck = false;
			this.is_wearable_torso = false;
			this.is_wearable_waist = false;
			this.is_wearable_legs = false;
			this.is_wearable_feet = false;
			this.is_wearable_hands = false;
			break;
		case "mineral":
			this.value = 0;
			break;
			
		case "holdable":
			this.is_weapon = false;
			break;
		case "blueprint": 			
			this.is_original = false;
			this.tech_level = 0;//Item Improvements
			this.production_level = 0;//Maximum 10 for 10% improved material usage
			this.research_level = 0;//Maximum 10 for next level item
			this.ticks = 1;//Amount of ticks it takes to construct
			
			//Mineral Costs
			this.mercadium = 0;
			this.torphyte = 0;
			this.zenophyte = 0;
			this.cylocyte = 0;
			this.psytanium = 0;
			this.ipsogen = 0;
			this.zorphyte = 0;
			this.nytonium = 0;
			this.setMineralCosts = function(mercadium, torphyte, zenophyte, cylocyte, psytanium, ipsogen, zorphyte, nytonium) {
				this.mercadium = mercadium;
				this.torphyte = torphyte;
				this.zenophyte = zenophyte;
				this.cylocyte = cylocyte;
				this.psytanium = psytanium;
				this.ipsogen = ipsogen;
				this.zorphyte = zorphyte;
				this.nytonium = nytonium;
			}
			
			break;
	}
	this.id = id;
	this.name = name;
	this.type = type;
	this.description = "";
	this.quantity = 1;
	this.weight = 1;//Default weight to 1 for now
	this.volume = 0.01;
	this.image = undefined;
	
	this.examine = function() {
		
		$("#item_name").html("");
		$("#item_description").html("");
		$("#item_properties").html("");
		$("#item_image").html("");
		
		//$('#item_dialog').prop('title', this.name + " (" + this.type + ") [" + this.quantity + "]");
		$("#item_name").append("<strong>" + this.name + "</strong> (" + this.type + ") [" + this.quantity + "]");
		$("#item_description").append(this.description);
		if (this.image !== undefined) {
			$("#item_image").append('<a target="_blank" href="' + images[this.image].page_url + '"><img style="max-width: 160px; max-height: 160px;" src="' + images[this.image].image_url + '" alt="' + images[this.image].attribution + '" title="' + images[this.image].attribution + '" /></a>');
		}
		
		//Properties
		if (this.type == "blueprint") {
			$("#item_properties").append("<li>Original: " + this.is_original + "</li>");
			$("#item_properties").append("<li>Tech Level: " + this.tech_level + "</li>");
			$("#item_properties").append("<li>Production Level: " + this.production_level + "</li>");
			$("#item_properties").append("<li>Research Level: " + this.research_level + "</li>");
			$("#item_properties").append("<li>Production Time: " + this.ticks + " ticks</li>");
		}
		else if (this.type == "wearable") {
			$("#item_properties").append("<li>Attack: " + this.attack + "</li>");
			$("#item_properties").append("<li>Defense: " + this.defense + "</li>");
			$("#item_properties").append("<li>Shield: " + this.shield + "</li>");
			$("#item_properties").append("<li><span alt=\"How long it takes this item's shield to recharge.\" title=\"How long it takes this item's shield to recharge.\">Shield Recharge: " + this.shield_recharge + "</span></li>");
			$("#item_properties").append("<li>Speed: " + this.speed + "</li>");
			$("#item_properties").append("<li>Maneuver: " + this.maneuver + "</li>");
			$("#item_properties").append("<li>Physical Resistance: " + this.phsyical_resistance + "%</li>");
			$("#item_properties").append("<li>Projectile Resistance: " + this.projectile_resistance + "%</li>");
			$("#item_properties").append("<li>Rail Resistance: " + this.rail_resistance + "%</li>");
			$("#item_properties").append("<li>Phase Resistance: " + this.phase_resistance + "%</li>");
			
			$("#item_properties").append("<li>Wearable Head: " + this.is_wearable_head + "</li>");
			$("#item_properties").append("<li>Wearable Neck: " + this.is_wearable_neck + "</li>");
			$("#item_properties").append("<li>Wearable Torso: " + this.is_wearable_torso + "</li>");
			$("#item_properties").append("<li>Wearable Waist: " + this.is_wearable_waist + "</li>");
			$("#item_properties").append("<li>Wearable Legs: " + this.is_wearable_legs + "</li>");
			$("#item_properties").append("<li>Wearable Feet: " + this.is_wearable_feet + "</li>");
			$("#item_properties").append("<li>Wearable Hands: " + this.is_wearable_hands + "</li>");
		}
		$("#item_properties").append("<li>Weight: " + this.weight + "</li>");
		$("#item_properties").append("<li>Volume: " + this.volume + "</li>");
		
		//UI ready
		$("#item_dialog").dialog({ minWidth: 500 });
	}
}