
const searchUrl_WALMART = 'https://api.walmartlabs.com/v1/search';
const apiKey_WALMART = "cwd2qzamfg6f523deuwhuxec";

const searchUrl_ETSY = 'https://openapi.etsy.com/v2/listings/active';
const apiKey_ETSY = "oww1hu2f71dd0rs83ba669i5";

const searchUrl_YOUTUBE = 'https://www.googleapis.com/youtube/v3/search';
const apiKey_YOUTUBE = "AIzaSyCn1d4mvDhmpTDGTUQewmXwbox46HljqvE";

const searchUrl_GIPHY = 'http://api.giphy.com/v1/gifs/search';
const apiKey_GIPHY = "KR173qKpVYfv9dvzExycLE59pItN6ktM";

const searchUrl_DADJOKE = 'https://icanhazdadjoke.com/';
  //No API Key required for DadJoke API

//Array of each listing - used to display rendered results in pop up windows
let listings_WALMART = [];
let listings_ETSY = [];
let listings_YOUTUBE = [];

//Toggled when displaying a popup window - resets when closed
let isPopUpDisplaying = false;

//Toggled while searching to prevent multiple queries from stacking on one another.
let isLoading = false;

$(function() {
    $(".clickForPopUpWALMART").on("click",".result-block",event => {
      if(isPopUpDisplaying === false)
      { 
        isPopUpDisplaying = true;
        const itemIndex = getIndexFromElement(event.currentTarget);
      
        $(".popUpText").text(listings_WALMART[itemIndex].name);  //$(itemName).val().trim());
        //insert image URL into modal's copied image placeholder
        $('.copiedimages').html(displayItemImage(listings_WALMART[itemIndex].image));
        $('.productPrice').html(displayItemPrice(listings_WALMART[itemIndex].price));
        $('.productDescription').html(displayItemDescription(listings_WALMART[itemIndex].description));
        $('.productURL').html(displayItemURL(listings_WALMART[itemIndex].link));
        hideListingFromScreenReader();
        $("#WALMARTpopUpWindow").show(500);
      }else{}
    }); 
  
  
    $("#backButtonWalmart").click(function() {
      if(isPopUpDisplaying === true){
        isPopUpDisplaying=false;
        showListingToScreenReader();
        $("#WALMARTpopUpWindow").hide(400);
      }
      else{
          //Nothing
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
        $(".etsyItemName").text(listings_ETSY[itemIndex].name);  //$(itemName).val().trim());

        //insert image URL into modal's copied image placeholder
        $('.etsyImage').html(displayItemImage($(event.currentTarget).find(".thumbnail").attr("src")));
         $('.etsyPrice').html(displayItemPrice(listings_ETSY[itemIndex].price));
         $('.etsyDescription').html(displayItemDescription(listings_ETSY[itemIndex].description));
         $('.etsyURL').html(displayItemURL(listings_ETSY[itemIndex].link));
          hideListingFromScreenReader();
        $("#ETSYpopUpWindow").show(500);
      }else{}
    }); 
  
  
    $("#backButtonEtsy").click(function() {
      if(isPopUpDisplaying === true){
        isPopUpDisplaying=false;
        console.log(isPopUpDisplaying);
        showListingToScreenReader();
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

      const itemIndex = YOUTUBEgetIndexFromElement(event.currentTarget);

      $(".etsyItemName").empty();
      $('.youtubeVideoLink').html(displayVideoURL
        (listings_YOUTUBE[itemIndex].name,`https://www.youtube.com/watch?v=${listings_YOUTUBE[itemIndex].link}`));
         $('.youtubeVideoImage').html(displayItemImage(listings_YOUTUBE[itemIndex].image)); 
         $('.youtubeVideoDescription').html(displayItemDescription(listings_YOUTUBE[itemIndex].description)); 
         $('.youtubeVideoChannel').html(displayChannelURL
          (listings_YOUTUBE[itemIndex].author,`https://www.youtube.com/channel/${listings_YOUTUBE[itemIndex].channel}`));
         hideListingFromScreenReader();
        $("#YOUTUBEpopUpWindow").show(500);
      }else{}
    }); 
  
  
    $("#backButtonYoutube").click(function() {
      if(isPopUpDisplaying === true){
        isPopUpDisplaying=false;
        console.log(isPopUpDisplaying);
        //$("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        showListingToScreenReader();
        $("#YOUTUBEpopUpWindow").hide(400);
      }
      else{

      }
    });
});

