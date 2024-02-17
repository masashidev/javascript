console.log(  'Hello from mobile_view.js' )

// constant variables

// global variables

// state variables
  // canvas entities
let particles = [];
let particleAmount = 50;

// utility functions
  // Draw a particle
function redrawCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
      particle.draw();
  });
}




//dom elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#000000';

let objectElement = document.querySelector('#object');
let objectMeasurement = objectElement.getBoundingClientRect();
let object = {
  x: objectMeasurement.x,
  y: objectMeasurement.y,
  width: objectMeasurement.width,
  height: objectMeasurement.height
}



//event listeners
function setupEventListeners() {
  canvas.addEventListener('pointerdown', handlePointerDown);
  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerup', handlePointerup);
  // document.addEventListener('keydown', handleCommandZ);

  window.addEventListener('resize', handleWindowResize);
}

// object classes
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = "white";
    this.radius = Math.random() * 2 + 1;
    this.weight = Math.random() * 3 + 0.5;
    this.directionX = Math.random() * 2 - 1;
  }
  update() {
    if (this.y > canvas.height - this.radius) {
      this.y = 0 - this.radius;
      this.weight = Math.random() * 3 + 0.5;
      this.x = Math.random() * canvas.width;
    }
    this.weight += 0.01;
    this.y += this.weight;
    this.x += this.directionX;

    // check collision
    if (this.x < object.x + object.width &&
      this.x + this.radius > object.x &&
      this.y < object.y + object.height &&
      this.y + this.radius > object.y) {
      this.y -= 0;
      this.weight *= 0;

      // add function to make the particle stick to the object

      // enable collision detection at horizontal axis
    }

  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }
  applyGravity(gravity) {
    console.log("gravity")
    this.velocity.y += gravity;
  }

}
// physical objects
  // constructor

  //gravity method

  //update method

  //draw method



// event handler functions
function handlePointerDown(event) {
  console.log('pointerdown');
  let particle = new Particle(event.clientX, event.clientY, 30, 'red');
  particle.draw();
  particles.push(particle);
}

function handlePointerMove(event) {
  console.log('pointermove');
}

function handlePointerup(event) {
  console.log('pointerup');
}

function handleWindowResize(event) {
  console.log('resize');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  objectMeasurement = objectElement.getBoundingClientRect();
  setupParticles();
  object = {
  x: objectMeasurement.x,
  y: objectMeasurement.y,
  width: objectMeasurement.width,
  height: objectMeasurement.height
}
}
// function handleCommandZ(event) {
//   if (event.key === 'z' && (event.metaKey || event.ctrlKey)){
//     console.log('commandZ');
//     particles.pop;
//     redrawCircle();
//     console.log(particles);
//   }
// }

// animation variables

// animation function, calling itself and making loop


// instances variables
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);

}

// instantiation
// const particle = new Particle(100, 100, 5, '#F72798');
function setupParticles() {
  particles = [];
  for (let i = 0; i < particleAmount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }
  console.log(particles);
}

// initialization
function init() {
  setupParticles();
  setupEventListeners();
  animate();
  console.log(particles);
}

// application start
document.addEventListener('DOMContentLoaded', init);
