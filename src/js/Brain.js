const brain = require('brain.js');
const infoTrainData =  require('../../infoTrainData');

class Brain{
    constructor(){

        const config = {
            binaryThresh: 0.5,
            hiddenLayers: [3],     
            activation: 'sigmoid', 
            leakyReluAlpha: 0.01   
        };

        this.infoNet = new brain.NeuralNetwork(config);

        this.infoNet.train(infoTrainData);        
    }

    run(per){
        this.infoNetRes = this.infoNet.run({ per });

        return {info: this.infoNetRes};
    }

    getRes(per){
        const { info } = this.run(per);

        let max = 0;
        let maxRes = '';
        let str = '';

        for (let key in info){
            if(info[key] > max){                
                max = info[key];
                maxRes = key;
            }
        }

        switch(maxRes){
            case 'yes':
                str = 'документ подходит';
                break;
            case 'dif':
                str = 'данный документ не походит к этой группе специальностей';
                break;
            case 'com':
                str = 'данный документ не вносит ничего нового в эту групу специальностей';
                break;
        }        

        return { info: str };
    }


}

module.exports = Brain;