//  RUNS ALL API QUERIES
function retrieveData(query){
    WALMARTgetDataFromApi(query,
    WALMARTdisplaySearchData);

    YOUTUBEgetDataFromApi(query,
    YOUTUBEdisplaySearchData);

    ETSYgetDataFromApi(query,
    ETSYdisplaySearchData);

    GIPHYgetDataFromApi(query,
    GIPHYdisplaySearchData);

    DADJOKESgetDataFromApi(DADJOKESdisplaySearchData);
}

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
  listings_WALMART = [];
  listings_YOUTUBE = [];
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
    
    var delay = 4500;

    $('.searchResponse').html(displayLoadingMessage(query));
    $("#loadingScreen").show(0);
    $("#loadingScreen").delay(delay).fadeOut(150);
    
    setTimeout(function(){
        isLoading = false;
    }, delay);
  }
  else{
    //Nothing
  }
    
}

function hideSections(){
   $('h3').hide(0);
}

function showSections(){
   $('h3').show(0);
}

hideSections();



//---------- SCREEN READER FUNCTIONS----------

function hideListingFromScreenReader(){ //Causes screen reader to ignore listings when pop up is displayed
  document.getElementById("listingsParent").setAttribute("aria-hidden",true);
}

function showListingToScreenReader(){ //When pop up is exit, show listings to screen reader
  document.getElementById("listingsParent").setAttribute("aria-hidden",false);
}



// ---------    POP UP WINDOW FUNCTIONS       ------//

function displayItemImage(imageURL){
  return ` <img aria-hidden = "true" src=${imageURL}> `;
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
  return ` <p class = "justify" aria-label="[Product Description]">${description} </p>`;
}
function displayItemPrice(price){
  return ` <p aria-label="[Price]">$${price} </p>`;
}
function displayLoadingMessage(searchTerm){
  //return `<p>Searching for ${searchTerm}</p>`;
  return `<p>"Searching for ${searchTerm}"</p>`;
}



// ----------     WALMART API       --------- //

function WALMARTgetDataFromApi(searchTerm, callback){
  resetListing();
  const query = {
    apiKey: apiKey_WALMART,
    query: `${searchTerm}`,

    category: 3944, //walmart category for electronics
    numItems: 12
  };
  showSections();
  $.getJSON(searchUrl_WALMART,query,callback); 
}

function WALMARTrenderResults(results,index){
  
  WALMARTaddProductToListing(results);
  var roundedPrice = Math.round(results.salePrice);
  //console.log(results);
  return `<div class="result-block col-4" item-index="${index}">
      <p aria-label="[Product Name]" class = "productName">${results.name}</p>
      <div class = "image">
        <img aria-hidden="true" class="thumbnail clickable" src='${results.mediumImage}'>
      </div>
      <p aria-label="[Price]" class= "price bold">$${roundedPrice}</p>
  </div>
   `;
   
}

function WALMARTaddProductToListing(listing){
  listings_WALMART.push({
    'name': listing.name, 
    'image':listing.mediumImage, 
    'price': listing.salePrice, 
    'description':listing.shortDescription, 
    'link':listing.productUrl, 
    'rating':listing.customerRating});    
}

function WALMARTdisplaySearchData(data){
  
  const results = data.items.map((item,index) => WALMARTrenderResults(item,index));
  
  $('.js-search-results-WALMART').html(results);
}


      
//-------YOUTUBE-----------

function YOUTUBEgetDataFromApi(searchTerm, callback){
  //console.log(searchTerm);
  const query = {
    part: 'snippet',
    key: apiKey_YOUTUBE,
    q: `${searchTerm}`   ,
    type: 'video',
    'maxResults': 12
    
  };
  $.getJSON(searchUrl_YOUTUBE,query,callback);
  
}

