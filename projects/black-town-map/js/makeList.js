var mL = {
    clicked: 0,
    divName: '',
    state: '',
    numberOfStates:0,
    fontSize: 10,
    infoArray:[],
    makeInfoArray(value, geojson, propIn, propOut){
        this.infoArray = []
        geojson.features.forEach(element =>{
            if (element.properties[propIn]== value){this.infoArray.push(element.properties[propOut])}
        })
    },
    make(divID,divList,infoArray) {
        if (divID == undefined) {divID = this.divName}
        if (infoArray == undefined) {infoArray = this.infoArray}
        var daDIV = document.getElementById(divID)
        daDIV.innerHTML = ''
        // from https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        var newDiv = document.createElement("div");
        newDiv.setAttribute('id','titleCarto')
        newDiv.innerHTML = 'Number of Black Towns Identified By State'
        newDiv.style.fontSize = this.fontSize*1.2 + 'px'
        daDIV.appendChild(newDiv)
        newDiv = document.createElement("div");
        newDiv.setAttribute('id','subTitleCarto')
        newDiv.innerHTML = 'Click a state for more information'//'United States, Canada, Mexico and Puerto Rico'
        newDiv.style.fontSize = .75*this.fontSize + 'px'
        daDIV.appendChild(newDiv)
        if (mL.clicked == 1){newDiv.style.color = 'black'
                            newDiv.style.opacity = .5   
                            }
        
                            ///
        ///List DIV actions // 
        daDIV = document.getElementById(divList) // got tired of doing variables

        // daDIV = document.getElementById('cartoListTitle') // got tired of doing variables
        daDIV.innerHTML = ''
        newDiv = document.createElement("div");
        newDiv.setAttribute('id','stateNumCarto')
        newDiv2 = document.createElement("div");
        newDiv2.setAttribute('id','stateCarto')
        newDiv2.style.fontSize = this.fontSize*1.5 + 'px'
        if (mL.clicked == 1){newDiv2.innerHTML =  this.state} //'State: ' +
        else{newDiv2.innerHTML = '</br>'}
        newDiv.appendChild(newDiv2)
        daDIV.appendChild(newDiv)
        newDiv2 = document.createElement("div");
        newDiv2.setAttribute('id','numberCarto')
        if (mL.clicked > 0){newDiv2.innerHTML = 'Number of Towns: ' + this.numberOfStates}
        else{newDiv2.innerHTML = '</br>'}
        newDiv2.style.fontSize = this.fontSize*1.15 + 'px'
        newDiv.appendChild(newDiv2)
        // daDIV.appendChild(newDiv)
        newDiv2 = document.createElement("div");
        newDiv2.setAttribute('id','lineDivision')
        newDiv.appendChild(newDiv2)

        // daDIV.appendChild(newDiv)

        // daDIV = document.getElementById("cartoListInfo") // got tired of doing variables
        // daDIV.innerHTML = ''      
        newDiv = document.createElement("div");
        newDiv.setAttribute('id','listOfTowns') 
        newDiv.style.overflow = 'scroll'
        daDIV.appendChild(newDiv)            
        infoArray.forEach((e,index)=>{
            newDiv2 = document.createElement("p");
            newDiv2.setAttribute('class','infoItem item'+index)
            newDiv2.innerHTML = e;
            newDiv2.style.fontSize = this.fontSize*.9 + 'px'
            newDiv.appendChild(newDiv2)
            // daDIV.appendChild(newDiv)    
        })
    },


}