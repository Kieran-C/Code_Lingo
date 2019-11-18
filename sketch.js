var firstRun = true

var dragging = false

var forwardBlock = {
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

}

function draw()
{
    if (firstRun){
        forwardBlock.posX = width*0.05
        forwardBlock.posY = height*0.1
        firstRun = false
    }
    fill(100)
    stroke(94,228,187)
    strokeWeight(1)
    rect(0,0,width,height)
    strokeWeight(1)
    rect(0,0,width*0.25,height*0.75)
    rect(0,height*0.75,width,height*0.25)
    
    fill(94,228,187)
    
    if (dragging){
        forwardBlock.posX = mouseX + forwardBlock.offsetX
        forwardBlock.posY = mouseY + forwardBlock.offsetY
        if (forwardBlock.posX < 0){
            forwardBlock.posX = 0
        }else if (forwardBlock.posX > (width - forwardBlock.boxWidth)){
            forwardBlock.posX = width-forwardBlock.boxWidth
        }else if (forwardBlock.posY < 0){
            forwardBlock.posY = 0
        }else if (forwardBlock.posY > height - forwardBlock.boxHeight){
            forwardBlock.posY = height-forwardBlock.boxHeight
        }
    }
    
    rect(forwardBlock.posX,forwardBlock.posY,forwardBlock.boxWidth,forwardBlock.boxHeight,10)
}

function mousePressed(){
    if (mouseX > forwardBlock.posX && mouseX < forwardBlock.posX + forwardBlock.boxWidth && mouseY > forwardBlock.posY && mouseY < forwardBlock.posY + forwardBlock.boxHeight){
        dragging = true
        forwardBlock.offsetX = forwardBlock.posX-mouseX
        forwardBlock.offsetY = forwardBlock.posY-mouseY
    }
}

function mouseReleased(){
    dragging = false
}