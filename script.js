let score = 0;
let isGameOver = false;
let timeMax = 30000;
let restTime = 30;


$(".playButton").click(function(){
	$(".container").css( 'cursor', 'pointer' );
	$(".title").hide();
	$("#play").hide();
	addRandomFoodInTime();
	let interv = setInterval(function(){
		$(".foodContainer").children().each(function(){
			 
			if($(this).position().top > 900){
				$(this).remove();
			}			
		});
		restTime--;
		$(".time").text(restTime);

	},1000)
	let time = setTimeout(function(){		
		clearInterval(interv);
		gameOver(score);
	},timeMax)
})

$("#playAgain").click(function() {
	location.reload();

})

function Food() {
	let gameWidth = $(".container").css("width").slice(0,-2); 
  let foodImages = ["burger.png", "coke.png", "fries.png", "pizza.png", "sandwich.png", "donut.png", "hotdog.png", "burger2.png", "coke2.png",  "pizza2.png", "popcorn.png", "taco.png", "donut2.png"];
  this.speed = 10;
  this.position = 50;
  this.type = "";
  this.generateData = function() {
  	this.speed = Math.floor(Math.random() * 3500) + 1000;
  	this.position = Math.floor(Math.random() * (gameWidth - 150))   ;
  	typePosition = Math.floor(Math.random() * 13);
  	this.type = foodImages[typePosition];
  }
}

function addFood() {
	let food = new Food();
	food.generateData();

	$newFood = $("<img src='img/" + food.type + "' alt='" + food.type.slice(0,-4) + "' >");
	$(".foodContainer").append($newFood);
  $newFood.css("left", food.position + "px").css("position", "absolute").animate({"top": "+=950px"},{duration: food.speed})
	        .mouseover(function() {
	         	 
	         	 var beepOne = $("#beep-one")[0];
	         	 beepOne.currentTime = 0;
	         	 beepOne.play();
	         	 $(this).prop("src","img/explo.gif") ;	
	         	 score++;
	         	 $(".score").text(score);
	         	 setTimeout(() => {$(this).hide();},150);
	         	 
	         }); 	 
	return $newFood;
}

function addRandomFoodInTime(){
  
  for(let i = 1; i <= timeMax/1000 * 1.5; i++) {
  	let time = Math.floor(Math.random() * timeMax) ;
  	setTimeout(function() {
  		$newFood = addFood();
  	}, time)
  } 
}

function gameOver(score) {
	$(".gameover").css("display","block");
	$(".gameover h1").text("GAME OVER");
	$(".gameover p").text("SCORE: " +score+ " POINTS");
}