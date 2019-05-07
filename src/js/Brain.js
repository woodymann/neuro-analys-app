const brain = require('brain.js');
const trainData = require('../../trainData');
const infoTrainData =  require('../../infoTrainData');

class Brain{
    constructor(){

        const config = {
            binaryThresh: 0.5,
            hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
            activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
            leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
        };

        this.net = new brain.NeuralNetwork(config);
        this.infoNet = new brain.NeuralNetwork(config);

        this.net.train(trainData);
        this.infoNet.train(infoTrainData);        
    }

    run(per){
        this.netRes = this.net.run({ per });
        this.infoNetRes = this.infoNet.run({ per });

        return { output: this.netRes, info: this.infoNetRes};
    }

    getRes(per){
        const { output, info } = this.run(per);

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

        return { output, info: str };
    }


}

module.exports = Brain;