function YOUTUBErenderResults(results,index){
  YOUTUBEaddProductToListing(results);
  return `
  <div class="result-block-YOUTUBE col-3" item-index-YOUTUBE="${index}">
    
    <img aria-hidden="true" class="videoImage" src="${results.snippet.thumbnails.medium.url}">
    <br><p aria-label="[Video Title]" class="italicized videoTitle">${results.snippet.title}</p>
    
    <p aria-label="[Video Author]" class ="videoAuthor">By: ${results.snippet.channelTitle}</p>
   
  </div>
  `;//  removed description from results - added to popup window    <p class="videoDescription">${results.snippet.description}</p>
  //<a class="js-result-name" href="https://www.youtube.com/watch?v=${results.id.videoId}">     </a>      anchor with video link gotta add to pop up window
  //<a href=https://www.youtube.com/channel/${results.snippet.channelId}>  </a>       anchor with channel
  //https://www.youtube.com/channel/UC-ol6cvdiLjBn4FrGgvhdrA
  
}

function YOUTUBEdisplaySearchData(data){
  const results = data.items.map((item,index) => YOUTUBErenderResults(item,index));
  $('.js-search-results-YOUTUBE').html(results);
}

function YOUTUBEaddProductToListing(listing){
  listings_YOUTUBE.push({
    'name': listing.snippet.title, 
    'image':listing.snippet.thumbnails.medium.url, 
    //'price': listing.price, 
    'author' :listing.snippet.channelTitle,
    'description':listing.snippet.description, 
    'channel' : listing.snippet.channelId,
    'link': listing.id.videoId
})}



//--------------  ETSY API ----------- //

function ETSYaddProductToListing(listing){
  listings_ETSY.push({
    'name': listing.title, 
    
    'price': listing.price, 
    'description':listing.description, 
    'link':listing.url 
})}

function ETSYgetDataFromApi(searchTerm, callback){
  //console.log('searching: ' +searchTerm);
  const query = {
    api_key: apiKey_ETSY,
    keywords: `${searchTerm}`,
    limit: 8
  };
  
  $.getJSON(searchUrl_ETSY,query,callback);
}

function ETSYdisplaySearchData(data){

  const results = data.results.map((item,index) => ETSYgetImageFromListing(item,index));
}

function ETSYgetImageFromListing(results,index){
  
  ETSYaddProductToListing(results);
  const listingURL = `https://openapi.etsy.com/v2/listings/${results.listing_id}/images`;
  let imageURL = ``;
  const imageQuery = {
     api_key: apiKey_ETSY,
   };
   
   $('.js-search-results-ETSY').empty();
   $.getJSON(listingURL,imageQuery,function(event){
    //console.log('event is ' +event);
      imageURL = `${event.results[0].url_170x135}`;
      

      $('.js-search-results-ETSY').append(renderResultsETSY(results,index,imageURL));
   });
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
  <p aria-label="[Product Name]" class = "productName" >${results.title}</p>
  <img aria-hidden = "true" class ="thumbnail" src="${listingImage}"> 
  <p aria-label="[Price]" class="price bold">$${roundedPrice}</p></div>
  `;
}



// -------------- GIPHY ---------------

function GIPHYgetDataFromApi(searchTerm, callback){
  const query = {
    api_key: apiKey_GIPHY,
    q: `${searchTerm}`,
    limit: 1
  };

  $.getJSON(searchUrl_GIPHY,query,callback);
}

function GIPHYrenderResults(results){
  return `<img aria-hidden= "true" class="gif" src="${results.images.downsized.url}">
   `;
}

function GIPHYdisplaySearchData(data){
  const results = data.data.map((item,index) => GIPHYrenderResults(item));
  
  $('.searchGif').html(results);
}

//-------------- DAD JOKES ---------------
function DADJOKESgetDataFromApi(callback){
  $.getJSON(searchUrl_DADJOKE,callback);
}

function DADJOKESrenderResults(jokeText){
  return `<p>${jokeText}</p>`;
}

function DADJOKESdisplaySearchData(data){
  $('.dadJoke').html(DADJOKESrenderResults(data.joke));
}


$(watchClick);
$(watchSubmit);



//            END             //


