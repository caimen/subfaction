function Item(name, type) {
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
			
			this.is_wearable = false;	//You can wear it
			this.is_wearable_head = false;
			this.is_wearable_neck = false;
			this.is_wearable_torso = false;
			this.is_wearable_waist = false;
			this.is_wearable_legs = false;
			this.is_wearable_feet = false;
			this.is_wearable_hands = false;
			this.is_wearable_hands = false;
			break;
		case "mineral":
			this.value = 0;
			break;
			
		case "holdable":
			this.is_weapon = false;
			break;
		case "blueprint": 			
			this.is_blueprint_original = false;
			this.blueprint_production_level = 0;//Maximum 10 for 10% improved material usage
			this.blueprint_research_level = 0;//Maximum 10 for next level item
			this.blueprint_ticks = 1;//Amount of ticks it takes to construct
			
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
	this.name = name;
	this.type = type;
	this.quantity = 1;
	this.weight = 1;//Default weight to 1 for now
	this.volume = 0.01;
}