function Ship() {
	var s = Object();
	s.name = chance.pick(['Millenium Falcon', 'Enterprise', 'USS Defiant', 'Bird of Prey', 'A ship!']);
	s.hull = 0;//Object
	s.modules = [];
}