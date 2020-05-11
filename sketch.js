var font;
var vehicles = [];
var stars = []; //array of stars
var countStar = 2000; //number of stars

var texts = ['?', 'Dubhe', 'Merak', 'Phecda', 'Megrez', 'Alioth', 'Mizar', 'Alkaid'];
var nextT = 0;
var maxChangeForce = 20;

var instructions = [];
var insText = ['Find The Star You Should Pray To', 'Nine Kowtows To Your Star To Remove Your Bad Luck', 'Your Bad Luck Is Removed Now'];
var innextT = 0;


var removed = [];
var subText = ['Your Bad Luck Is Removed Now'];
var subnextT = 0;

var BdStarS = [];
var bdA = false;

var kowtow = 0;
var badLuckRemover = false;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

var bdx;
var bdy;

var bigdipperObject;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bdx = [width / 2 + 200, width / 2 + 170, width / 2 + 40, width / 2 + 20, width / 2 - 100, width / 2 - 180, width / 2 - 260];
  bdy = [height / 2 + 20, height / 2 + 100, height / 2 + 80, height / 2, height / 2 - 50, height / 2 - 100, height / 2 - 130];
  bigdipperObject = new bigDipper();

  input = createInput('', 'date');
  input.position(width / 2 - input.width / 2, height / 2 - input.height / 2);
  //input.input(zodiacCheck)
  button = createButton('Submit');
  button.mousePressed(zodiacCheck);
  button.position(input.x + input.width + 5, height / 2 - input.height / 2);

  background(51);

  for (var i = 0; i < 1000; i++) {
    stars[i] = new Star(); //define stars

  }

  var bounds = font.textBounds(texts[nextT], 0, 0, 192);
  var posx = width / 2 - bounds.w / 2;
  var posy = 2.3 * (height / 3) + bounds.h / 2;

  var points = font.textToPoints(texts[nextT], posx, posy, 192, {
    sampleFactor: 0.1
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

  var boundsIns = font.textBounds(insText[innextT], 0, 0, 30);
  var posxIns = width / 2 - boundsIns.w / 2;
  var posyIns = height / 6 + boundsIns.h / 2;

  var insAr = split(insText[innextT], ' ');

  for (var i = 0; i < insAr.length; i++) {
    var bounds2 = font.textBounds(insAr[i], 0, 0, 30);
    var posx2 = posxIns;
    var posy2 = posyIns;

    posxIns += bounds2.w + 10;

    var points2 = font.textToPoints(insAr[i], posx2, posy2, 30, {
      sampleFactor: 0.25
    });

    for (var j = 0; j < points2.length; j++) {
      var pt = points2[j];
      var v = new Vehicle(pt.x, pt.y, 3);
      instructions.push(v);
    }
  }

  for (var i = 0; i < BdStarS.length; i++) {
    BdStarS[i] = new bidDipper();
  }

}

function draw() {
  if (badLuckRemover == true) {

    background(51);
    push();
    translate(width / 2, height / 2); //set center points
    for (let i = 0; i < stars.length; i++) {
      stars[i].updateLocation();
      stars[i].createStar();
    }
    pop();

    for (var i = 0; i < removed.length; i++) {
      var v = removed[i];
      v.behaviors();
      v.update();
      v.show();
    }
    return;
  }

  background(51);
  push();
  translate(width / 2, height / 2); //set center points
  for (let i = 0; i < stars.length; i++) {
    stars[i].updateLocation();
    stars[i].createStar();
  }
  pop();

  for (var i = 0; i < instructions.length; i++) {
    var v = instructions[i];
    v.behaviors();
    v.update();
    v.show();
  }

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }

  if (bdA == true) {
    bigdipperObject.draw();
  }
}

class bigDipper {

