/// create an object with methods for making the cartogram

var cartogram = {

    xy: [4,3], //dimensions of the cartogram 
    xyObject: {},
    fontSize: 10,//
    data:{
        x: [0,1,2,3], // an array with x coordinates
        y: [0,1,2], // an arrry with y coordinates
        state: [], // an array with the names of the states 
        value: [], // an array with a values to determine for example size of svg
        },
    xBorder:30,
    yBorder:30,
 
    spacing:10, // pixel size of spacing
    size:70, // pixel size of width, add other measurements for other shapes
    color: 'green',
    colorArray:['black', 'green', 'blue'], //set the color in increasing value
    colorClass:[0,10,80], // set value of color less or equal
    clickCarto: 
                function(evt) {
                var index = parseInt(evt.target.id.split('_cart_')[1])
                document.querySelectorAll('.state-tile').forEach(e=>{
                    e.style.stroke = 'none'
                })
                evt.target.style.stroke = '#ddddb2'//yellow'//'#957197'//'#AAAAAA'
                evt.target.style.strokeWidth ="3" 
                //trying to make a border on click

                // mL.state = evt.target.id.split('_cart')[0]
                mL.state = dataCarto.STATE_LONG[index]
                mL.numberOfStates = dataCarto.TOWNS[index]
                mL.clicked = 1;
                mL.makeInfoArray(mL.state, BT, 'State', 'Town Name')
                mL.make('cartoInfo', 'cartoList')
            },
    assignColor: function(value){
            for (var i = 0; i < this.colorArray.length; i++){
                if(value <= this.colorClass[i]){
                    return this.colorArray[i]
                }
            } 
      },
 
    makeCoordinateObject: function(DivID){
            cartogram.xyObject = {};
            cartogram.makeSVG(DivID);
            var divSVG = document.getElementById('svg_'+DivID)
            var boxWidth = divSVG.getBoundingClientRect().width
            var boxHeight = divSVG.getBoundingClientRect().height
            // var xmlns = "http://www.w3.org/2000/svg";
            var stepW = Math.floor((boxWidth-(2*cartogram.xBorder)-cartogram.size)/(cartogram.xy[0]-1))
            var stepH = Math.floor((boxHeight-(2*cartogram.yBorder)-cartogram.size)/(cartogram.xy[1]-1))
            for (var i = 0; i < cartogram.xy[0]; i++){ //numTicks -1  you want to eliminate the remainder 
                for(var j = 0; j <cartogram.xy[1]; j++){
                    if (i== 0) {var xRect = cartogram.xBorder} else {
                        var xRect = i*stepW + cartogram.xBorder ;
                    }
                    if (j==0) {var yRect = cartogram.yBorder} else { // I changed this since the data had no first row and I wanted the data to start in the first row of the div
                        var yRect = j*stepH + cartogram.yBorder;
                    }
                    ///// J + 1 IS TO SOLVE A PROBLEM IN THE DATA SO THE CARTOGRAM GOES UP
                    this.xyObject[i+","+(j+1)]=[xRect,yRect]}} // CHANGE 
    },
    
    makeSVG: function(DivID) {
        // this will make an empty SVG where we will draw svgs inside
        var xmlns = "http://www.w3.org/2000/svg";
        var daDiv = document.getElementById(DivID) 
        var boxWidth = daDiv.getBoundingClientRect().width;
        var boxHeight = daDiv.getBoundingClientRect().height;
        var svgElem = document.createElementNS(xmlns, "svg");
        svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
        svgElem.setAttributeNS(null, "width", "100%");
        svgElem.setAttributeNS(null, "height", "100%");
        svgElem.setAttributeNS(null, "id", 'svg_'+DivID);
        svgElem.setAttributeNS(null, "preserveAspectRatio","none")
        svgElem.setAttributeNS(null, "style", "position: absolute");
        document.getElementById(DivID).appendChild(svgElem)
    },

    // svgEventListenerText: 
    //     "function makeClickable(evt) \{
    //         var svg = evt.target;
    //         svg.addEventListener('mousedown', startDrag);
    //         svg.addEventListener('mousemove', drag);
    //         svg.addEventListener('mouseup', endDrag);
    //         svg.addEventListener('mouseleave', endDrag);
    //         svg.addEventListener('touchstart', startDrag);
    //         svg.addEventListener('touchmove', drag);
    //         svg.addEventListener('touchend', endDrag);
    //         svg.addEventListener('touchleave', endDrag);
    //         svg.addEventListener('touchcancel', endDrag);"
    // },

    makeRectangle: function(DivID, textProportion) {
        cartogram.makeCoordinateObject(DivID);
        var xmlns = "http://www.w3.org/2000/svg";
        var divSVG = document.getElementById('svg_'+DivID)
        cartogram.data.state.forEach((element, index) =>{
            if (element != 'HI' && element != 'PR') { // make an element of the cartogram object that has a section for eliminating by state. 
            var i = cartogram.data.x[index];
            var j = cartogram.data.y[index];
            var objectName = i+","+j
            var xRect = cartogram.xyObject[objectName][0] 
            var yRect = cartogram.xyObject[objectName][1] 
                
                var gElem = document.createElementNS(xmlns, 'g');
                gElem.setAttributeNS(null,'class', element +'_cart_'); 
                var rectElem = document.createElementNS(xmlns, 'rect');
                rectElem.setAttributeNS(null,'id', element +'_cart_' +index);
                rectElem.setAttributeNS(null,'class', 'state-tile');

                rectElem.setAttributeNS(null,'x', xRect); 
                rectElem.setAttributeNS(null,'y', yRect);
                rectElem.setAttributeNS(null,'width', cartogram.size);
                rectElem.setAttributeNS(null,'height', cartogram.size);
                rectElem.setAttributeNS(null,'fill', this.assignColor(cartogram.data.value[index]));
                rectElem.addEventListener('mousedown', cartogram.clickCarto);
                rectElem.addEventListener('touchstart', cartogram.clickCarto);
                rectElem.addEventListener('click', cartogram.clickCarto);
                gElem.appendChild(rectElem)

        //         ///text
                var textElem = document.createElementNS(xmlns, 'text');
                textElem.setAttributeNS(null,'class', 'carto-text'); 
                textElem.setAttributeNS(null,'x', xRect); 
                textElem.setAttributeNS(null,'y', yRect);
                textElem.setAttributeNS(null,'font-size', cartogram.fontSize+'px');
                textElem.setAttributeNS(null,'fill', 'white');
                textElem.innerHTML = element
                textElem.style.pointerEvents = 'none'
                textElem.innerHTML = element
                gElem.appendChild(textElem)
                divSVG.appendChild(gElem)
                    
            //     }// end of j loop which is the y coordinate
            
            //     }// end of i loop which is the x coordinate 
                    cartogram.centerText()
        } } ); //end for each 
    }
    ,

    centerText: function(){
        var textE = document.getElementsByClassName('carto-text');
        var rectE = document.getElementsByTagName('rect');
        for (i = 0; i < textE.length; i++) {   
            // fix if font is bigger than rect
            var newX = rectE[i].getBBox().x
                        + ((rectE[i].getBBox().width - textE[i].getBBox().width)/2) + (textE[i].getBoundingClientRect().width - textE[i].getBBox().width)/2
            var newY = rectE[i].getBBox().y
                        + ((rectE[i].getBBox().height - textE[i].getBBox().height)/2) 
                        + cartogram.fontSize*.80;
                        // + textE[i].getBBox().height/4
            // var newX = rectE[i].getBoundingClientRect().x 
            //     + ((rectE[i].getBoundingClientRect().width 
            //     - textE[i].getBoundingClientRect().width)/2) 
            //     - (textE[i].getBoundingClientRect().width * .25)//cartogram.textProportion) // (rectE[i].getBoundingClientRect().width/textE[i].getBoundingClientRect().width))
            
            textE[i].setAttributeNS(null,'x', newX);
            textE[i].setAttributeNS(null,'y', newY);
        }

    }

    }



