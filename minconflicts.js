/*
	Benjamin Vacha
*/

var minConflictMaxSteps = 1000;

function minConflicts(subjects, setMessage, setComplete) {
	//minConflictFisherYates(subjects);
	//minConflictBigSmall(subjects);
	//
	for(var i=0; i<subjects.length; i++) {
		subjects[i].setDomain( minConflictDomain(subjects[i]) );
		subjects[i].update();
	}
	//
	setTimeout(minConflictsWhile, 10, subjects, minConflictMaxSteps, setMessage, setComplete);
}

function minConflictsWhile(subjects, steps, setMessage, setComplete) {
	if(steps==0) {
		setMessage("Solution could not be found");
		setComplete();
		return -1;
	} else {
		setMessage("Try " + (minConflictMaxSteps-steps));
	}
	var conflicted = minConflictGetConflicted(subjects);
	if(!conflicted.length) {
		setMessage("Solution found in " + (minConflictMaxSteps-steps) + " steps");
		setComplete();
		return minConflictMaxSteps-steps;
	}
	var subject = conflicted[Math.floor(Math.random() * conflicted.length)];
	/* solution 1 to stalls */
	if(Math.random()*(subject.tries-16+(subject.tries%8)) > 1) {
		subject = conflicted[Math.floor(Math.random() * conflicted.length)];
		if(subject.tries%4) { minConflictFisherYates(subject.domains); }
		else if(subject.tries%9) { 
			subject.modify();
			minConflictFisherYates(subject.domains)
		}
	}
	if(Math.random()*(subject.tries-36-(subject.tries%32)) > 1) {
		subject = subjects[Math.floor(Math.random() * subjects.length)];
		minConflictFisherYates(subject.domains);
	}
	/* end solution 1 */
	subject.tries++;
	subject.setDomain( minConflictDomain(subject) );
	subject.update();
	setTimeout(minConflictsWhile, 10, subjects, --steps, setMessage, setComplete);
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
		} else if(count == 0 && Math.random() > .15) {
			return bestDomain;
		}
	}
	//
	if(Math.random()*bestDomain.tries>4) {
		bestDomain = subject.domains[Math.floor(Math.random() * subject.domains.length)];
	}
	bestDomain.tries++;
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

function minConflictBigSmall(myArray) {
	myArray.sort( function(a, b) {
		return (b.width*b.length) - (a.width*a.length);
	} );
}







