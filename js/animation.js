var hori = $(window).width();
var vert = $(window).height();

$(window).load(function(){
/* 	$(".loader").fadeOut("slow"); */
$(".part").css("height",vert);
});

$(document).ready(function(){

$(window).scroll(function() { 
	var getHor = $(this).scrollLeft();
	var getVert = $(this).scrollTop();
});

	initPart0();
	initPart1();		


});

/*-----------------------*/
/* -- PART 0 ANIMATES -- */
/*-----------------------*/

function initPart0(){
	var banner, clouds1, clouds2, line, line2, tween1, tween2, tween3, scene1, scene2, scene3, controller;
	banner = $("#banner");		
	line = $("#part0 .mid:first");
	line2 = line.next();		
	
	//Banner image
	tween1 = TweenLite.from(banner,1.5,{transform:"rotateY",opacity:"0",delay:1});
	//Mosquito drinking
	tween2 = TweenLite.to($("#part0-mosn"),6,{clip:"rect(0px, 230px, 200px, 230px);",ease:Linear.easeNone,delay:10});
	//Lines of text
	tween3 = TweenMax.staggerFrom([line,line2],3,{opacity:"0",delay: 2},1);
	
	controller = new ScrollMagic({loglevel: 3});
	
	scene1 = new ScrollScene({duration: 500}).setTween(tween1);
	scene2 = new ScrollScene({duration: 700}).setTween(tween2);
	scene3 = new ScrollScene({duration: 700}).setTween(tween3);
	pin = new ScrollScene({duration: 1000}).setPin("#part0");
	
	controller.addScene([scene1,scene2,scene3,pin]);
	
	loopClouds();
}
	
function loopClouds(){
	var clouds1 = $("#clouds1");
	var clouds2 = $("#clouds2");
	TweenMax.to(clouds2,60,{left:"100px",repeat:-1,yoyo:true,ease:Linear.easeNone});
	TweenMax.to(clouds1,50,{css:{left:"600px"},repeat:-1,yoyo:true,ease:Linear.easeNone});
}


/*-----------------------*/
/* -- PART 1 ANIMATES -- */
/*-----------------------*/

function initPart1(){
	var pin, tween1,tween2,tween3,text4,text5;
	pin = new ScrollScene({triggerElement:"#trigger1",offset:vert/2,duration: 1000}).setPin("#part1");
	scene1 = new ScrollScene({triggerElement:"#trigger1",offset:vert/2+100,duration: 250});
	pin.addIndicators();
	pin.on("start",function(event){
		plasmodium();
	});
	
	controller = new ScrollMagic({loglevel: 3});
	controller.addScene([pin]);
	bloodFlow1();
	bloodFlow2();
}

function bloodFlow1(){
	var blood1 = $("#part1-blood");
	blood1.css("left",(hori.toString()+"px"));	
	TweenLite.from(blood1,10,{left:"-400px",ease:Linear.easeNone,onComplete:bloodFlow1});
}

function bloodFlow2(){
	var blood2 = $("#part1-bloodinf");
	blood2.css("left",(hori.toString()+"px"));	
	TweenLite.from(blood2,15,{left:"-200px",onComplete:bloodFlow2,ease:Linear.easeNone});
}

function plasmodium(){
	var container = $("#part1-particles");
	var particles = container.children();
	var particlesActions = new Array();
	var height = container.height();
	var width  = container.width();
	var flowL = $("#part1-flowL");
	var flowR = $("#part1-flowR");
	container.removeAttr("style");
	$(".flow").css("opacity","0");
	$(".germs").removeAttr("style");
	$(".flow").removeAttr("style");
	
	TweenLite.to($(".flow"),1,{opacity:"1"});
	TweenLite.from(flowL,1,{rotation: -90, top: "-200px", left: "-50px",ease:Linear.easeNone});
	TweenLite.from(flowR,1,{rotation: 90, top: "-200px", right: "-50px",ease:Linear.easeNone});

	for (var i = 0; i < particles.length; i++){
    	TweenLite.to(particles[i], 4, {x:randomNumber(0-width*2,width*2), y:randomNumber(height, height*2),rotation: randomNumber(-180, 180), delay:0.8 }),0;
    }
    
    TweenLite.to($(".germs"),15,{left:vert+200+"px",ease:Linear.easeNone,delay:1.8,opacity:"1"});
    TweenLite.to($(".flow"),2,{opacity:"0",delay:10});

	 function randomNumber(min, max) {
	    return Math.floor(Math.random() * (1 + max - min) + min);
	}
}
/*
	var width:Number = 400;
var height:Number = 300;

function tweenFish():void {
    TweenLite.to(fish, 2, {x:randomNumber(0, width), y:randomNumber(0, height), onComplete:tweenFish});
}
tweenFish();


function randomNumber(min:Number, max:Number):Number {
    return Math.floor(Math.random() * (1 + max - min) + min);
}
*/



/*
// init controller
var controller = new ScrollMagic();

// assign handler "scene" and add it to Controller
var scene = new ScrollScene({duration: 100})
                .addTo(controller);

// add multiple scenes at once
var scene2;
controller.addScene([
    scene, // add above defined scene
    scene2 = new ScrollScene({duration: 200}), // add scene and assign handler "scene2"
    new ScrollScene({offset: 20}) // add anonymous scene
]);
Check out the examples or the documentation for full reference.

*/
