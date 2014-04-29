var hori = $(window).width();
var vert = $(window).height();
var count = 0;

$(window).load(function(){
$("#loader").fadeOut("slow"); //Add a loading image to run while all images/etc are being created
$(".part").css("height",vert);
});

$(document).ready(function(){

$(window).scroll(function() { 
	//Makes the section sizes the exact size of the user's window.
	var getHor = $(this).scrollLeft();
	var getVert = $(this).scrollTop();
});

//Code used to give users option to refresh page when they resize
$(window).resize(function() {
	var getHor2 = $(window).width();
	var getVert2 = $(window).height();
	if ((count%3==0) && (getHor2!=hori || getVert2!=vert)){
	  r = confirm("Window was resized. Would you like to refresh the page for best viewing options?")
	  if (r==true)
	  	 location.reload();
	  else {
	  	window.hori = getHor2;
	  	window.vert = getVert2;
	  	}
	  }
	  	window.count++;  
});

/* Code used to have a 'hint' appear that tells the user to continue scrolling to access the rest of the document */
var scroll = 0;

function hint(position)
{
	var hint = $("#instructions-hint");
	hint.removeAttr("style");
setTimeout(function(){
	if (position == $(window).scrollTop() && 800<$(window).scrollTop()){
		TweenLite.to($("#instructions-hint"),1,{opacity:"1",bottom:"5px"},Linear.easeNone);		
	}
},5000);
}

$(window).scroll(function() {
    window.scroll=$(window).scrollTop();
    hint(window.scroll);
    
/*
	    
    if(st>1450){
        if(flag)
        alert('test');flag=false;
    }
*/
    
});


//Simple initialization of all parts.
	initPart0(); //Malaria: Introduction
	initPart1(); //What is Malaria?
	initPart2(); //Malaria: Global Statistics and other Info
	initPart3(); //Prevention techniques 
	initPart4(); //What is being done / Future goals
/* 	myFunction(window.scroll); */

});

/*-----------------------*/
/* -- PART0 ANIMATION -- */
/*-----------------------*/

function initPart0(){
	var banner, clouds1, clouds2, line, line2, tween1, tween2, tween3, scene, scene1, scene2, scene3,scene4, controller;
	banner = $("#banner");		
	line = $("#banner .mid:first");
	line2 = line.next();	
	$("#instructions").css("opacity","0");
	
	TweenMax.to($("#instructions-hint"),1,{y:"10",yoyo:true,repeat:-1});	
			
	//Start button
	$('#startBtn').mousedown(function() {
		$(this).addClass("clicked");
	}).bind('mouseup ', function() {
		$(this).removeClass("clicked")
		scrollTo(0,200);
		TweenLite.to($('#startBtn'),0.5,{opacity:"0"});
	});
	
	//Banner image
	TweenLite.set(banner, {transformPerspective:500});	
	tween1 = TweenLite.from(banner,1.5,{rotationX:90,y:-50,opacity:"0"});
	//Lines of text
	tween2 = TweenMax.staggerFrom([line,line2],1.5,{opacity:"0", delay: 2},1.5);
	//Mosquito drinking
	tween3 = TweenLite.from($("#part0-mosn,#part0-mosr,#part0-wing"),3,{delay:3 ,y:-vert,x:hori,ease:RoughEase.ease.config({points:9, template:Elastic.easeIn, taper:"in", clamp:true})});
	tween4 = TweenLite.to($("#part0-mosn"),6,{clip:"rect(0px, 230px, 200px, 230px);",ease:Linear.easeNone});	
	
	controller = new ScrollMagic();
	
	scene = new ScrollScene({duration:1}).setPin("#trigger1");
	
	scene.on("enter leave",function(event){
		TweenLite.to($('#startBtn'),2,{opacity:"1"});
	});

	pin = new ScrollScene({duration: 800}).setPin("#part0");
	
	scene1 = new ScrollScene({offset:"200",duration: 0}).setTween(tween1);
	scene2 = new ScrollScene({offset:"200",duration: 0}).setTween(tween2);
	scene3 = new ScrollScene({offset:"200",duration: 0}).setTween(tween3);
	scene4 = new ScrollScene({offset:"210",duration: 600}).setTween(tween4);
	
	
	scene1.on("end",function(event){
		TweenLite.to($('#startBtn'),0.1,{opacity:"0"});
		$("#instructions").removeAttr("style");
		TweenLite.from($("#instructions"),2,{opacity:"0",top:vert,delay:4});
		TweenMax.to($("#instructions"),1,{y:"10",yoyo:true,repeat:-1});	
	});

	controller.addScene([pin,scene,scene1,scene2,scene3,scene4]);
	wingFlap();
	loopClouds();
}
	
