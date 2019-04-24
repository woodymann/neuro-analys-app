const brain = require('brain.js')
const trainData = require('../../trainData')

class Brain{
    constructor(){

        const config = {
            binaryThresh: 0.5,
            hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
            activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
            leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
        };

        this.net = new brain.NeuralNetwork(config);

        this.net.train(trainData);
    }

    run(per){
        return this.net.run({ per });
    }
}

module.exports = Brain;