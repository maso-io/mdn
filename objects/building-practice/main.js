const canvas = document.querySelector("canvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

class Shape {
    constructor(posX, posY, velX, velY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
    }
}
class Ball extends Shape {

    constructor(posX, posY, velX, velY, color, radius) {
        super(posX, posY, velX, velY);
        this.color = color;
        this.radius = radius;
        this.exists = true;
    }

    degToRad(degrees) {
        // convert degree to radian
        return (degrees * (Math.PI / 180));
    }

    draw() {
        // sketch a full-circle.
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX, this.posY, this.radius, this.degToRad(0), this.degToRad(360), false);
        ctx.fill();
    }

    update() {
        // develop control for the parameters of the ball (edge-cases)
        if (this.posX + this.radius >= width) {
            this.velX = -(this.velX);
        }
        if (this.posX - this.radius <= 0) {
            this.velX = -(this.velX);
        }
        if (this.posY + this.radius >= height) {
            this.velY = -(this.velY);
        }
        if (this.posY - this.radius <= 0) {
            this.velY = -(this.velY);
        }

        this.posX += this.velX;
        this.posY += this.velY;
    };

    collisionDetect(balls) {
        // check if current instance of ball has collided with the given ball obj
        for (const ball of balls) {
            if (this !== ball && ball.exists) {
                const dx = this.posX - ball.posX;
                const dy = this.posY - ball.posY;
                const distance = Math.sqrt((dx * dx) + (dy * dy));

                if (this.radius >= distance) {
                    this.color = (ball.color = rbg());
                }
            }
        }
    }
}

class EvilCircle extends Shape {

    constructor(posX, posY) {
        super(posX, posY, 20, 20);
        this.color = "white";
        this.radius = 10;
        this.pressed = false;

        document.addEventListener("mousedown", () => { this.pressed = true });
        document.addEventListener("mouseup", () => { this.pressed = false });
        canvas.addEventListener("mousemove", (e) => {
            if (this.pressed) {
                this.posX = e.pageX;
                this.posY = e.pageY;
            }
        })

        window.addEventListener("mouse", (e) => {
            switch (e.key) {
                case 'w':
                    this.posY -= this.velY;
                    break;
                case 'a':
                    this.posX -= this.velX;
                    break;
                case 's':
                    this.posY += this.velY;
                case 'd':
                    this.posX += this.velX;
            }
        })
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if (this.posX + this.radius >= width) {
            this.posX -= (0.5 * this.radius)
        }
        if (this.posX - this.radius <= 0) {
            this.posX += (0.5 * this.radius)
        }
        if (this.posY - this.radius <= 0) {
            this.posY += (0.5 * this.radius)
        }
        if (this.posY + this.radius >= height) {
            this.posY -= (0.5 * this.radius)
        }
    }

    collisionDetect(balls) {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.posX - ball.posX;
                const dy = this.posY - ball.posY;
                const distance = Math.sqrt((dx * dx) + (dy * dy));

                if (this.radius + ball.radius >= distance) {
                    ball.exists = false;
                    score++;
                    myP.textContent = `Ball Count: ${balls.length - score}`;
                }
            }
        }
    }
}

random = (min, max) => {
    //generate number between min & max
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

rbg = () => {
    // generate random color
    const num1 = this.random(0, 255);
    const num2 = this.random(0, 255);
    const num3 = this.random(0, 255);

    return `rgb(${num1}, ${num2}, ${num3})`;
}

const myP = document.querySelector("p");
const btn = document.querySelector("button");
const evilCircle = new EvilCircle(50, 50);
const balls = [];
let score = 0;

btn.addEventListener("click", () => {
    document.location.reload();
})

while (balls.length < 25) {
    // create an array of 25 ball objects
    const radius = random(10, 20);
    const ball = new Ball(
        random(0 + radius, width - radius),
        random(0 + radius, height - radius),
        random(-7, 7),
        random(-7, 7),
        rbg(),
        radius
    )
    ball.draw();
    balls.push(ball);
    myP.textContent = `Ball Count: ${balls.length - score}`;
}

function loop() {
    // starts the animation loop
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect(balls);

            evilCircle.draw();
            evilCircle.checkBounds();
            evilCircle.collisionDetect(balls);
        }
    }

    requestAnimationFrame(loop);
}

// Run the animation
loop();