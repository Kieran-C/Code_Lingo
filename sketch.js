var firstRun = true

var blockSelected = "forwardBlock"
 
let blocks = []
let commands = []
let turtleImg

var turtlePosX
var turtlePosY
var turtleRotation = 90

var blockLoc = [[]]

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
    createCanvas(width, height);
    background(255,255,255);
    blocks.push(new block("Forward",width*0.07,height*0.1))
    blocks.push(new block("Backward",width*0.07,height*0.25))
    blocks.push(new block("Left",width*0.07,height*0.4))
    blocks.push(new block("Right",width*0.07,height*0.55))
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
    
    for (block of blocks){
        if (mouseIsPressed) {
            block.mouseTrack(block.dragging)
        } else {block.dragging=false;}
        block.move(block.dragging)
        block.display()
    }   
    
    var lowCmdCoord = width+1
    
    if (blocks.length > 0){
        for (i = 0; i < blocks.length; i++){
            if ((blocks[i].posX < lowCmdCoord)&&(blocks[i].posY >= height*0.75)) {
                lowCmdCoord = blocks[i].posX
            }
        }
        console.log(lowCmdCoord)
    }
    
    
    if (turtleRotation == 0){
        image(turtleImgUp,turtlePosX,turtlePosY,turtleImgUp.width/8,turtleImgUp.height/8)
    }else if (turtleRotation == 90){
        image(turtleImgRight,turtlePosX,turtlePosY,turtleImgRight.width/8,turtleImgRight.height/8)
    }else if (turtleRotation == 180){
        image(turtleImgDown,turtlePosX,turtlePosY,turtleImgDown.width/8,turtleImgDown.height/8)
    }else if (turtleRotation == 270){
        image(turtleImgLeft,turtlePosX,turtlePosY,turtleImgLeft.width/8,turtleImgLeft.height/8)
    }
}

function mouseReleased(){
    dragging = false
}

function blockLayout(){
    var blockPosX = width*0.07
    var blockPosY = height
    var blockBoxWidth = 90
    var blockBoxHeight = 50
    
    //Forward
    rect(blockPosX,blockPosY*0.1,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    noStroke()
    textAlign(CENTER)
    text('Forward',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
    fill(94,228,187)
    
    //Backward
    rect(blockPosX,blockPosY*0.25,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    noStroke()
    textAlign(CENTER)
    text('Backward',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
    fill(94,228,187)
    
    //Left
    rect(blockPosX,blockPosY*0.4,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    noStroke()
    textAlign(CENTER)
    text('Left',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
    fill(94,228,187)
    
    //Right
    rect(blockPosX,blockPosY*0.55,blockBoxWidth,blockBoxHeight,10)
    textSize(16)
    fill(255)
    noStroke()
    textAlign(CENTER)
    text('Right',(blockPosX+(blockBoxWidth/2)),(blockPosY+(blockBoxHeight/2)))
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