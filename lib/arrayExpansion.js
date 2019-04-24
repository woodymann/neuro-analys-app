function arrayExpansion(){
    Array.prototype.getValue = function(val){
        
        const array = this;
        if(array.includes(val)){
            return array[array.indexOf(val)+1]
        }
        else return null;
    }

    Array.prototype.compare = function(){
        const array = this;

        let count = 0;

        array.forEach(element => {
            if (element == 1) count++;
        })

        return count*100/array.length;
    }
}

module.exporst = arrayExpansion();