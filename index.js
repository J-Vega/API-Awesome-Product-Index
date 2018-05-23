

const apiKeyWALMART = "";
const apiKeyETSY = "";
const apiKeyYOUTUBE = "";
const apiKeyGIPHY = "";

const ETSYsearch_url = 'https://openapi.etsy.com/v2/listings/active';
const search_url = 'https://api.walmartlabs.com/v1/search';
const youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';
const giphy_search_url = 'http://api.giphy.com/v1/gifs/search';

//Array of each listing
let listings = [];
let etsyListings = [];
let youtubeListings = [];

//Toggled when displaying a popup window
let isPopUpDisplaying = false;

//Toggled when searching to prevent multiple queries from stacking on one another.
let isLoading = false;

function getDataFromApi(searchTerm, callback){
  resetListing();
  const query = {
    apiKey: apiKeyWALMART,
    query: `${searchTerm}`,

    category: 3944, //walmart category for electronics
    numItems: 12
  };
  showSections();
  $.getJSON(search_url,query,callback);
  
}

$(function() {
    $(".clickForPopUpWALMART").on("click",".result-block",event => {
      if(isPopUpDisplaying === false)
    { 
    isPopUpDisplaying = true;
    console.log(isPopUpDisplaying);
      console.log(event.currentTarget);

      //**refer to shopping list app for data attribute
      const itemIndex = getIndexFromElement(event.currentTarget);
      console.log(itemIndex);
      //store item name from HTML element into var
      //var itemName = document.getElementById("itemNameButton");
      //console.log(itemName);
      //store url from HTML element
      //var imageURL = document.querySelector('.thumbnail').src;
      //console.log(imageURL);
      //$("#popUpWindow").text($(this).val().trim());
      //place item name into modal's popUpText class
        $(".popUpText").text(listings[itemIndex].name);  //$(itemName).val().trim());

        //insert image URL into modal's copied image placeholder
        $('.copiedimages').html(displayItemImage(listings[itemIndex].image));
        $('.productPrice').html(displayItemPrice(listings[itemIndex].price));
        $('.productDescription').html(displayItemDescription(listings[itemIndex].description));
        $('.productURL').html(displayItemURL(listings[itemIndex].link));

        $("#WALMARTpopUpWindow").show(500);
      }else{}
    }); 
  
  
    $("#btnOK").click(function() {
      if(isPopUpDisplaying === true){
        isPopUpDisplaying=false;
        console.log(isPopUpDisplaying);
        //$("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        $("#WALMARTpopUpWindow").hide(400);
      }
      else{

      }
    });
});

$(function() {
    $(".clickForPopUpETSY").on("click",".etsy-result-block",event => {
      if(isPopUpDisplaying === false)
    { 
    isPopUpDisplaying = true;
    console.log(isPopUpDisplaying);
      console.log(event.currentTarget);

      //once index reaches here, it gets jacked up...

      //**refer to shopping list app for data attribute
      const itemIndex = ETSYgetIndexFromElement(event.currentTarget);
      console.log("THIS IS THE ACTUAL INDEX" +itemIndex);
      //store item name from HTML element into var
      //var itemName = document.getElementById("itemNameButton");
      //console.log(itemName);
      //store url from HTML element
      //var imageURL = document.querySelector('.thumbnail').src;
      //console.log(imageURL);
      //$("#popUpWindow").text($(this).val().trim());
        //place item name into modal's popUpText class
        $(".etsyItemName").text(etsyListings[itemIndex].name);  //$(itemName).val().trim());

        //insert image URL into modal's copied image placeholder
        $('.etsyImage').html(displayItemImage($(event.currentTarget).find(".thumbnail").attr("src")));
         $('.etsyPrice').html(displayItemPrice(etsyListings[itemIndex].price));
         $('.etsyDescription').html(displayItemDescription(etsyListings[itemIndex].description));
         $('.etsyURL').html(displayItemURL(etsyListings[itemIndex].link));

        $("#ETSYpopUpWindow").show(500);
      }else{}
    }); 
  
  
    $("#btnOKKK").click(function() {
      if(isPopUpDisplaying === true){
        isPopUpDisplaying=false;
        console.log(isPopUpDisplaying);
        //$("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        $("#ETSYpopUpWindow").hide(400);
      }
      else{

      }
    });
});

