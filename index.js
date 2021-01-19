
function createCanvas(numberOfCircles){
  const canvas = document.querySelector('canvas');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const c = canvas.getContext('2d');
  
  class Circle {
    constructor(radius, color, x, y, dx, dy) {
      this.radius = radius;
      this.color = color;
      this.x = x === undefined ? radius + Math.random() * (window.innerWidth-radius*2) : x;
      this.y = y === undefined ? radius + Math.random() * (window.innerHeight-radius*2) : y;
      this.dx = dx === undefined ? (Math.random() - 0.5) * 10 : dx;
      this.dy = dy === undefined ? (Math.random() - 0.5) * 10 : dy;
    }
  
    draw() {
      const {x, y, radius, color} = this;
      c.beginPath(); // it is important to call this method at the beginning of drawing anything, because it separates the current path from the previous one.
      c.arc(x, y, radius, 0, 2 * Math.PI, false);
      c.fill();
      c.strokeStyle = color;
      c.stroke();
    }
  
    update() {
      this.draw();
      const {x, y, radius} = this;
      if (x + radius > window.innerWidth || x - radius < 0) {
        this.dx *= -1;
      }
      if (y + radius > window.innerHeight || y - radius < 0) {
        this.dy *= -1;
      }
      this.x += this.dx;
      this.y += this.dy;
    }
  }
  
  const circleList = [];
  
  for (let i = 0; i < numberOfCircles; i++) {
    circleList.push(new Circle(50, 'red'));
  }
  
  c.fillStyle = 'red';
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circleList.forEach((circle) => {
      circle.update();
    });
  }
  animate();
}
createCanvas(30);


const input = document.getElementById('numberInput');
input.addEventListener('input', (e) => {
  createCanvas(e.target.value);
});