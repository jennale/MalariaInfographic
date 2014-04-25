var hori = $(window).width();
var vert = $(window).height();

$(window).load(function(){
/* 	$(".loader").fadeOut("slow"); */ //Add a loading image to run while all images/etc are being created
$(".part").css("height",vert);
});

$(document).ready(function(){

$(window).scroll(function() { 
	//Makes the section sizes the exact size of the user's window.
	var getHor = $(this).scrollLeft();
	var getVert = $(this).scrollTop();
});

//Simple initialization of all parts.
	initPart0(); //Malaria: Introduction
	initPart1(); //What is Malaria?
	initPart2(); //Malaria: Global Statistics and other Info
				 //Prevention techniques 


});

/*-----------------------*/
/* -- PART0 ANIMATION -- */
/*-----------------------*/

function initPart0(){
	var banner, clouds1, clouds2, line, line2, tween1, tween2, tween3, scene1, scene2, scene3, controller;
	banner = $("#banner");		
	line = $("#banner .mid:first");
	line2 = line.next();	
	
	var instructions = TweenMax.to($("#instructions"),1,{y:"10",yoyo:true,repeat:-1});
	
	//Banner image
	tween1 = TweenLite.from(banner,1.5,{transform:"rotateY",opacity:"0"});
	//Lines of text
	tween2 = TweenMax.staggerFrom([line,line2],3,{opacity:"0", delay: 0},1);
	//Mosquito drinking
	tween3 = TweenLite.to($("#part0-mosn"),6,{clip:"rect(0px, 230px, 200px, 230px);",ease:Linear.easeNone,delay:10});	
	
	controller = new ScrollMagic({loglevel: 3});
	
	scene1 = new ScrollScene({offset:"100",duration: 150}).setTween(tween1);
	scene2 = new ScrollScene({offset:"250",duration: 200}).setTween(tween2);
	scene3 = new ScrollScene({offset:"200",duration: 700}).setTween(tween3);
	pin = new ScrollScene({duration: 1000}).setPin("#part0");
		
	scene1.on("start",function(event){
		instructions.pause();
	});
	scene1.on("leave",function(event){
		instructions.play();
	});	

	controller.addScene([scene1,scene2,scene3,pin]);

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
	var pin,text1,text2,tween1,tween2,scene1,scene2;
	text1 = $("#part1-text1");
	text2 = $("#part1-text2");
	pin = new ScrollScene({triggerElement:"#trigger1",offset:vert/2,duration: 1000}).setPin("#part1");
	pin.addIndicators();
	pin.on("start",function(event){
		plasmodium();
	});
	
	tween1 = TweenLite.from(text1,1,{opacity:"0",y:"20"});
	tween2 = TweenLite.from(text2,1,{opacity:"0",y:"20"});	
	
	scene1 = new ScrollScene({triggerElement:"#trigger1",offset:vert/2+200,duration:0}).setTween(tween1);
	scene2 = new ScrollScene({triggerElement:"#trigger1",offset:vert/2+500,duration:0}).setTween(tween2);
		
	controller = new ScrollMagic({loglevel: 3});
	controller.addScene([pin,scene1,scene2]);
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
	$(".flow").css("opacity","0","-webkit-transform","");
	$(".germs").removeAttr("style");
	$(".flow").removeAttr("style");
	
	TweenLite.to($(".flow"),1,{opacity:"1"});
	var tween=TweenLite.from(flowL,1,{rotation: -90, top: "-200px", left: "-50px",ease:Linear.easeNone});
	var tween2=TweenLite.from(flowR,1,{rotation: 90, top: "-200px", right: "-50px",ease:Linear.easeNone});
    TweenLite.to($("#part1-flow"),2,{opacity:"0",delay:10});
	

	//Export particles in random movement burst
	for (var i = 0; i < particles.length; i++){
    	TweenLite.to(particles[i], 4, {x:rand(0-width*2,width*2), y:rand(height, height*3), rotation:rand(-180, 180), delay:0.8 }),0;
    }
    //Particles flow with blood after release
    TweenLite.to($(".germs"),15,{left:vert+200+"px",ease:Linear.easeNone,delay:1.8,opacity:"1"});
    //Flow/movement lines disappear
}

function rand(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}


/*-----------------------*/
/* -- PART2 ANIMATION -- */
/*-----------------------*/

function initPart2(){
	var pin,text1,text2,tween1,tween2,scene1,scene2;

/*
	pin = new ScrollScene({triggerElement:"#trigger2",offset:vert/2,duration: 1000}).setPin("#part2");
	pin.addIndicators();
	
	controller = new ScrollMagic({loglevel: 3});
	controller.addScene([pin]);
*/
/* 	TweenLite.to($("#net"),10,({y:-1300}));
*/
	makePart2Map();
	var thing = $("#part2-emph1 span");
	countUp(thing.text(),thing,2000,0);
	makePart4Map();
/* 	$('#part2-world-map').vectorMap('get','mapObject').remove(); */
	makePart2MapCases();
	var thing2 = $("#part2-emph2 span");
	countUp(thing2.text(),thing2,2000,1);

/*     $('#part2-mapTitle').text("Malaria Cases by Country Visualization"); */

}

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
				    fill: '#5c5c5c'
				  },
				  selected: {
				    fill: 'yellow'
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
				    fill: '#5c5c5c'
				  },
				  selected: {
				    fill: 'yellow'
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
     $("#part2-world-map-cases").append("<p>Data retrieved from the WHO 2013 World Malaria Report</p>");
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
				    fill: '#5c5c5c'
				  },
				  selected: {
				    fill: 'yellow'
				  },
				  selectedHover: {
				  }
				},
  
  series: {				//Data visualization series
    regions: [{
      values: casesData,//Array variable to take data from
      scale: ['#ffb9b2', '#9a0000'],	//Color scale
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
                pad: 1.05
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
