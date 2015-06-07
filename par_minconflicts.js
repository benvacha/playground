/*
	Benjamin Vacha
*/
/*
	Requires that subjects implement:
		var Domain[] domains;
		var Subject[] neighbors;
		void setDomain(Domain);
		void update();
*/

self.addEventListener('message', function(e) {
	minConflicts(e.data.subjects, true);
}, false);

function minConflicts(subjects, worker) {
	minConflictFisherYates(subjects);
	//
	for(var i=0; i<subjects.length; i++) {
		subjects[i].setDomain( minConflictDomain(subjects[i]) );
		subjects[i].update();
	}
	//
	var step = 1000;
	while(step--) {
		var conflicted = minConflictGetConflicted(subjects);
		if(!conflicted.length) { break; }
		var subject = conflicted[Math.floor(Math.random() * conflicted.length)];
		subject.setDomain( minConflictDomain(subject) );
		subject.update();
	}
	//
	if(typeof(Worker)!=="undefined" && worker) {
		self.postMessage({status: 0, steps: 1000-step-1, subjects: subjects});
		self.close();
	} else {
		return 1000-step-1;
	}
}


function minConflictDomain(subject) {
	var clone = subject.clone();
	var bestDomain = subject.domains[0];
	var bestCount = subject.domains.length;
	//
	for(var i=0; i<subject.domains.length; i++) {
		var count = 0;
		clone.setDomain(subject.domains[i]);
		//
		for(var j=0; j<subject.neighbors.length; j++) {
			if(clone.conflict(subject.neighbors[j])) { count++; }
		}
		//
		if(count < bestCount) {
			bestCount = count; bestDomain = subject.domains[i];
		} else if(count == bestCount && Math.random() > .5) {
			bestCount = count; bestDomain = subject.domains[i];
		} else if(count == 0 && Math.random() > .2) {
			return bestDomain;
		}
	}
	//
	return bestDomain;
}


function minConflictGetConflicted(subjects) {
	var conflicted = new Array();
	//
	for(var i=0; i<subjects.length; i++) {
		for(var j=0; j<subjects[i].neighbors.length; j++) {
			if( subjects[i].conflict(subjects[i].neighbors[j]) ) {
				conflicted.push(subjects[i]);
				break;
			}
		}
	}
	//
	return conflicted;
}

function minConflictFisherYates ( myArray ) {
	var i = myArray.length;
	if ( i == 0 ) return false;
	while ( --i ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		var tempi = myArray[i];
		var tempj = myArray[j];
		myArray[i] = tempj;
		myArray[j] = tempi;
	}
}








