class Porter{

    constructor(){
        this.PERFECTIVEGROUND =  /((ив|ивши|ившись|ыв|ывши|ывшись)|((?<=[ая])(в|вши|вшись)))$/;
        this.REFLEXIVE = /(с[яь])$/;
        this.ADJECTIVE = /(ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею)$/;
        this.PARTICIPLE = /((ивш|ывш|ующ)|((?<=[ая])(ем|нн|вш|ющ|щ)))$/;
        this.VERB = /((ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю)|((?<=[ая])(ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)))$/;
        this.NOUN = /(а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/;
        this.RVRE = /^(.*?[аеиоуыэюя])(.*)$/;
        this.DERIVATIONAL = /.*[^аеиоуыэюя]+[аеиоуыэюя].*ость?$/;
        this.DER = /ость?$/;
        this.SUPERLATIVE = /(ейше|ейш)$/;
        this.I = /и$/;
        this.P = /ь$/;
        this.NN = /нн$/;
    }

	stem(word){
		word = word.toLowerCase();
		word = word.replace('ё', 'е');
		const m = word.match(this.RVRE);
		if(m){
			const pre = m[1];
			var rv = m[2];
			var temp = rv.replace(this.PERFECTIVEGROUND, '');
			if (temp == rv){
                rv = rv.replace(this.REFLEXIVE, '');
				temp = rv.replace(this.ADJECTIVE, '')
				if (temp != rv){
                    rv = temp
					rv = rv.replace(this.PARTICIPLE, '');
                }					
				else{
                    temp = rv.replace(this.VERB, '');
					if (temp == rv)
						rv = rv.replace(this.NOUN, '');
					else
						rv = temp
                }	
            }
			else
				rv = temp
			
			rv = rv.replace(this.I, '');

			if (rv.match(this.DERIVATIONAL))
				rv = rv.replace(this.DER, '');
			temp = rv.replace(this.P, '');
			if (temp == rv){
                rv = rv.replace(this.SUPERLATIVE);
				rv = rv.replace(this.NN, 'н');
            }				
			else
				rv = temp;
            word = pre+rv;
        }
        return word
    }
}

module.exports = new Porter();
