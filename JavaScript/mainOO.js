class HashPropety{
    constructor(bits){
        self.bits = bits;
    }

    owp(originalMessage){
        var originalHash = md5(originalMessage);
        var originalHash_nbits = originalHash.substr(0, self.bits);
        var duplicateHash_nbits = "";
        var count = 0;
    
        while(originalHash_nbits != duplicateHash_nbits){
            count++;
            var lengthOfString = parseInt(Math.random() * (26 - 1) + 1);
            var randomMessage = randomString(lengthOfString);
            var duplicateHash = md5(randomMessage);
            duplicateHash_nbits = duplicateHash.substr(0, self.bits);
        }
    
        console.log("===\tONE WAY PROPERTY\t===")
        console.log("Original Message = " + originalMessage + "\tCorresponding Hash = " + originalHash);
        console.log("Duplicate Message = " + randomMessage + "\tCorresponding Hash = " + duplicateHash);
        console.log("Number Of Iterations = " + count + "\nNumber of corresponding bytes = " + self.bits);    
    }

    cfp() {
        var HashesExplored = [];
        var count = 0;
    
        while (true) {
            count++;
            var lengthOfString = parseInt(Math.random() * (26 - 1) + 1);
            var randomMessage = randomString(lengthOfString);
            var duplicateHash = md5(randomMessage);
            var duplicateHash_nbits = duplicateHash.substr(0, self.bits);
    
            for (var i = 0; i < HashesExplored.length; i++) {
                var dado = HashesExplored[i];
                if (duplicateHash_nbits == dado.duplicateHash_nbits && dado.randomMessage != randomMessage) {
                    collidingHash = md5(dado.randomMessage);
                    console.log("===\tCOLLISION FREE PROPERTY\t===")
                    console.log("Message 1 = " + randomMessage + "\tCorresponding Hash = " + duplicateHash);
                    console.log("Message 2 = " + dado.randomMessage + "\tCorresponding Hash = " + collidingHash);
                    console.log("Number Of Iterations = " + count + "\nNumber of corresponding bytes = " + self.bits);
                    return;
                }
            }
    
            HashesExplored.push({ duplicateHash_nbits, randomMessage });
        }
    }
};


/**
 * Gera uma string randômica com o tamanho correspondente ao informado
 * @param {*} length 
 */
function randomString(length) {
	var text = "";
	for (var i = 0; i < length; i++) {		
		text += String.fromCharCode(parseInt(Math.random() * (126 - 33) + 33))
	}
	return text;
}

var nBits = 5;
var h = HashPropety(nBits);
var start = Date.now();
h.cfp();
var finish = Date.now() - start;
console.log("CFP => Tempo de execução: " + finish + "ms\n");

start = Date.now();
h.owp(randomString(10));
finish = Date.now() - start;
console.log("OWP => Tempo de execução: " + finish + "ms\n");