  constructor() {
    this.size = bdx.map(v => random(0.25, 3));
    this.bdBsize = bdx.map(v => random(0.01, 8));
    this.t = bdx.map(v => random(TAU));
  }
  draw() {
    for (var i = 0; i < bdx.length; i++) {
      this.t[i] += 0.1;
      var bdX = this.size[i] + sin(this.t[i]) * 4;
      var bdB = this.bdBsize[i] + sin(3 * (this.t[i])) * 4;
      push();
      fill((nextT == 1 ? 255 : 100));
      ellipse(bdx[0], bdy[0], (nextT == 1 ? bdB : bdX));
      pop();
      push();
      fill((nextT == 2 ? 255 : 100));
      ellipse(bdx[1], bdy[1], (nextT == 2 ? bdB : bdX));
      pop();
      push();
      fill((nextT == 3 ? 255 : 100));
      ellipse(bdx[2], bdy[2], (nextT == 3 ? bdB : bdX));
      pop();
      push();
      fill((nextT == 4 ? 255 : 100));
      ellipse(bdx[3], bdy[3], (nextT == 4 ? bdB : bdX));
      pop();
      push();
      fill((nextT == 5 ? 255 : 100));
      ellipse(bdx[4], bdy[4], (nextT == 5 ? bdB : bdX));
      pop();
      push();
      fill((nextT == 6 ? 255 : 100));
      ellipse(bdx[5], bdy[5], (nextT == 6 ? bdB : bdX));
      pop();
      push();
      fill((nextT == 7 ? 255 : 100))
      ellipse(bdx[6], bdy[7], (nextT == 7 ? bdB : bdX));
      pop();

    }
  }


}

function Star() {
  this.x = random(-width, width); //random value between -width and width
  this.y = random(-height, height); //random value between -height and height
  this.z = random(width); //random up to width

  this.updateLocation = function() {
    this.z = this.z - 1; //set new z-location

    if (this.z < 1) {
      this.z = width;
    }
  }

  this.createStar = function() {
    fill(155);
    noStroke();
    //Re-scale x and y
    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);
    ellipse(sx, sy, 8, 8); //ellipse(locationX,locationY,sizeX,sizeY);
  }

}

function zodiacCheck() {
  // print(font.textBounds);
  // console.log(input.value());

  // Initializing the Strings 
  let String = input.value();

  // Calling to split() function. 
  let D = split(String, '-');
  let year = D[0];
  let month = D[1];
  let day = D[2];
  //get zodia
  if (year && month && day) {
    //Default parameter is the current date
    let zodiac = new Zodiac(year, month, day);
    let zodiacVal = zodiac.getZodiac();
    jumurl(zodiacVal);
    // print("zodiac", zodiacVal);
  } else {}


  var bounds = font.textBounds(texts[nextT], 0, 0, 192);
  var posx = width / 2 - bounds.w / 2;
  var posy = 2.3 * (height / 3) + bounds.h / 2;

  var points = font.textToPoints(texts[nextT], posx, posy, 192, {
    sampleFactor: 0.1
  });



  var boundsIns = font.textBounds(insText[innextT], 0, 0, 30);
  var posxIns = width / 2 - boundsIns.w / 2;
  var posyIns = height / 6 + boundsIns.h / 2;

  var insAr = split(insText[innextT], ' ');


  var points2 = [];
  for (var i = 0; i < insAr.length; i++) {
    var bounds2 = font.textBounds(insAr[i], 0, 0, 30);
    var posx2 = posxIns;
    var posy2 = posyIns;
    posxIns += bounds2.w + 10;
    points2 = points2.concat(font.textToPoints(insAr[i], posx2, posy2, 30, {
      sampleFactor: 0.25
    }));
  }



  if (points2.length < instructions.length) {
    var toSplice2 = instructions.length - points2.length;
    instructions.splice(points2.length - 1, toSplice2);

    for (var j = 0; j < points2.length; j++) {
      instructions[j].target.x = points2[j].x;
      instructions[j].target.y = points2[j].y;

      var force = p5.Vector.random2D();
      force.mult(random(maxChangeForce));
      instructions[j].applyForce(force);
    }
  } else if (points2.length > instructions.length) {

    for (var j = instructions.length; j < points2.length; j++) {
      var v = instructions[j - instructions.length].clone();
      v.r = 3;

      instructions.push(v);
    }

    for (var j = 0; j < points2.length; j++) {
      instructions[j].target.x = points2[j].x;
      instructions[j].target.y = points2[j].y;

      var force = p5.Vector.random2D();
      force.mult(random(maxChangeForce));
      instructions[j].applyForce(force);
    }

  } else {
    for (var j = 0; j < points.length; j++) {
      instructions[j].target.x = points[j].x;
      instructions[j].target.y = points[j].y;

      var force = p5.Vector.random2D();
      force.mult(random(maxChangeForce));
      instructions[j].applyForce(force);
    }
  }




  if (points.length < vehicles.length) {
    var toSplice = vehicles.length - points.length;
    vehicles.splice(points.length - 1, toSplice);

    for (var i = 0; i < points.length; i++) {
      vehicles[i].target.x = points[i].x;
      vehicles[i].target.y = points[i].y;

      var force = p5.Vector.random2D();
      force.mult(random(maxChangeForce));
      vehicles[i].applyForce(force);
    }
  } else if (points.length > vehicles.length) {

    for (var i = vehicles.length; i < points.length; i++) {
      var v = vehicles[i - vehicles.length].clone();

      vehicles.push(v);
    }

    for (var i = 0; i < points.length; i++) {
      vehicles[i].target.x = points[i].x;
      vehicles[i].target.y = points[i].y;

      var force = p5.Vector.random2D();
      force.mult(random(maxChangeForce));
      vehicles[i].applyForce(force);
    }

  } else {
    for (var i = 0; i < points.length; i++) {
      vehicles[i].target.x = points[i].x;
      vehicles[i].target.y = points[i].y;

      var force = p5.Vector.random2D();
      force.mult(random(maxChangeForce));
      vehicles[i].applyForce(force);
    }
  }
  input.remove();
  button.remove();
  bdA = true;

  // bigDipper();

}

