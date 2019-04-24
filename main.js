
// Set up canvas
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var controller, rectangle, loop;

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight - 60;

    init();
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function Cloud(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = 30
    this.velocity = randomIntFromRange(0.5, 1.1)
    this.c2 = randomIntFromRange(15, 45)
    this.c3 = randomIntFromRange(15, 45)
    this.c4 = randomIntFromRange(15, 45)
    this.c5 = randomIntFromRange(15, 30)
    this.c6 = randomIntFromRange(15, 30)
    this.c7 = randomIntFromRange(15, 30)

}

Cloud.prototype.draw = function () {
    c.beginPath()
    // c1
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()

    // c2
    //c.beginPath()
    c.arc(this.x + this.c2, this.y, this.radius, 0, Math.PI * 2, false)

    c.closePath()
    // c3
    //c.beginPath()
    c.arc(this.x + this.c2 + this.c3, this.y, this.radius, 0, Math.PI * 2, false)

    c.closePath()
    // c4
    //c.beginPath()
    c.arc(this.x + this.c2 + this.c3 + this.c4, this.y, this.radius, 0, Math.PI * 2, false)

    c.closePath()
    // c5
    //c.beginPath()
    c.arc(this.x + this.c2 - this.radius, this.y - this.c5, this.radius, 0, Math.PI * 2, false)

    c.closePath()
    // c6
    // c.beginPath()
    c.arc(this.x + this.c2 + this.c3 - this.radius, this.y - this.c6, this.radius, 0, Math.PI * 2, false)

    c.closePath()
    // c7
    //c.beginPath()
    c.arc(this.x + this.c2 + this.c3 + this.c4 - this.radius, this.y - this.c7, this.radius, 0, Math.PI * 2, false)

    c.closePath()

    c.fillStyle = 'white'

    c.fill()
}


Cloud.prototype.update = function () {
    this.draw()
    this.x += this.velocity
}

function miniCloud(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = 15
    this.velocity = randomIntFromRange(0.5, 0.6)
    this.c2 = randomIntFromRange(5, 20)
    this.c3 = randomIntFromRange(5, 20)
    this.c4 = randomIntFromRange(5, 20)
    this.c5 = randomIntFromRange(5, 20)
    this.c6 = randomIntFromRange(5, 20)
    this.c7 = randomIntFromRange(5, 20)

}