$(function() {
    $(".clickForPopUpYOUTUBE").on("click",".result-block-YOUTUBE",event => {
      if(isPopUpDisplaying === false)
    { 
    isPopUpDisplaying = true;
    console.log(isPopUpDisplaying);
      console.log(event.currentTarget);

      //once index reaches here, it gets jacked up...

      //**refer to shopping list app for data attribute
      const itemIndex = YOUTUBEgetIndexFromElement(event.currentTarget);
      //console.log("THIS IS THE ACTUAL INDEX" +itemIndex);
      //store item name from HTML element into var
      //var itemName = document.getElementById("itemNameButton");
      $(".etsyItemName").empty();
      $(".popUpText").empty();
    
    
    //<p class ="youtubeVideoAuthor">Channel: ${results.snippet.channelTitle}</p>
 
 
      //$("#popUpWindow").text($(this).val().trim());
      
        $('.youtubeVideoLink').html(displayVideoURL(youtubeListings[itemIndex].name,`https://www.youtube.com/watch?v=${youtubeListings[itemIndex].link}`));

        //$(".youtubeVideoTitle").text(youtubeListings[itemIndex].name);  //$(itemName).val().trim());

        
         $('.youtubeVideoImage').html(displayItemImage(youtubeListings[itemIndex].image));
         
         $('.youtubeVideoDescription').html(displayItemDescription(youtubeListings[itemIndex].description));
         
         //$('.youtubeVideoAuthor').text(youtubeListings[itemIndex].author);
        
         $('.youtubeVideoChannel').html(displayChannelURL(youtubeListings[itemIndex].author,`https://www.youtube.com/channel/${youtubeListings[itemIndex].channel}`));
         
        $("#YOUTUBEpopUpWindow").show(500);
      }else{}
    }); 
  
  
    $("#btnOKK").click(function() {
      if(isPopUpDisplaying === true){
        isPopUpDisplaying=false;
        console.log(isPopUpDisplaying);
        //$("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        $("#YOUTUBEpopUpWindow").hide(400);
      }
      else{

      }
    });
});

 // example https://giphy.com/gifs/mrw-boy-51Uiuy5QBZNkoF3b2Z
function renderResults(results,index){
  
  addProductToListing(results);
  var roundedPrice = Math.round(results.salePrice);
  //console.log(results);
  return `<div class="result-block col-4" item-index="${index}">
      <p>${results.name}</p>
      <div class = "image">
        <img class="thumbnail clickable" src='${results.mediumImage}'>
      </div>
      <p class= "price bold">$${roundedPrice}</p>
  </div>
   `;// line 26 <a href=${results.productUrl}>   line 29 </a>
   
}

function getIndexFromElement(item){
  const itemIndexString = $(item).closest('.result-block').attr('item-index');
  
  return parseInt(itemIndexString,10);
}

function ETSYgetIndexFromElement(item){
  const itemIndexString = $(item).closest('.etsy-result-block').attr('etsy-item-index');
  
  return parseInt(itemIndexString,10);
}
function YOUTUBEgetIndexFromElement(item){
  const itemIndexString = $(item).closest('.result-block-YOUTUBE').attr('item-index-YOUTUBE');
  
  return parseInt(itemIndexString,10);
}

function resetListing(){
  listings = [];
  youtubeListings = [];
}

function addProductToListing(listing){
  listings.push({
    'name': listing.name, 
    'image':listing.mediumImage, 
    'price': listing.salePrice, 
    'description':listing.shortDescription, 
    'link':listing.productUrl, 
    'rating':listing.customerRating});    
}

function displaySearchData(data){
  
  const results = data.items.map((item,index) => renderResults(item,index));
  
  $('.js-search-results-WALMART').html(results);
}



function displayItemImage(imageURL){
  return ` <img src=${imageURL}> `;
}
function displayChannelURL(channel,itemURL){
  return ` <p>Channel:<span><a target="_blank" href=${itemURL}>${channel}</a></span></p> `;
}
function displayVideoURL(title, itemURL){
  return ` <a target="_blank" href=${itemURL}>${title}</a> `;
}
function displayItemURL(itemURL){
  return ` <a target="_blank" href=${itemURL}>Go To Listing!</a> `;
}
function displayItemDescription(description){
  return ` <p>${description} </p>`;
}
function displayItemPrice(price){
  return ` <p>$${price} </p>`;
}
function displayLoadingMessage(searchTerm){
  //return `<p>Searching for ${searchTerm}</p>`;
  return `<p>"Searching for ${searchTerm}"</p>`;
}




      


