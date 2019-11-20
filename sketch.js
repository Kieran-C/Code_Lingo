var firstRun = true

var blockSelected = "forwardBlock"
 
let blocks = []
let commands = []
let turtleImg

var turtlePosX
var turtlePosY
var turtleRotation = 90
var steps = 10
var runScript = false
var blockLoc = [[]]
let blockOrder = []

var forwardBlock = {
    blockID: "",
    posX: 0,
    posY: 0,
    boxWidth: 90,
    boxHeight: 50,
    offsetX: 0,
    offsetY: 0,
}

function setup()
{
    var height = window.innerHeight
    var width = window.innerWidth
    turtleImgUp = loadImage('Assets/turtle_up.png')
    turtleImgDown = loadImage('Assets/turtle_down.png')
    turtleImgLeft = loadImage('Assets/turtle_left.png')
    turtleImgRight = loadImage('Assets/turtle_right.png')
    logoImg = loadImage('Assets/logo.png')
    createCanvas(width, height);
    background(255,255,255);
    blocks.push(new block("Forward",(width*0.125)-45,height*0.1))
    blocks.push(new block("Backward",(width*0.125)-45,height*0.25))
    blocks.push(new block("Rotate Left",(width*0.125)-45,height*0.4))
    blocks.push(new block("Rotate Right",(width*0.125)-45,height*0.55))
    turtlePosX = width*0.26
    turtlePosY = height*0.3
    
}

function draw()
{
    fill(100)
    stroke(94,228,187)
    strokeWeight(1)
    rect(0,0,width,height)
    strokeWeight(1)
    rect(0,0,width*0.25,height*0.75)
    rect(0,height*0.75,width,height*0.25)
    
    fill(94,228,187)
    
    blockLayout()
    displayLogo()
    displayTimelineTag()
    displayCommandTag()
    displayPlayAreaTag()
    
    for (block of blocks){
        if (mouseIsPressed) {
            block.mouseTrack(block.dragging)
        } else {block.dragging=false;}
        block.move(block.dragging)
        block.display()
    }   
    
    var lowCmdCoord = width+1
    
    blockOrder = []
    
    blocks.forEach (function (block) {
        if (block.posY >= height*0.75){
            blockOrder.push(block)
        } 
    })
    
    blockOrder.sort(function(a,b) {return a.posX-b.posX})
    
    //console.log("1: ",blockOrder[0]," 2: ",blockOrder[1])
    
    if (turtleRotation == 0){
        image(turtleImgUp,turtlePosX,turtlePosY,turtleImgUp.width/8,turtleImgUp.height/8)
    }else if (turtleRotation == 90){
        image(turtleImgRight,turtlePosX,turtlePosY,turtleImgRight.width/8,turtleImgRight.height/8)
    }else if (turtleRotation == 180){
        image(turtleImgDown,turtlePosX,turtlePosY,turtleImgDown.width/8,turtleImgDown.height/8)
    }else if (turtleRotation == 270){
        image(turtleImgLeft,turtlePosX,turtlePosY,turtleImgLeft.width/8,turtleImgLeft.height/8)
    }
    
    commandList = []
    commandList = blockOrder.map(x => x.blockID)
    
    drawScriptButton()
    resetButton()
    //console.log(runScript)
    
    //console.log("Command Main List: ",commandList)
    
    if (runScript){
        for (l = 0; l < commandList.length; l++){
            if (commandList[l] === ("Forward")){
                turtleForward()
            }else if (commandList[l] === "Backward"){
                turtleBackward()
            }else if (commandList[l] === "Rotate Left"){
                rotateLeft()
            }else if (commandList[l] === "Rotate Right"){
                rotateRight()
            }
            console.log("Command Length: ",commandList.length)
            console.log("l: ",l)
            console.log("Command: ",commandList[l])
        }
        runScript = false
        console.log("Turtle X: ",turtlePosX," Turtle Y: ",turtlePosY)
    }
}

function mouseReleased(){
    dragging = false
}

function turtleForward(){
    for (i = 0; i <= steps; i++){
        if (turtleRotation == 0){
        turtlePosY -= 10
        }else if (turtleRotation == 90){
            turtlePosX += 10
        }else if (turtleRotation == 180){
            turtlePosY += 10
        }else if (turtleRotation == 270){
            turtlePosX -= 10
        }
        turtleContain()
    }
}

function turtleBackward(){
    for (i = 0; i <= steps; i++){
        if (turtleRotation == 0){
        turtlePosY += 10
        }else if (turtleRotation == 90){
            turtlePosX -= 10
        }else if (turtleRotation == 180){
            turtlePosY -= 10
        }else if (turtleRotation == 270){
            turtlePosX += 10
        }
        turtleContain()
    }
}

function rotateRight(){
    turtleRotation += 90
    if (turtleRotation > 270){
        turtleRotation = 0
    }
}

function rotateLeft(){
    turtleRotation += 270
    if (turtleRotation  > 270){
        turtleRotation -= 360
    }
}

