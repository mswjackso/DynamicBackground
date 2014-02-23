//Will generate a random set of particle variables in case you don't want to set your
//own manually
function genRandomParticleVars(background){
	var val = {};
	val.x = Math.random()*background.canvas.width;
	val.y = Math.random()*background.canvas.height;
	val.z = Math.random()*10;
	val.h = Math.random()*50;
	val.w = val.h;
	val.r = Math.ceil((Math.random()*255));
	val.g = Math.ceil((Math.random()*255));
	val.b = Math.ceil((Math.random()*255));
	val.velocity = {
					x:(Math.random()*20)-10,
					y:(Math.random()*20)-10,
					z:((Math.random()*-1)-.2)
				   };
	val.background = background;
	return val;
};

//Particle class
function Particle(startVars){
	
	//Set standard variables
	this.x = startVars.x;
	this.y = startVars.y;
	this.z = startVars.z;
	this.h = startVars.h;
	this.w = startVars.w;
	this.r = startVars.r;
	this.g = startVars.g;
	this.b = startVars.b;
	this.background = startVars.background;
	this.velocity = startVars.velocity;	
	
};
//Set terminal velocity for all particles
Particle.prototype.terminalVelocity = 10;
//Moves the particle by it's velocity
Particle.prototype.move = function(){
	this.x+=this.velocity.x;
	this.y+=this.velocity.y;
	this.z+=this.velocity.z;
  if(this.z<0) this.z=1;
};
//Resets all of the applicable variables
Particle.prototype.reset = function(){
  this.x = Math.random()*background.canvas.width;
	this.y = Math.random()*background.canvas.height;
	this.z = Math.random()*100;
	this.h = 100;
	this.w = this.h;
	this.r = Math.ceil((Math.random()*255));
	this.g = Math.ceil((Math.random()*255));
	this.b = Math.ceil((Math.random()*255));
	this.velocity = {
                  x:(Math.random()*20)-10,
                  y:(Math.random()*20)-10,
                  z:((Math.random()*-1)-.2)
                 };
};
//Runs circle threads across the screen
Particle.prototype.threads = function(){
	
	//Move particle according to it's velocity
	this.move();
  
	//If it runs out of bounds then move it in bounds
	if(this.x<-this.w) this.x = this.background.canvas.width;
	else if(this.x>this.background.canvas.width) this.x = -this.w;
	else if(this.y<-this.h) this.y = this.background.canvas.height;
	else if(this.y>this.background.canvas.height) this.y = -this.h;
	
	//Draw particle circle
	this.background.context.beginPath();
	this.background.context.arc(this.x+(this.w/2), this.y+(this.h/2), this.w/2, 0, 2 * Math.PI, false);
  this.background.context.fillStyle = rgbToHex(this.r, this.g, this.b);
  this.background.context.fill();
	this.background.context.stroke();
};
//Has particles appear from a distance and splat against the screen
Particle.prototype.splatScreen = function(){
  
	//Move particle according to it's velocity
	this.move();
  
  //Apply some gravity with a terminal velocity
  if(this.velocity.y>0) this.velocity.y*=-1;
  if(this.velocity.y<this.terminalVelocity) this.velocity.y+=.1;
  
  //Apply some air-resistance
  if(this.velocity.x>.1) this.velocity.x-=.1;
  else if(this.velocity.x<-.1) this.velocity.x+=.1;
  else this.velocity.x = 0;
  
	//If it runs out of bounds then move it in bounds
	if(this.x<-this.w) this.x = this.background.canvas.width;
	else if(this.x>this.background.canvas.width) this.x = -this.w;
	else if(this.y<-this.h) this.y = this.background.canvas.height;
	else if(this.y>this.background.canvas.height) this.y = -this.h;
  else if(this.z<=1) this.reset();
  
  var distHeight = this.h/this.z;
  var distWidth = this.w/this.z;
  
	//Draw particle circle with distance
	this.background.context.beginPath();
	this.background.context.arc(this.x+(distWidth/2), this.y+(distHeight/2), distWidth/2, 0, 2 * Math.PI, false);
  this.background.context.fillStyle = rgbToHex(this.r, this.g, this.b);
  this.background.context.fill();
	this.background.context.stroke();
  
};
//Updates are by default to threads
Particle.prototype.update = Particle.prototype.threads;