function loopClouds(){
	var clouds1 = $("#clouds1");
	var clouds2 = $("#clouds2");
	TweenMax.to(clouds2,60,{left:vert,repeat:-1,yoyo:true,ease:Linear.easeNone});
	TweenMax.to(clouds1,50,{css:{left:vert},repeat:-1,yoyo:true,ease:Linear.easeNone});
}

function wingFlap(){
	var wings = $("#part0-wing");
	wings.css("opacity","1");
	TweenMax.to($("#part0-wing"),0.1,{opacity:"0",repeat:2,delay:rand(3,5),onComplete:wingFlap});
}

/*-----------------------*/
/* -- PART1 ANIMATION -- */
/*-----------------------*/

function initPart1(){
	var pin,text1,text2,tween1,tween2,scene1,scene2,scene3;
	text1 = $("#part1-text1");
	text2 = $("#part1-text2");
	text3 = $("#part1-text3");
	pin = new ScrollScene({triggerElement:"#trigger1",offset:vert/2,duration: 1000}).setPin("#part1");
	pin.addIndicators();
	pin.on("start",function(event){
		plasmodium();
	});
	pin.on("exit",function(event){
		$(".germs").removeAttr("style");
	});
	
	tween1 = TweenLite.from(text1,1,{opacity:"0",y:"20"});
	tween2 = TweenLite.from(text2,1,{opacity:"0",y:"20"});	
	tween3 = TweenLite.from(text3,1,{opacity:"0",y:"20"});	
	
	scene1 = new ScrollScene({triggerElement:"#trigger1",offset:vert/2,duration:0}).setTween(tween1);
	scene2 = new ScrollScene({triggerElement:"#trigger1",offset:vert/2+200,duration:0}).setTween(tween2);
	scene3 = new ScrollScene({triggerElement:"#trigger1",offset:vert/2+500,duration:0}).setTween(tween3);
	
		
	controller = new ScrollMagic();
	controller.addScene([pin,scene1,scene2,scene3]);
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
/* 	$(".flow").css("opacity","0"); */
	
	$("img.germs").removeAttr("style");
	$(".flow").removeAttr("style");	

	//,"-webkit-transform",""
	TweenLite.to($(".flow"),1,{opacity:"1"});
	var tween=TweenLite.from(flowL,1,{ top: "-200px", left: "-50px",ease:Linear.easeNone});
	var tween2=TweenLite.from(flowR,1,{ top: "-200px", right: "-50px",ease:Linear.easeNone});
/*     TweenLite.to($("#part1-flow"),2,{opacity:"0",delay:10}); */
	
	//Export particles in random movement burst
	for (var i = 0; i < particles.length; i++){
    	TweenLite.to(particles[i], 4, {left:rand(0-width*2,width*2), top:rand(height, height*3), rotation:rand(-180, 180), delay:0.8 }),0;
    }
    //Particles flow with blood after release
    TweenLite.to($(".germs"),15,{left:vert+200+"px",ease:Linear.easeNone,delay:1.8,opacity:"1"});
    //Flow/movement lines disappear

    
    fixMaps();
    
}

function fixMaps(){
	$('#part2-world-map').resize();
    $('#part2-world-map-cases').resize();
    $('#part4-world-map').resize();
}

function rand(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}



/*-----------------------*/
/* -- PART2 ANIMATION -- */
/*-----------------------*/