miniCloud.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.arc(this.x + this.c2, this.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.arc(this.x + this.c2 + this.c3, this.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.arc(this.x + this.c2 + this.c3 + this.c4, this.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()

    c.arc(this.x + this.c2 - this.radius, this.y - this.c5, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.arc(this.x + this.c2 + this.c3 - this.radius, this.y - this.c6, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.arc(this.x + this.c2 + this.c3 + this.c4 - this.radius, this.y - this.c7, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.closePath()
    c.fillStyle = 'white'

    c.fill()
}

miniCloud.prototype.update = function () {
    this.draw()
    this.x += this.velocity
}

function Bullets(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = 15
    this.velocity = 10
}

Bullets.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.fillStyle = 'black'

    c.fill()
}

Bullets.prototype.update = function () {
    this.draw()
    this.x -= this.velocity
    if (this.y > rectangle.y && this.y + (this.radius * 2) < rectangle.y + 100 && this.x < rectangle.x + 32 && this.x > rectangle.x) {

        var retVal = confirm("You Lost. Score: " + score);
        if (retVal == true) {
            init()
            return true;
        }
        else {
            return false;
        }

    }
}

// Placing Mountains
function createMountainRange(mountainAmount, height, color, darkcolor) {
    // For each mountain defined in mountainAmount, draw the mountains
    for (let i = 0; i <= mountainAmount; i++) {
        const mountainWidth = canvas.width / mountainAmount
        c.beginPath()
        c.moveTo(i * mountainWidth + mountainWidth + 325, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height)
        c.lineTo(-325, canvas.height)
        c.fillStyle = color
        c.fill()
        c.closePath()

        c.beginPath()
        c.moveTo(-325, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
        c.lineTo(i * mountainWidth - 325, canvas.height)

        c.fillStyle = darkcolor
        c.fill()
        c.closePath()
    }
}

let clouds
let miniclouds
let ticker = 0
let ticker2 = 0
let ticker3 = 0
let randomSpawnRate = 75
let randomSpawnRate2 = 100
randomSpawnRate3 = 50
let bullets
let score = 0
function init() {
    clouds = []
    miniclouds = []
    bullets = []
    score = 0
    rectangle = {

        height: 251,
        jumping: true,
        width: 105,
        x: canvas.width / 2, // center of the canvas
        x_velocity: 0,
        y: canvas.height - 200,
        y_velocity: 0,
    };
    controller.left = false
    controller.right = false
    controller.up = false
    controller.down = false
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // Setting background gradient options
    var grd = c.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, "#64D3E2");
    grd.addColorStop(1, "white");
    // Placing background gradient
    c.fillStyle = grd;
    c.fillRect(0, 0, canvas.width, canvas.height);


    // Call the createMountainRange function
    createMountainRange(1, canvas.height - 50, '#0F9F3B', '#0C6C29')
    ticker2++

    miniclouds.forEach((minicloud, index) => {
        minicloud.update()
        if (minicloud.x == canvas.width + 100) {
            miniclouds.splice(index, 1)
        }
    })
    if (ticker2 % randomSpawnRate2 == 0) {
        const radius = 10
        const x = Math.max(Math.random() * canvas.width - radius)
        miniclouds.push(new miniCloud(-200, randomIntFromRange(30, canvas.height), radius, 'white'))
        randomSpawnRate2 = randomIntFromRange(200, 400)
    }
    createMountainRange(2, canvas.height - 200, '#16BF4A', '#0F7E31')
    createMountainRange(3, canvas.height - 400, '#14EB56', "#0F9338")
    // Draw the ground on the canvas
    c.fillStyle = '#553C26'
    c.fillRect(0, canvas.height - 100, canvas.width, 100)

    c.fillStyle = '#868282'
    // Platforms
    c.fillRect(canvas.width / 5 * 1, canvas.height - 300, canvas.width / 5, 10)
    c.fillRect(canvas.width / 5 * 2, canvas.height - 300 - 200, canvas.width / 5, 10)
    c.fillRect(canvas.width / 5 * 3, canvas.height - 300, canvas.width / 5, 10)

    c.fillStyle = '#5C5656'
    c.fillRect(canvas.width / 5 * 1, canvas.height - 290, canvas.width / 5, 10)
    c.fillRect(canvas.width / 5 * 2, canvas.height - 290 - 200, canvas.width / 5, 10)
    c.fillRect(canvas.width / 5 * 3, canvas.height - 290, canvas.width / 5, 10)


    loop()
    clouds.forEach((cloud, index) => {
        cloud.update()
        if (cloud.x == canvas.width + 100) {
            clouds.splice(index, 1)
        }
    })

    ticker++

    if (ticker % randomSpawnRate == 0) {
        const radius = 30
        const x = Math.max(Math.random() * canvas.width - radius)
        clouds.push(new Cloud(-200, randomIntFromRange(30, 300), radius, 'white'))
        randomSpawnRate = randomIntFromRange(200, 400)
    }

    bullets.forEach((bullet, index) => {
        bullet.update()
        if (bullet.x < 0) {
            bullets.splice(index, 1)
            score++
            console.log("remove")
        }
    })

    ticker3++

    if (ticker3 % randomSpawnRate3 == 0) {
        const radius = 30
        const x = Math.max(Math.random() * canvas.width - radius)
        bullets.push(new Bullets(canvas.width + 50, randomIntFromRange(canvas.height / 3, canvas.height - 100), radius, 'white'))
        randomSpawnRate33 = randomIntFromRange(200, 400)
    }

}

var state = "no";

controller = {

    left: false,
    right: false,
    up: false,
    down: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                state = "left"
                break;
            case 38:// up key
                controller.up = key_state;
                state = "up"
                break;
            case 39:// right key
                controller.right = key_state;
                state = "right"
                break;
            case 40:
                controller.down = key_state;
                state = "down"
                break
            default:
                state = "no"

        }

    }

};

loop = function () {
    drawing = new Image();
    if (controller.up && rectangle.jumping == false) {
        rectangle.y_velocity -= 40;
        rectangle.jumping = true;
    }

    if (controller.left) {
        rectangle.x_velocity -= 0.5;
    }

    if (controller.right) {
        rectangle.x_velocity += 0.5;
    }

    rectangle.y_velocity += 1.5;// gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= 0.9;// friction
    rectangle.y_velocity *= 0.9;// friction

    // if rectangle is falling below floor line
    if (rectangle.y > canvas.height - 100 - 251) {

        rectangle.jumping = false;
        rectangle.y = canvas.height - 100 - 251;
        rectangle.y_velocity = 0;

    } else if ((rectangle.y > canvas.height - 251 - 300 && rectangle.y < canvas.height - 90 - 300) && (rectangle.x > canvas.width / 5 * 1 - rectangle.width && rectangle.x < canvas.width / 5 * 2)) {
        rectangle.jumping = false;
        rectangle.y = canvas.height - 251 - 300;
        rectangle.y_velocity = 0;
    } else if ((rectangle.y > canvas.height - 251 - 300 - 200 && rectangle.y < canvas.height - 90 - 300 - 200) && (rectangle.x > canvas.width / 5 * 2 - rectangle.width && rectangle.x < canvas.width / 5 * 3)) {
        rectangle.jumping = false;
        rectangle.y = canvas.height - 251 - 300 - 200;
        rectangle.y_velocity = 0;
    } else if ((rectangle.y > canvas.height - 251 - 300 && rectangle.y < canvas.height - 90 - 300) && (rectangle.x > canvas.width / 5 * 3 - rectangle.width && rectangle.x < canvas.width / 5 * 4)) {
        rectangle.jumping = false;
        rectangle.y = canvas.height - 251 - 300;
        rectangle.y_velocity = 0;
    }


    // if rectangle is going off the left of the screen
    if (rectangle.x < -32) {

        rectangle.x = canvas.width;

    } else if (rectangle.x > canvas.width) {// if rectangle goes past right boundary

        rectangle.x = -32;
    }
    
    if (rectangle.y_velocity != 0) {
        drawing.src = 'Asset2.png'
    }  else if (rectangle.x_velocity > 0.5 || rectangle.x_velocity < -0.5) {
        drawing.src = 'Asset5.png'
        sleep(1)
        drawing.src = 'Asset6.png'

        
        // for (let b = 0; b < 100; b++) {
        //     drawing.src = 'Asset5.png'
        //     console.log(b)
        // }
        // for (let a = 0; a < 100; a++) {
        //     drawing.src = 'Asset6.png'
            
        // }


        // if (drawing.src == 'Asset5.png') {
        //     drawing.src = 'Asset6.png'
        // } else {
        //     drawing.src = 'Asset5.png'
        // }


    } else {
        drawing.src = 'Asset1.png'
    }
    console.log(rectangle.x_velocity)
    c.drawImage(drawing, rectangle.x, rectangle.y);

};
  

function side(){
           if (drawing.src == 'Asset5.png') {
            drawing.src = 'Asset6.png'
        } else {
            drawing.src = 'Asset5.png'
        }
        SVGPathSegClosePath()
    setTimeout(side, 1);
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);


init()
animate()


