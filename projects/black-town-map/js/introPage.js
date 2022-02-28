var sAnim = {
        slideIndex: 0,
        slideClass: "mySlides",
        slides: [],
        getSlides:function(){
           this.slides = document.getElementsByClassName(this.slideClass)
        },
        showSlides:function(){
            if (sAnim.slides.length == 0){sAnim.getSlides()}
            for (var i = 0; i < sAnim.slides.length; i++) {
                sAnim.slides[i].style.display = "none";  
            }
            sAnim.slideIndex = sAnim.slideIndex + 1;
                if (sAnim.slideIndex > sAnim.slides.length) {sAnim.slideIndex = 1}    
                sAnim.slides[(sAnim.slideIndex - 1)].style.display = "block"; 
                document.getElementById("infoImage").innerHTML = ''
                document.getElementById("infoImage").innerHTML = sAnim.slides[(sAnim.slideIndex - 1)].children[1].innerHTML

        setTimeout(sAnim.showSlides, 5000); // Change image every 5 seconds
        },
            }
      