function initPart2(){
	var pin,map,mapCases,textbox,text1,text2,text3,textbox,emph1,emph2,tween1,tween2,mapTween1, mapTween2,scene1,scene2,scene3,scene4;
	makePart2Map();
	makePart2MapCases();
	
	map = $('#part2-world-map');
	mapCases = $('#part2-world-map-cases');
	emph1 = $("#part2-emph1 span");
	emph2 = $("#part2-emph2 span");
	
	text1 = $("#part2-emph1");
	text2 = $("#part2-top-info p");
	text3 = $("#part2-emph2");	
	textbox = $("#part2-text2");
	
	//"Malaria is endemic to 97 countries worldwide
	tween1 = TweenLite.from(text1,1,{opacity:"0",y:"20",onStart:countUp,onStartParams:[97,emph1,2000,0]});
	//"Generally in tropical and subtropic regions of the world"
	tween2 = TweenLite.from(text2,1,{opacity:"0",y:"20",delay:2});	
	//"But 90% of deaths occur in sub-saharan africa"
	tween3 = TweenLite.from(text3,1,{opacity:"0",y:"20",onStart:countUp,onStartParams:[90,emph2,2000,1]});		
	//Why in africa? (textbox)
	tween4 = TweenLite.from(textbox,1,{opacity:"0",y:"20"});	
/*
	
	countUp(emph1.text(),emph1,2000,0);
	countUp(emph2.text(),emph2,2000,1);
*/
	

/* 	map.fadeOut("slow"); */
/* 	TweenMax.to(mapCases,2,{opacity:"1",delay:2.2}); */

	mapTween1 = TweenLite.to(map,0.1,{opacity:"0",onComplete:hideMap,delay:2.5});
	

	pin = new ScrollScene({triggerElement:"#trigger2",offset:vert/2,duration: 1700}).setPin("#part2");
	scene1 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2,duration:0}).setTween(tween1);
	scene2 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2,duration:0}).setTween(tween2);
	scene3 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2+500,duration:0}).setTween(tween3);
	space1 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2+500,duration:0}).setTween(mapTween1);
	scene4 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2+700,duration:0}).setTween(tween4);
	
	controller = new ScrollMagic();
	controller.addScene([pin,scene1,scene2,scene3,space1,scene4]);
	
/*
	//Reset emphasized numbers so that countdown animation can restart normally
	scene1.on("start",function(event){
		emph1.html("&nbsp;");	
	});
	scene2.on("start",function(event){
		emph2.html("&nbsp;");
	});
*/
	space1.on("start",function(event){
		map.removeAttr("style");
		mapCases.removeAttr("style");			
	});
		
/* 	$('#part2-world-map').vectorMap('get','mapObject').remove(); */
/* 	$('#part2-world-map').fadeOut(2000); */
/* 	TweenMax.to($('#part2-world-map-cases'),2,{opacity:"1",delay:2.2}); */

	fixMaps();

	function hideMap(){
		map.css("display","none");
		mapCases.css("opacity","1");
		
/* 		TweenLite.to(mapCases,1,{opacity:"1"}); */
/* 		$("#part2-world-map-cases").append("<p>Data retrieved from the WHO 2013 World Malaria Report</p>"); */
	}
}

/*
	pin.on("start",function(event){
		plasmodium();
	});
*/


var plot1=null;

function makePart2Map(){
$('#part2-world-map').vectorMap({
  map: 'world_mill_en', //Dealing with the world map
  backgroundColor:'transparent', //Set background
  zoomOnScroll: false,
  regionStyle: {
				  initial: {
				    fill: '#4c4c4c'
				  },
				  hover: {
				    /* "fill-opacity": 0.8 */
				    fill: '#fba309'
				  },
				  selected: {
				    fill: '#fba309'
				  },
				  selectedHover: {
				  }
				},
  
  series: {				//Data visualization series
    regions: [{
      values: casesData,//Array variable to take data from
      scale: ['#9a0001', '#9a0000'],	//Color scale
      normalizeFunction: 'polynomial'	//Displays the difference/contrast between numbers more clearly
    }]
  },
  //Edit hover label format: Country \n Cases: ##
  onRegionLabelShow: function(evt, lbl, countryCode){
    lbl.html(lbl.html());
  }
});
   $("#part2-world-map").append("<p>Data retrieved from the WHO 2013 World Malaria Report</p>");
   $('#part2-mapTitle').text("Countries Affected by Malaria");
   };

