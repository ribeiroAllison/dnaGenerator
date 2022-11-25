// Context: You’re part of a research 
// team that has found a new mysterious organism at 
// the bottom of the ocean near hydrothermal vents. Your 
// team names the organism, Pila aequor (P. aequor), 
// and finds that it is only comprised of 15 DNA 
// bases. The small DNA samples and frequency at which
//  it mutates due to the hydrothermal vents make 
//  P. aequor an interesting specimen to study. 
//  However, P. aequor cannot survive above sea 
//  level and locating P. aequor in the deep sea 
//  is difficult and expensive. Your job is to 
//  create objects that simulate the DNA of 
//  P. aequor for your research team to study.




// Constructor for the simulate organism, returns an object with ID, DNA base and functions
const pAequorFactory = (num, dnaBase) =>{
    return {
        _specimenNum: num,
        _dna: dnaBase,

        // change one letter of the base DNA 
        mutate () {
            let indexToMutate = Math.floor(Math.random()* (this._dna.length));
            let baseToMutate = this._dna[indexToMutate];
            let randomIndex = Math.floor(Math.random() * 3);
            const mutantGeneA = ['T', 'C', 'G'];
            const mutantGeneC = ['A', 'T', 'G'];
            const mutantGeneG = ['A', 'C', 'T'];
            const mutantGeneT = ['A', 'C', 'G'];
            
            switch (baseToMutate){

                case ("A"):  this._dna[indexToMutate] = mutantGeneA[randomIndex];
                break;
                case ("C"):  this._dna[indexToMutate] = mutantGeneC[randomIndex];
                break;
                case ("G"):  this._dna[indexToMutate] = mutantGeneG[randomIndex];
                break;
                case ("T"):  this._dna[indexToMutate] = mutantGeneT[randomIndex];
                break;
            }
        },

        // compares two organism and returns the percentage of igual DNA bases. It is considered iqual if both letter and position are the same on both bases
        compareDna (pAequor) {
            let iqualGenes = 0;
            for(let i = 0; i < this._dna.length; i++){
                if(pAequor._dna[i] === this._dna[i]){
                    iqualGenes +=1;
                }
            }
            let iqualPercentage = iqualGenes / this._dna.length;
            console.log(`specimen #${this._specimenNum} and specimen #${pAequor._specimenNum} have ${(Math.round(iqualPercentage * 100))}% DNA in common.`);
        },

        // the organism has a higher survivor rate if its base is composed of at least 60% of 'C's and 'G's,
        // this function checks this and returns true if it does
        willLikelySurvive () {
            let geneCount = 0;
            for(genes of this._dna){
                if(genes === 'C' || genes === 'G'){
                    geneCount += 1;
                }
            }
            if((geneCount / this._dna.length) >= 0.6){
                return true;
            } else{
                return false;
            }
            
        }
    }
}



// this function generates an x number of survivors based on willLikelySurvive () criteria
const generateSurvivors = numSurvivors => {
    // Returns a random DNA base
    const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
}
    // provides a random DNA base receiving the number of base letters as argument
    const generateDnaBase = (numBases) =>{
        let randomDna = []
        for(let i = 0; i < numBases; i++){
            randomDna.push(returnRandBase());
        }
        return randomDna;
    }

    // this function generates and x number of pAequor objects that pass the willLikelySurvive() test
    let survivorCandidates = [];
    let survivorList = [];
    while(survivorList < numSurvivors){
        for(i = 0; i < 500; i++){
            survivorCandidates.push(pAequorFactory(i, generateDnaBase(15)));
        }
        for(candidate of survivorCandidates){
            if(candidate.willLikelySurvive() === true && survivorList.length < numSurvivors){
                survivorList.push(candidate);
            }
        }
    }
    return survivorList;
}

let survivor = generateSurvivors(30);

console.log(survivor);