function turtleContain(){
    if (turtlePosX >= (width - (turtleImgDown.width/8))){
        turtlePosX = width - (turtleImgDown.width/8)
    }else if (turtlePosX <= width*0.25){
        turtlePosX = width*0.25
    }else if (turtlePosY >= (height*0.75 - (turtleImgDown.height/8))){
        turtlePosY = height*0.75 - (turtleImgDown.height/8)
    }else if (turtlePosY <= 0){
        turtlePosY = 0
    }
}

function drawScriptButton(){
    fill(94,228,187)
    rect(width*0.03,height*0.78,60,30,10)
    fill(255)
    textAlign(CENTER)
    text("RUN",(width*0.046),height*0.803)
}

function resetButton(){
    fill(94,228,187)
    rect(width*0.08,height*0.78,60,30,10)
    fill(220,0,0)
    textAlign(CENTER)
    text("RESET",(width*0.096),height*0.803)
}

function displayLogo(){
    image(logoImg,2,2,(logoImg.width)/4,(logoImg.height)/4)
}

function displayCommandTag(){
    fill(255)
    noStroke()
    textAlign(CENTER)
    text("C   O   M   M   A   N   D   S", width*0.125, height*0.04)
    stroke(255)
    line(width*0.075,height*0.05,width*0.175,height*0.05)
    fill(94,228,187)
    noStroke()
}

function displayPlayAreaTag(){
    fill(255)
    noStroke()
    textAlign(CENTER)
    text("T   H   E     P   L   A   Y     A   R   E   A", width*0.625, height*0.04)
    stroke(255)
    line(width*0.55,height*0.05,width*0.702,height*0.05)
    fill(94,228,187)
    noStroke()
}

function displayTimelineTag(){
    fill(255)
    noStroke()
    beginShape()
    vertex(width*0.05,height*0.965)
    vertex(width*0.05,height*0.97)
    vertex(width*0.90,height*0.97)
    vertex(width*0.90,height*0.98)
    vertex(width*0.92,height*0.9675)
    vertex(width*0.90,height*0.955)
    vertex(width*0.90,height*0.965)
    vertex(width*0.05,height*0.965)
    endShape()
    textAlign(CENTER)
    text("T   I   M   E  -  L   I   N   E",width/2,height*0.99)
    fill(94,228,187)
}

function mouseClicked(){
    //When the mouse clicks the "RUN" button
    if ((mouseX > width*0.03) && (mouseX < ((width*0.03) + 60)) && (mouseY > (height*0.78)) && (mouseY < (height*0.78) + 30)){
        runScript = true
        console.log("run pushed")
    }else if ((mouseX > width*0.08) && (mouseX < ((width*0.08) + 60)) && (mouseY > (height*0.78)) && (mouseY < (height*0.78) + 30)){
        location.reload()
    }
}

function blockLayout(){
    
    var blockBoxWidth = 90
    var blockBoxHeight = 50
    var blockPosX = (width*0.125)-blockBoxWidth/2
    var blockPosY = height
    
    //Forward
    rect(blockPosX,blockPosY*0.1,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    textAlign(CENTER)
    text('Forward',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
    fill(94,228,187)
    
    //Backward
    rect(blockPosX,blockPosY*0.25,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    textAlign(CENTER)
    text('Backward',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
    fill(94,228,187)
    
    //Left
    rect(blockPosX,blockPosY*0.4,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    textAlign(CENTER)
    text('Rotate Left',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
    fill(94,228,187)
    
    //Right
    rect(blockPosX,blockPosY*0.55,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    textAlign(CENTER)
    text('Rotate Right',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
    fill(94,228,187)
}

class block{
    constructor(id,startPosX,startPosY){
        this.blockID = id
        this.posX = startPosX
        this.posY = startPosY
        this.boxWidth = 90
        this.boxHeight = 50
        this.offsetX = 0
        this.offsetY = 0
        this.dragging = false
    }
    
    
    mouseTrack(){
        if (mouseX > this.posX && mouseX < this.posX + this.boxWidth && mouseY > this.posY && mouseY < this.posY + this.boxHeight){
            this.dragging = true
            this.offsetX = this.posX-mouseX
            this.offsetY = this.posY-mouseY
        }
    }
    
    move(){
        if (this.dragging){
            this.posX = mouseX + this.offsetX
            this.posY = mouseY + this.offsetY
            if (this.posX < 0){
                this.posX = 0
            }else if (this.posX > (width - this.boxWidth)){
                this.posX = width-this.boxWidth
            }else if (this.posY < 0){
                this.posY = 0
            }else if (this.posY > height - this.boxHeight){
                this.posY = height-this.boxHeight
            }
        }
    }
    
    display(){
        rect(this.posX,this.posY,this.boxWidth,this.boxHeight,10)
        textSize(16)
        fill(255)
        noStroke()
        textAlign(CENTER)
        text(this.blockID,this.posX+this.boxWidth/2,this.posY+this.boxHeight/2)
        fill(94,228,187)
    }
}