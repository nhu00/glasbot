var cardSet = "paris",
  totalCards = 20,//must be an even number max 24!!!
  card1 ="",
  card2="",
  trys = 0,
  shown = 1,
  mcount = 0,//how many matches
  theCards = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
//for shuffle func
var i,rand,temp,str,nums = [];
var j = 50;//speed of card appearnce
$(document).ready(function(){
   //load all images and hide them so they are pre loaded when start to zoom
  /*
     for(i = 0;i<13;i++){
       $('#slideshow').append('<div><img src = "http://www.janiceshaw.co.uk/memory/images/paris/big/'+theCards[i]+'.jpg"></div>');  
      }*/
  $("#slideshow").hide();
  function shower (trys){
    var theMes = "";
      if(trys < 10){
      theMes = "Wow! Excellent Job! You got them all!"
    }else if (trys < 100){
      theMes = "Well Done! You matched all of it!"
    }
    
      setInterval(function() { 
        $('#slideshow > div:first')
          .fadeOut(0)
          .next()
          .fadeIn(0)
          .end()
          .appendTo('#slideshow');
          shown = shown+1;
           if(shown >13){
	          $('.finished').fadeIn('slow').find('span').text(theMes);
	          
          }
                },  100);
    }
    var trys = 0;
  $('#trys span').text(trys);
  function shuffle(){
    //fill array 1-totalCards
    for(i = 1;i<totalCards+1;i++){
      nums[i] = i; 
    }
    //now randomize the numbers in the element
    for(i = 1;i<totalCards+1;i++){
      rand = Math.ceil(Math.random()*totalCards);
      temp = nums[i];
      nums[i] = nums[rand];
      nums[rand] = temp;      
    }
    //use the numbers
    for(i = 1;i<totalCards+1;i++){
      if(nums[i] > totalCards/2){
        nums[i]=nums[i]-totalCards/2;
      }
      $('#Playfield').append('<div class="card down '+theCards[nums[i]]+'" data-face="'+nums[i]+'"><img src ="https://raw.githubusercontent.com/nhu00/glasbot/main/img/backcard.jpg'+theCards[nums[i]]+'.jpg" class="nothere"></div>');
      $('.card').delay(j).fadeIn('slow');
      j = j+50;
    }
  }//close shuffle function
  shuffle();
  $('.card').click(function(){
    $('#turns').fadeIn('slow');
    if ($(this).hasClass('up') == false && $(this).hasClass('matched') == false){ //only do if have not already done it!
      if ($('.card').hasClass('up') ){ //only runs when two are turned over
        card2 = $(this).data('face');
        $(this).toggleClass('down').toggleClass('up').html('<div class="pic">'+/*card2+*/'</div>');
	      if(card2 == card1){ //we have a match!!
	        $('.up').addClass('matched').removeClass('up');
	        mcount = mcount + 1;
	        if(mcount == totalCards/2){ //all matched up !!
	          $('#Playfield').delay(150).fadeOut('fast');
	          $("#slideshow").delay(1500).fadeIn(3000);
            $("#slideshow > div:gt(0)").hide();
            shower(trys);
	        } 
	      }else{ // not a match wait then turn over
	        trys = trys + 1;
	        $('#turns span').text(trys);
	        if(trys == 37){
            $('.age').fadeIn('slow');
          }
	        setTimeout(function(){
	          $(this).toggleClass('down').toggleClass('up');
            $('.up').toggleClass('up').addClass('down').find('div').remove("div");
	          },600);
  	    }
      }else{ //when just the one turned over
        $(this).toggleClass('down');
	      $(this).toggleClass('up');
	      card1 = $(this).data('face');
	      $(this).html('<div class="pic">'+/*card1+*/'</div>');
      }
    }
	});
});