function jumurl(type) {
  switch (type.id) {
    case 0:
      nextT = 1;
      innextT = 1;
      break;
    case 1:
      nextT = 2;
      innextT = 1;
      break;
    case 2:
      nextT = 3;
      innextT = 1;
      break;
    case 3:
      nextT = 4;
      innextT = 1;
      break;
    case 4:
      nextT = 5;
      innextT = 1;
      break;
    case 5:
      nextT = 6;
      innextT = 1;
      break;
    case 6:
      nextT = 7;
      innextT = 1;
      break;
    case 7:
      nextT = 6;
      innextT = 1;
      break;
    case 8:
      nextT = 5;
      innextT = 1;
      break;
    case 9:
      nextT = 4;
      innextT = 1;
      break;
    case 10:
      nextT = 3;
      innextT = 1;
      break;
    case 11:
      nextT = 2;
      innextT = 1;
      break;
    default:
      console.log(type);
      break;
  }

}

function keyPressed() {
  if (keyCode === 72) {
    if (kowtow == 8) {
      badLuckRemover = true
      var boundsSub = font.textBounds(subText[subnextT], 0, 0, 30);
      var posxSub = width / 2 - boundsSub.w / 2;
      var posySub = height / 2 + boundsSub.h / 2;

      var insArSub = split(subText[subnextT], ' ');

      for (var i = 0; i < insArSub.length; i++) {
        var bounds3 = font.textBounds(insArSub[i], 0, 0, 30);
        var posx3 = posxSub;
        var posy3 = posySub;
        posxSub += bounds3.w + 10;
        var points3 = font.textToPoints(insArSub[i], posx3, posy3, 30, {
          sampleFactor: 0.25
        });

        for (var n = 0; n < points3.length; n++) {

          var pt = points3[n];
          var vSub = new Vehicle(pt.x, pt.y, 3);
          removed.push(vSub);
        }
      }
    } else {
      kowtow += 1;
    }
  } else {}
  return false;
}