//-------YOUTUBE-----------



function getDataFromApiYOUTUBE(searchTerm, callback){
  //console.log(searchTerm);
  const query = {
    part: 'snippet',
    key: apiKeyYOUTUBE,
    q: `${searchTerm}`   ,
    type: 'video',
    'maxResults': 12
    
  };
  $.getJSON(youtube_search_url,query,callback);
  
}

function renderResultsYOUTUBE(results,index){
  addProductToListingYOUTUBE(results);
  return `
  <div class="result-block-YOUTUBE col-3" item-index-YOUTUBE="${index}">
    
    <img class="videoImage" src="${results.snippet.thumbnails.medium.url}">
    <br><p class="italicized videoTitle">${results.snippet.title}</p>
    
    <p class ="videoAuthor">By: ${results.snippet.channelTitle}</p>
   
  </div>
  `;//  removed description from results - added to popup window    <p class="videoDescription">${results.snippet.description}</p>
  //<a class="js-result-name" href="https://www.youtube.com/watch?v=${results.id.videoId}">     </a>      anchor with video link gotta add to pop up window
  //<a href=https://www.youtube.com/channel/${results.snippet.channelId}>  </a>       anchor with channel
  //https://www.youtube.com/channel/UC-ol6cvdiLjBn4FrGgvhdrA
  
}

function displayYoutubeSearchData(data){
  const results = data.items.map((item,index) => renderResultsYOUTUBE(item,index));
  //console.log(results);
  $('.js-search-results-YOUTUBE').html(results);
}

function addProductToListingYOUTUBE(listing){
  youtubeListings.push({
    'name': listing.snippet.title, 
    'image':listing.snippet.thumbnails.medium.url, 
    //'price': listing.price, 
    'author' :listing.snippet.channelTitle,
    'description':listing.snippet.description, 
    'channel' : listing.snippet.channelId,
    'link': listing.id.videoId
    //'rating':listing.customerRating});
    //renderResults(listing);
    //console.log(listings);
    
})}



function watchClick(){

  $('#quickSearch1').click(event =>
  {
    var element = document.getElementById("quickSearch1").innerHTML;//$('.quickSearch').val;
    if(isLoading === false){
    showLoadingScreen(element);
    retrieveData(element);
    }
  });
  $('#quickSearch2').click(event =>
  {
    var element = document.getElementById("quickSearch2").innerHTML;//$('.quickSearch').val;
    if(isLoading === false){
    showLoadingScreen(element);
    retrieveData(element);
  }
  });
  $('#quickSearch3').click(event =>
  {
    
    var element = document.getElementById("quickSearch3").innerHTML;//$('.quickSearch').val;
    if(isLoading === false){
    showLoadingScreen(element);
    retrieveData(element);
    }
  });
  $('#quickSearch4').click(event =>
  {

    var element = document.getElementById("quickSearch4").innerHTML;//$('.quickSearch').val;
    if(isLoading === false){
    showLoadingScreen(element);
    retrieveData(element);
    }
  });
}




function hideSections(){
   $('h3').hide(0);
   
}
function showSections(){
   $('h3').show(0);
   
}

hideSections();




function addProductToListingETSY(listing){
  etsyListings.push({
    'name': listing.title, 
    
    'price': listing.price, 
    'description':listing.description, 
    'link':listing.url 
    //'rating':listing.customerRating});
    //renderResults(listing);
    //console.log(listings);
    
})}

function ETSYgetDataFromApi(searchTerm, callback){
  //console.log('searching: ' +searchTerm);
  const query = {
    api_key: apiKeyETSY,
    keywords: `${searchTerm}`,
    limit: 8
  };
  
  $.getJSON(ETSYsearch_url,query,callback);
}

function ETSYdisplaySearchData(data){

  const results = data.results.map((item,index) => ETSYgetImageFromListing(item,index));
}