function makePart2MapCases(){
$('#part2-world-map-cases').vectorMap({
  map: 'world_mill_en', //Dealing with the world map
  backgroundColor:'transparent', //Set background
  zoomOnScroll: false,
  regionStyle: {
				  initial: {
				    fill: '#4c4c4c'
				  },
				  hover: {
				    /* "fill-opacity": 0.8 */
				    fill: '#fba309'
				  },
				  selected: {
				    fill: '#fba309'
				  },
				  selectedHover: {
				  }
				},
  
  series: {				//Data visualization series
    regions: [{
      values: casesData,//Array variable to take data from
      scale: ['#ffffff', '#9a0000'],	//Color scale
      normalizeFunction: 'polynomial'	//Displays the difference/contrast between numbers more clearly
    }]
  },
  //Edit hover label format: Country \n Cases: ##
  onRegionLabelShow: function(evt, lbl, countryCode){
    lbl.html(lbl.html()+'<br/>Cases: '+formatNumber(casesData[countryCode]));
	}
});
};

function countUp(maxValue, countObject, duration,percentage){
	var percent = '';
$({countNum: 0}).animate({countNum:maxValue},{
	duration: duration,
	easing:'linear',
	step: function(){
		if (percentage==1)
			percent = '%';
		countObject.text(Math.floor(this.countNum)+percent);
		},
	complete: function() {
		countObject.text(this.countNum+percent);
		}
	
	})
}


/*-----------------------*/
/* -- PART3 ANIMATION -- */
/*-----------------------*/

function initPart3(){
	var pin,textbox1,textbox2,textbox3,textbox4, bigNet, miniNet, bed, sprayCan, sprayCloud, woman, moon;
	var netTween1, netTween2, nightTween1, nightTween2;
	
	textbox1 = $("#part3-ITN"); //ITN textbox
	textbox2 = $("#part3-IRS"); //IRS textbox
	textbox3 = $("#part3-antiMed"); //antimalarial medicine textbox
	textbox4 = $("#part3-other"); //other textbox
	
	
	bigNet = $("#net");
	
	miniNet = $("#part3-mininet");
	bed = $("#part3-bed");
	
	sprayCan = $("#part3-spraycan");
	sprayCloud = $("#part3-spraycloud");
	

/* 	$("#net").hide(); */

	//Turning into night
	nightTween1 = TweenLite.to($("#part3-top"),2,({css:{"backgroundColor": "#32394f"},ease:Linear.easeNone,delay:2}));
	nightTween2 = TweenLite.to($("#part3"),2,({css:{"backgroundColor": "#232439"},ease:Linear.easeNone,delay:2}));
	nightTween3 = TweenLite.from($("#net"),2,({css:{"backgroundColor": "rgba(112,112,112,0.46)"},ease:Linear.easeNone,delay:2}));
	//Moving net up
	netTween1 = TweenLite.to($("#net"),5,({"background-position-y":"-1300px",ease:Linear.easeNone}));
	netTween2 = TweenLite.to($("#net"),2,({opacity:"0"}));
	
	//Textboxes
	tween1 = TweenLite.from(textbox1,1,{opacity:"0",y:"20"});	
	tween2 = TweenLite.from(textbox2,1,{opacity:"0",y:"20"});	
	tween3 = TweenLite.from(textbox3,1,{opacity:"0",y:"20"});	
	tween4 = TweenLite.from(textbox4,1,{opacity:"0",y:"20"});	
	
	tweenMiniNet = TweenLite.from(miniNet,3,{scaleY:0.1,y:-300,opacity:"0",ease:Linear.easeNone});
	
	tweenSprayCan = TweenLite.from(sprayCan,2,{y:20});
	tweenSprayCloud = TweenMax.from(sprayCloud,0.5,{scaleY:0.1,scaleX:0.1,x:-25,y:-70,opacity:"0",ease:Linear.easeNone,delay:1,repeat:3});
		
	pin = new ScrollScene({triggerElement:"#trigger3",offset:vert/2,duration: 3000}).setPin("#part3");
	scene1 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+150,duration:0}).setTween(nightTween1);
	scene2 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+150,duration:0}).setTween(nightTween2);
	scene2b = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+150,duration:0}).setTween(nightTween3);
	
	scene3 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+500,duration:800}).setTween(netTween1);
	scene4 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+1000,duration:300}).setTween(netTween2);
	
	scene5 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+1400,duration:0}).setTween(tween1);	
	scene6 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+1650,duration:250}).setTween(tweenMiniNet);	
	
	scene7 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+2000,duration:0}).setTween(tween2);	
	scene8 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+2150,duration:50}).setTween(tweenSprayCan);	
	scene9 = new ScrollScene({triggerElement:"#trigger3",offset:vert/2+2200,duration:100}).setTween(tweenSprayCloud);
	scene10 =new ScrollScene({triggerElement:"#trigger3",offset:vert/2+2400,duration:0}).setTween(tween3); 	
	
	pin.addIndicators();
	
	controller = new ScrollMagic();
	controller.addScene([pin,scene1,scene2,scene2b,scene3,scene4,scene5,scene6,scene7,scene8,scene9,scene10]);	
		
}



