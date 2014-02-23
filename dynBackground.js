function DynamicBackground(element, start, numOfParticles){
	
	var randId = "background"+Math.round(Math.random()*9999999999).toString();
	$(element).prepend(
		"<canvas id=\""+randId+"\">If this appears then HTML5 is not supported.</canvas>"
	);
	
	//Grab the canvas and it's context
	this.canvas = $("#"+randId)[0];
  $(this.canvas).css({position:"absolute", top:"0px", left:"0px", width:"100%", height:"100%", "z-index":"-1"});
  $(this.canvas).parent().css({"z-index":"-2"});
	this.context = this.canvas.getContext("2d");
	
	//Initially resize the background
	resizeBackground();
	
	//Set getting the height and width of the canvas
	this.w = element.width;
	this.h = element.height;
	
	//Spawn particles
	this.particles = [];
	for(var i = 0; i<numOfParticles; i++)
		this.particles.push(new Particle(genRandomParticleVars(this)));
	this.updating = start;
	
	//Handle resizing of the background
	$(window).resize(resizeBackground);
	function resizeBackground(){
		$("#"+randId).attr("width", $(element).width());
		$("#"+randId).attr("height", $(element).height());
	};
	
	//Start animation
	if(start) window.requestAnimationFrame(this.update.bind(this));
};
DynamicBackground.prototype.resetParticles = function(){
  var length = this.particles.length;
  
	//Spawn particles
	this.particles = [];
	for(var i = 0; i<length; i++)
		this.particles.push(new Particle(genRandomParticleVars(this)));
  
};
DynamicBackground.prototype.update = function (){
	for(var i = 0; i<this.particles.length; i++)
		this.particles[i].update();
	if(this.updating)
		window.requestAnimationFrame(this.update.bind(this));
};
DynamicBackground.prototype.start = function(){
	this.updating = true;
	window.requestAnimationFrame(this.update.bind(this));
};
DynamicBackground.prototype.pause = function(){
	this.updating = false;
};
DynamicBackground.prototype.setType = function(type){
	
	switch(type){
		case this.threads:
			Particle.prototype.update = Particle.prototype.threads;
      break;
		case this.splatScreen:
			Particle.prototype.update = Particle.prototype.splatScreen;
      break;
	}
  
  this.resetParticles();
};

//Types of background particle paths
DynamicBackground.prototype.threads = 0;
DynamicBackground.prototype.splatScreen = 1;