function ETSYgetImageFromListing(results,index){
  //console.log(index);
  addProductToListingETSY(results);
  const listingURL = `https://openapi.etsy.com/v2/listings/${results.listing_id}/images`;
  let imageURL = ``;
  const imageQuery = {
     api_key: apiKeyETSY,
   };
   //console.log("Etsy index is "+ index);
   $('.js-search-results-ETSY').empty();
   $.getJSON(listingURL,imageQuery,function(event){
    //console.log('event is ' +event);
      imageURL = `${event.results[0].url_170x135}`;
      //return imageURL;
      //console.log("Etsy index is "+ index);

      $('.js-search-results-ETSY').append(renderResultsETSY(results,index,imageURL));
   });

  //renderResults(results,imageURL);
};
function ETSYuseImageFromListing(results){
  
  const listingURL = `https://openapi.etsy.com/v2/listings/${results.listing_id}/images`;
  let imageURL = ``;
  const imageQuery = {
     api_key: '',
   };
   
   $.getJSON(listingURL,imageQuery,function(event){
    
      imageURL = `${event.results[0].url_170x135}`;

      return imageURL;
   });

  
};

function renderResultsETSY(results,index,listingImage){
  
  var roundedPrice = Math.round(results.price);
  
  return `
  <div class="etsy-result-block col-4" etsy-item-index="${index}">
  <p>${results.title}</p>
  <img class ="thumbnail" src="${listingImage}"> 
  <p class="price bold">$${roundedPrice}</p></div>
  `;
}



function watchSubmit() {
  $('.js-search-form').submit(event => 
  {
    event.preventDefault();

    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");

    
    if(isLoading === false){
      resetForms();
      showLoadingScreen(query);
      retrieveData(query);
    }
    //else console.log("Still loading, patience!");
  });
}

function resetForms(){ //Clears html elements. Prevents page from displaying previous content for a split second.
  window.scrollTo(0,0);
  $('.searchGif').html("");
  $('.dadJoke').html("");
}

function showLoadingScreen(query){

  if(isLoading === false){
    isLoading = true;
    console.log(isLoading);
    $('.searchResponse').html(displayLoadingMessage(query));
    $("#loadingScreen").show(0);
    $("#loadingScreen").delay(4500).fadeOut(150);
    //isLoading.setTimeout(return true);
    setTimeout(function(){
        isLoading = false;
        console.log(isLoading);
    }, 4500);
  }
  else{
    console.log('nooooo');
  }
    
}

function retrieveData(query){
    getDataFromApi(query,
    displaySearchData);

    getDataFromApiYOUTUBE(query,
    displayYoutubeSearchData);

    ETSYgetDataFromApi(query,
    ETSYdisplaySearchData);

    GIPHYgetDataFromApi(query,
    GIPHYdisplaySearchData);

    DADJOKESgetDataFromApi(DADJOKESdisplaySearchData);

}


// -------------- GIPHY ---------------


function GIPHYgetDataFromApi(searchTerm, callback){
  //console.log('searching: ' +searchTerm);
  const query = {
    
    api_key: apiKeyGIPHY,
    q: `${searchTerm}`,
    limit: 1
  };
  
  $.getJSON(giphy_search_url,query,callback);
}

 // example https://giphy.com/gifs/mrw-boy-51Uiuy5QBZNkoF3b2Z
function GIPHYrenderResults(results){
  //console.log('rendering results...');
  //console.log(results);
  return `<img class="gif" src="${results.images.downsized.url}">
   `;
}

function GIPHYdisplaySearchData(data){
  //console.log('displaying search data');
  const results = data.data.map((item,index) => GIPHYrenderResults(item));
  //console.log(results);
  
  $('.searchGif').html(results);
}

//--------------DAD JOKES---------------
function DADJOKESgetDataFromApi(callback){
  const url= "https://icanhazdadjoke.com/";
  
  $.getJSON(url,callback);
}
function DADJOKESrenderResults(jokeText){
  //console.log(result.joke);
  return `<p>Searching, here is a bad joke: ${jokeText}</p>`;
}
function DADJOKESdisplaySearchData(data){
  console.log(data.joke);
  // DADJOKESrenderResults(data.joke);
  // console.log(results);

  $('.dadJoke').html(DADJOKESrenderResults(data.joke));
}



$(watchClick);
$(watchSubmit);