/*
	var pin,map,mapCases,textbox,text1,text2,text3,textbox,emph1,emph2,tween1,tween2,mapTween1, mapTween2,scene1,scene2,scene3,scene4;
	makePart2Map();
	makePart2MapCases();
	
	map = $('#part2-world-map');
	mapCases = $('#part2-world-map-cases');
	emph1 = $("#part2-emph1 span");
	emph2 = $("#part2-emph2 span");
	
	text1 = $("#part2-emph1");
	text2 = $("#part2-top-info p");
	text3 = $("#part2-emph2");	
	textbox = $("#part2-text2");
	
	//"Malaria is endemic to 97 countries worldwide
	tween1 = TweenLite.from(text1,1,{opacity:"0",y:"20",onStart:countUp,onStartParams:[97,emph1,2000,0]});
	//"Generally in tropical and subtropic regions of the world"
	tween2 = TweenLite.from(text2,1,{opacity:"0",y:"20",delay:2});	
	//"But 90% of deaths occur in sub-saharan africa"
	tween3 = TweenLite.from(text3,1,{opacity:"0",y:"20",onStart:countUp,onStartParams:[90,emph2,2000,1]});		
	//Why in africa? (textbox)
	tween4 = TweenLite.from(textbox,1,{opacity:"0",y:"20"});	

	mapTween1 = TweenLite.to(map,0.1,{opacity:"0",onComplete:hideMap,delay:2.5});
	
	pin = new ScrollScene({triggerElement:"#trigger2",offset:vert/2,duration: 1700}).setPin("#part2");
	scene1 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2,duration:0}).setTween(tween1);
	scene2 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2,duration:0}).setTween(tween2);
	scene3 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2+500,duration:0}).setTween(tween3);
	space1 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2+500,duration:0}).setTween(mapTween1);
	scene4 = new ScrollScene({triggerElement:"#trigger2",offset:vert/2+700,duration:0}).setTween(tween4);
	
	controller = new ScrollMagic();
	controller.addScene([pin,scene1,scene2,scene3,space1,scene4]);
*/

	
	
/*-----------------------*/
/* -- PART4 ANIMATION -- */
/*-----------------------*/
function initPart4(){
	makePart4Map();	
	
	var pin,map,mapCases,textbox,text1,text2,text3,textbox,emph1,emph2,tween1,tween2,mapTween1, mapTween2,scene1,scene2,scene3,scene4;
	pin = new ScrollScene({triggerElement:"#trigger4",offset:vert/2,duration: 500}).setPin("#part4");

	controller = new ScrollMagic();
	controller.addScene([pin]);	
	
}
function makePart4Map(){
$('#part4-world-map').vectorMap({
  map: 'world_mill_en', //Dealing with the world map
  backgroundColor:'transparent', //Set background
  zoomOnScroll: false,
  regionsSelectable: true,
  regionsSelectableOne: true,
  regionStyle: {
				  initial: {
				    fill: '#4c4c4c'
				  },
				  hover: {
				    /* "fill-opacity": 0.8 */
				    fill: '#fba309'
				  },
				  selected: {
				    fill: '#fba309'
				  },
				  selectedHover: {
				  }
				},
  
  series: {				//Data visualization series
    regions: [{
      values: casesData,//Array variable to take data from
      scale: ['#ffffff', '#9a0000'],	//Color scale
      normalizeFunction: 'polynomial'	//Displays the difference/contrast between numbers more clearly
    }]
  },
  //Edit hover label format: Country \n Cases: ##
  onRegionLabelShow: function(evt, lbl, countryCode){
    lbl.html(lbl.html()+'<br/>Cases: '+formatNumber(casesData[countryCode]));
  },
  onRegionSelected: function(e, code, isSelected, selectedRegions){
   	 var country = $("#part4-world-map").vectorMap('get','mapObject').getRegionName(code);
   	 if (plot1!=null){
	  	plot1.destroy();
	  	if (checkValidData(code))
  	 		plot1 = makeBarGraph(itnData2012[code],irsData2012[code],antiMal2012[code],country);
  	 }
  	 else if (checkValidData(code)){
  	 	plot1 = makeBarGraph(itnData2012[code],irsData2012[code],antiMal2012[code],country);
 	 }
 	 scrollTo(0,document.body.scrollHeight,{duration:'slow'});
  }
});

   
   $("#part4-world-map").append("<p>Data retrieved from the WHO 2013 World Malaria Report</p>");

};
//Function is used to add commas to the formated number string (for Readability)
	function formatNumber(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
		}
		//Function is used to check if the country has valid data to be displayed in a graph
