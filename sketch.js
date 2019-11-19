var firstRun = true

//var dragging = false

var blockSelected = "forwardBlock"

let blocks = []

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
    createCanvas(width, height);
    background(255,255,255);
    blocks.push(new block("forward",width*0.05,height*0.1))
    blocks.push(new block("backward",width*0.1,height*0.3))
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
    
    for (block of blocks){
        if (mouseIsPressed) {
            block.mouseTrack(block.dragging)
        } else {block.dragging=false;}
        block.move(block.dragging)
        block.display()
    }        
}

function mouseReleased(){
    dragging = false
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
            console.log('dragging'+this.blockID)
            //return dragging
        }
    }
    
    move(){
        if (this.dragging){
            console.log('moving'+this.blockID)
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
    }
}