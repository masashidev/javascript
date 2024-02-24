// global variable

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const borderWidth = 10;
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
canvas.style.border = `${borderWidth}px solid white`;

// class

class Node {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.radius = 20;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "skyblue";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Draw a circle for the node
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y - 5); // Add the text
  }

  isPointInside(x, y) {
    return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2) < 20;
  }
}

class Edge {
  constructor(startNode, endNode) {
    this.startNode = startNode;
    this.endNode = endNode;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startNode.x, this.startNode.y);
    ctx.lineTo(this.endNode.x, this.endNode.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

class Diagram {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addNode(x, y, text) {
    const newNode = new Node(x, y, text);
    this.nodes.push(newNode);
    newNode.draw(ctx);
  }

  addEdge(startNode, endNode) {
    const newEdge = new Edge(startNode, endNode);
    this.edges.push(newEdge);
    newEdge.draw(this.ctx);
  }

  draw(ctx) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.edges.forEach(edge => edge.draw(ctx));
    this.nodes.forEach(node => node.draw(ctx));
  }

  isOverlapped(newNode, nodes) {
    return nodes.some(node => Math.sqrt((node.x - newNode.x) ** 2 + (node.y - newNode.y) ** 2) < 40);
  }
}


class CanvasInput {
  constructor(diagram, canvas, x, y, width = 200, height = 30, placeholder = "Enter text...") {
    this.diagram = diagram;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.placeholder = placeholder;
    this.text = "";
    this.draw();
  }

  draw() {
    this.ctx.clearRect(this.x - borderWidth - 50, this.y - borderWidth, this.width + 2 * borderWidth, this.height + 2 * borderWidth);

    // Draw the input box
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw the border
    this.ctx.strokeStyle = "#000";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Draw the text or placeholder
    this.ctx.fillStyle = "#000";
    this.ctx.font = "16px Arial";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(this.text || this.placeholder, this.x + 50, this.y + 10);
    console.log(this.x, this.y);
  }

  initializeEvents() {
    this.canvas.addEventListener('pointerdown', this.handlePointerdown.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handlePointerdown(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click is within the input box
    if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
        this.active = true;
        console.log('active', this.active);
        this.focusAnimationToggle();
    } else {
        this.active = false;
        console.log('active', this.active);
        this.focusAnimationToggle();
    }
    this.draw();
  }

  focusAnimationToggle() {
    if (this.active) {
        this.canvas.style.border = `${borderWidth}px solid red`;
        this.placeholder = "|";
    } else {
        this.canvas.style.border = `${borderWidth}px solid white`;
        this.placeholder = "Enter text...";
    }
  }

  getRandomCoordinate() {
    return {
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height)
    }
  }

  handleKeyDown(event) {
    if (!this.active) return;

    if (event.key === "Backspace") {
        this.text = this.text.slice(0, -1); // Remove the last character
    } else if (event.key.length === 1) {
        this.text += event.key; // Add the typed character
    }

    if (event.key === "Enter") {
        this.active = false;
        this.focusAnimationToggle();
        while (true) {
            const { x: randomCoordinateX, y: randomCoordinateY } = this.getRandomCoordinate();
            if (!this.diagram.isOverlapped({ x: randomCoordinateX, y: randomCoordinateY }, this.diagram.nodes)) {
                this.diagram.addNode(randomCoordinateX, randomCoordinateY, this.text);
                this.text = "";
                break;
            }
        }
    }
    this.draw();
    this.active = true;
  }
}

class EdgeButton {
  constructor(diagram, canvas, x, y, width = 200, height = 30, text = "Add Edge") {
    this.diagram = diagram;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(this.x - borderWidth - 50, this.y - borderWidth, this.width + 2 * borderWidth, this.height + 2 * borderWidth);

    // Draw the input box
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw the border
    this.ctx.strokeStyle = "#000";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Draw the text or placeholder
    this.ctx.fillStyle = "#000";
    this.ctx.font = "16px Arial";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(this.text, this.x + 50, this.y + 10);
  }

  initializeEvents() {
    this.canvas.addEventListener('pointerdown', this.handlePointerdown.bind(this));
  }

  clickDetection(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
  }

  handlePointerdown(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (this.clickDetection(event)) {
        this.active = true;
        console.log('active', this.active);
        this.focusAnimationToggle();
        this.draw();
    }
  }
}


const diagram = new Diagram();
const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };
const input = new CanvasInput(diagram, canvas, canvasCenter.x - 100, canvasCenter.y - 15);
input.initializeEvents();
const edgeButton = new EdgeButton(diagram, canvas, canvasCenter.x - 100, canvasCenter.y + 30);
edgeBu