function checkValidData(code){
	if ((typeof itnData2012[code] == 'undefined')||(typeof irsData2012[code] == 'undefined')||(typeof antiMal2012[code] == 'undefined'))
		return false;
	else return true;

}


function makeBarGraph(ITN, IRS, antiMal, country){
	var one, two, three;
	one = [ITN];
	two = [IRS];
	three = [antiMal];
	if (ITN==-1){
		one = [' '];
		var title1 = "(No Information Provided)";
	}
	else title1 = 'Insectide Treated Nets '+one+'%';	
	if (IRS==-1){
		two = [' '];
		var title2 = "(No Information Provided)";
	}
	else title2 = 'Indoor Residual Spraying '+two+'%';
	
	if (antiMal==0){
		three = [' '];
		var title3 = "(No Information Provided)";
	}
	else title3 = ' Antimalarial Coverage '+three+'%';
	var line = [ITN,IRS,antiMal];
	var plot = jQuery.jqplot('chart1',[line],{
		title: country + '\'s Estimated Intervention/Prevention Coverage',
		seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
            barPadding: 8,      // number of pixels between adjacent bars in the same
                                // group (same category or bin).
            barMargin: 10,      // number of pixels between adjacent groups of bars.
            barDirection: 'vertical', // vertical or horizontal.
            barWidth: 50,     // width of the bars.  null to calculate automatically.
            shadowOffset: 2,    // offset from the bar edge to stroke the shadow.
            shadowDepth: 5,     // nuber of strokes to make for the shadow.
            shadowAlpha: 0.8,   // transparency of the shadow.
        }
        },
        series:[
		{pointLabels:{
			show: true,
			labels:[title1, title2 , title3]
		}}],
		axesDefaults:{
			min:0,
			max:120
		},
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
            },
            // Pad the y axis just a little so bars can get close to, but
            // not touch, the grid boundaries.  1.2 is the default padding.
            yaxis: {
            	label:'% of population potentially protected',
                pad: 1.05,
          labelOptions: {
            fontSize: '8pt'
          }                
            }
         }
      }); 
      return plot;
	}

function makePieGraph(ITN, IRS, antiMal){
		var one, two, three, four, five, six;
	one = ITN;
	two = 100-ITN;
	three = IRS;
	four = 100-IRS;
	five = antiMal;
	six = 100-antiMal;
	
	var data = [['Population potentially protected by ITNs', one],['Unprotected', two]];
	var data2 = [['% IRS Coverage', three],['Unprotected',four]];
	var data3 = [['AntiMalarial coverage',five],['Unprotected',six]]
	var plot1 = $.jqplot ('chart1', [data,data2,data3], 
    { 
      seriesDefaults: {
        // Make this a pie chart.
        renderer: $.jqplot.DonutRenderer, 
        rendererOptions: {
          // Put data labels on the pie slices.
          // By default, labels show the percentage of the slice.
          sliceMargin: 1,
          startAngle: -90,
          showDataLabels: true
        }
      }, 
      legend: { show:true, location: 'e' }
    }
  );
  return plot1;
}

/*
	tween3 = TweenLite.to($("#part0-mosn"),6,{clip:"rect(0px, 230px, 200px, 230px);",ease:Linear.easeNone,delay:10});	

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
