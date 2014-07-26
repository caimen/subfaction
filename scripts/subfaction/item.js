function Item(name, type) {
	//My perhaps silly way of doing inheritance in javascript, LOL I HAVE NO IDEA WHAT I'M DOING -DOG
	switch (type) {
		case "wearable": 
			//this = new Item_Wearable(); break;
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
			this.type = "none";
			this.value = 0;
			break;
			
		//case "holdable": this = new Item_Holdable(); break;
		case "blueprint": 
			this.is_blueprint_original = false;
			this.blueprint_production_level = 0;//Maximum 10 for 10% improved material usage
			this.blueprint_research_level = 0;//Maximum 10 for next level item
			
			this.blueprint_ship = "";
			this.blueprint_wearable = "";
			this.blueprint_holdable = "";
			this.blueprint_building = "";
			break;
	}
	this.name = name;
	this.weight = 1;//Default weight to 1 for now
	this.volume = 0.01;
}