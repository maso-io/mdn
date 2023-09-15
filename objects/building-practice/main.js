const canvas = document.querySelector("canvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

class Ball {

    constructor(posX, posY, velX, velY, color, radius) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.radius = radius;
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
            if (this !== ball) {
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

const balls = [];

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
    //ball.draw();
    balls.push(ball);
}

function loop() {
    // starts the animation loop
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect(balls);
    }

    requestAnimationFrame(loop);
}

// Run the animation
loop();