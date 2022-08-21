const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
var bgWidth = 589
var bgHeight = 54
var powerNum = 10
var money = 0
var mousedown = false
var arm = 'right'
var doLift = true
var trueArm = 'right'
var trueLift = true
var strengthNum = 0
var weightNum = 0
strPrice = 10
wghtPrice = 15
img = document.getElementById('background')
plyr = document.getElementById('player')
str = document.getElementById('strength')
wght = document.getElementById('weight')
class Background{
    constructor(){
        this.position = {
            x: 0,
            y: canvas.height - 235
        }
        this.width = 489 * (canvas.width / 3)
        this.height = 54 * (canvas.width / 3)
    }
    draw(){
        c.fillStyle = 'grey'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height)
    }
}
class Player{
    constructor(){
        this.position = {
            x: canvas.width / 2,
            y: canvas.height - bgHeight
        }
        this.width = 47
        this.height = 59
    }
    draw(){
        c.drawImage(plyr, this.position.x, this.position.y, this.width, this.height)
    }
}
class Power{
    constructor(){
        this.position = {
            x: canvas.width - 100,
            y: canvas.height - 145
        }
        this.width = 40
        this.height = 10
    }
    draw(){
        c.fillStyle = 'black'
        c.fillRect(canvas.width - 105, canvas.height - 240, 50, 110)
        c.fillStyle = 'red'
        c.fillRect(canvas.width - 100, this.position.y, this.width, this.height)
    }
}
class Money{
    draw(){
        c.fillStyle = 'green'
        c.font = "128px Serif"
        c.fillText('$' + money, 20, 148,)
    }
}
class Strength{
    draw(){
        c.drawImage(str, 30, canvas.height / 2, 100, 100)
    }
}
class Weight{
    draw(){
        c.drawImage(wght, 30, canvas.height / 2 + 110, 100, 100)
    }
}
class Mouse{
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
    }
}
class Shop{
    constructor(){
        this.text = '$' + strPrice
    }
    draw(){
        c.fillStyle = 'black'
        c.font = "128px Serif"
        c.fillText(this.text, 20, 270)
    }
}
function liftRight(){
    doLift = false
    setTimeout(function(){
        plyr.src = "https://github.com/Pekka-Legend/Lift-to-Gain/blob/main/Right%20Up.svg"
        setTimeout(function(){
            doLift = true
            plyr.src = "https://github.com/Pekka-Legend/Lift-to-Gain/blob/main/Left%20Down.svg"
            trueArm = 'left'
        }, 200)
    }, 500)
}

function liftLeft(){
    doLift = false
    setTimeout(function(){
        plyr.src = "https://github.com/Pekka-Legend/Lift-to-Gain/blob/main/Left%20Up.svg"
            setTimeout(function(){
            doLift = true
            plyr.src = "https://github.com/Pekka-Legend/Lift-to-Gain/blob/main/Right%20Down.svg"
            trueArm = 'right'
        }, 200)
    }, 500)
}

background = new Background()
player = new Player()
power = new Power()
mny = new Money()
strength = new Strength()
weight = new Weight()
shop = new Shop()
mouse = new Mouse()
function animate(){
    requestAnimationFrame(animate)
    canvas.width = innerWidth
    canvas.height = innerHeight
    c.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    if (canvas.width < 489){
        bgWidth /= 2
        bgHeight /= 2
        player.width / 2
        player.height / 2
    }else{
        while(bgWidth < canvas.width){
            player.width += 47
            player.height += 59
            bgWidth += 489
            bgHeight += 54
        }
    }
    background.width = bgWidth
    background.height = bgHeight

    player.draw()
    player.position.x = canvas.width / 2 + (player.width / 2)
    player.position.y = canvas.height - 235 - (player.height - background.height)

    power.draw()
    power.position.y = canvas.height - 135
    if (powerNum - .1 > 0){
        powerNum -= .1
    }
    if (powerNum > 10){
        money += 1 + weightNum
        if (arm == 'right' && doLift == true){
            liftRight()
        }
        if (trueArm == 'left' && trueLift == true){
            liftLeft()
        }
        powerNum = 0
    }
    power.height = -powerNum * 10

    mny.draw()

    strength.draw()
    if (mouse.position.x > 30 && mouse.position.x < 130 && mouse.position.y > canvas.height / 2 && mouse.position.y < canvas.height / 2 + 100){
        shop.text = '$' + strPrice
        shop.draw()
    }
    if (mouse.position.x > 30 && mouse.position.x < 130 && mouse.position.y > canvas.height / 2  + 110 && mouse.position.y < canvas.height / 2 + 110 + 100){
        shop.text = '$' + wghtPrice
        shop.draw()
    }
    weight.draw()
    
    window.onscroll = function(){
        scrollTo(0, 0)
    }
    arm = trueArm
    doLift = trueLift
}
animate()

function findMousePos(event){
    mouse.position.x = event.pageX
    mouse.position.y = event.pageY
}

addEventListener('mousedown', () => {
    if (mouse.position.x > 30 && mouse.position.x < 130 && mouse.position.y > canvas.height / 2 && mouse.position.y < canvas.height / 2 + 100){
       if (money >= strPrice){
        money -= strPrice
        strengthNum += .2
        strPrice += 1
       } 
    }
    if (mouse.position.x > 30 && mouse.position.x < 130 && mouse.position.y > canvas.height / 2  + 110 && mouse.position.y < canvas.height / 2 + 110 + 100){
        if (money >= wghtPrice){
            money -= wghtPrice
            weightNum += 1
            wghtPrice += 5
        } 
    }
    powerNum += 3 + strengthNum
    mousedown = true

})
addEventListener('mouseup', () => {
    mousedown = false
})
canvas.addEventListener('mousemove', findMousePos, false)
