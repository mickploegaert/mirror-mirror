// JavaScript voor scroll-actie
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [];
const numLines = 200; // Number of lines to create

class Line {
    constructor(x1, y1, x2, y2, color, speed) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.speed = speed;
    }

    update() {
        this.x1 += this.speed.x1;
        this.y1 += this.speed.y1;
        this.x2 += this.speed.x2;
        this.y2 += this.speed.y2;

        // Bounce off edges
        if (this.x1 > canvas.width || this.x1 < 0) this.speed.x1 = -this.speed.x1;
        if (this.y1 > canvas.height || this.y1 < 0) this.speed.y1 = -this.speed.y1;
        if (this.x2 > canvas.width || this.x2 < 0) this.speed.x2 = -this.speed.x2;
        if (this.y2 > canvas.height || this.y2 < 0) this.speed.y2 = -this.speed.y2;

        this.draw();
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5; // Thinner lines for a more professional look
        ctx.stroke();
        ctx.closePath();
    }
}

function createLines() {
    lines.length = 0;
    for (let i = 0; i < numLines; i++) {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const x2 = Math.random() * canvas.width;
        const y2 = Math.random() * canvas.height;
        const color = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`; // Subtle, semi-transparent lines
        const speed = {
            x1: (Math.random() - 0.5) * 0.5,
            y1: (Math.random() - 0.5) * 0.5,
            x2: (Math.random() - 0.5) * 0.5,
            y2: (Math.random() - 0.5) * 0.5
        };
        lines.push(new Line(x1, y1, x2, y2, color, speed));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const line of lines) {
        line.update();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createLines();
});

createLines();
animate();
