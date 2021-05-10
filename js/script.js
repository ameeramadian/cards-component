// Get the template from HTML file:
var template = document.querySelector('#myTemplate').innerHTML;
  
// Compile the template:
var template = Handlebars.compile(template);

//Get cards data with ajax 
$.getJSON('cards.json' , function(data){
    $.each(data, function(key, val){
    // Create the context:
    var context =  createContext(val);

    // Generate HTML:
    var html = template(context);
    var newDiv = document.createElement("div");
    newDiv.classList.add("col-md-12", "col-lg-6")
    newDiv.innerHTML = html

    // Insert rendered template into HTML:
    $('.card-deck').append(newDiv)

    //check empty author 
    if(!val.author){
        newDiv.querySelector(".card-author").style.display = "none"
    }
   
    //Adding star ratings
    addStarsRatings(val, newDiv)

      // listening for click events
      newDiv.querySelector(".like-button").addEventListener('click',event => {
        let count = parseInt(newDiv.querySelector(".likes-count").textContent)
        newDiv.querySelector(".likes-count").innerHTML = ++count;
     });
    })
}); 

function createContext(cardData){
    return {
        image : cardData.image,
        title: cardData.title,
        type : cardData.type, 
        description: cardData.description,
        author : cardData.author,
        date: cardData.date,
        likes : cardData.likes,
        comments: cardData.comments,
        raters: cardData.raters
        };

}

function addStarsRatings(cardData, div){
    switch(cardData.rating) {
        case 0:
            div.querySelector(".rating-group").style.display = "none"
        break;
        default:
            div.querySelector(".rating-group").style.display = "block"
            var stars = div.querySelectorAll(".rating__icon--star")
            for ( i = 0; i<5; i++){
                  if(i < cardData.rating ){
                      stars[i].classList.add("fa",  "fa-star")
                  } else {
                      stars[i].classList.add("fa",  "fa-star-o")
                  }
            }
        break;
    }
}
