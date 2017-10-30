function Button(){
    var cvs = canvas;

    this.x = 0;
    this.y = 0;
    this.w = 30;
    this.h = 8;
    this.colorOff = "#cccccc";
    this.colorMouseDown = "#dddddd";
    this.colorOn = "#eeeeee";
    this.label = "测试";

    var labelW = 0;// length of label characters
    var buttonR = 5;
    var mouseOver = false;
    var mouseDown = false;
    var disabled = false;

    this.getCVS = function(){
        return cvs;
    };
    this.setX = function(n){
        this.x = n;
    };
    this.setY = function(n){
        this.y = n;
    };
    this.setPos = function(x,y){
        this.x = x;
        this.y = y;
    };
    this.getR = function(x,y){
        return buttonR;
    };
    this.setDisable = function(flag){
        disabled = flag;
    };

    this.getLabelLength = function(){
        var realLength = 0;
        for (var i = 0; i < this.label.length; i++)
        {
            charCode = this.label.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
            realLength += 1;
            else
            realLength += 2;
        }
        labelW = realLength*6;
        return labelW;
    }

    this.isInBtnArea = function(mx,my){
        var cx = mx-cvsRect.left*(this.getCVS().width/cvsRect.width);
        var cy = my-cvsRect.top*(this.getCVS().height/cvsRect.height);
        
        if(cx>this.x-buttonR && cx<(this.x+this.w+buttonR)
        && cy>this.y-buttonR && cy<(this.y+this.h+buttonR)){
            return true;
        }
        return false;
    };

    this.onmousedown = function(e){
        if(disabled){
            return;
        }
        if(this.isInBtnArea(e.clientX,e.clientY)){
            mouseDown = true;
        }
    };
    this.onmousemovewhendown = function(e){
    };
    this.onmouseup = function(e){
        if(this.isInBtnArea(e.clientX,e.clientY) && mouseDown && mouseOver){
            this.doAction();
        }
        mouseDown = false;
    };
    this.onmousemove = function(e){
        if(disabled){
            return;
        }
        if(this.isInBtnArea(e.clientX,e.clientY)){
            mouseOver = true;
        }else{
            mouseOver = false;
        }
    };
    this.doAction = function(){

    };

    this.rend = function(){
        this.w = this.getLabelLength();

        var btnColor = mouseDown?this.colorMouseDown:(mouseOver?this.colorOn:this.colorOff);

        ctx.save();

        ctx.beginPath();

        ctx.arc(this.x, this.y, buttonR, (Math.PI/180)*180, -1*(Math.PI/180)*90, false);//TL
        ctx.lineTo(this.x+this.w,this.y-buttonR);//T
        ctx.arc(this.x+this.w, this.y, buttonR, -1*(Math.PI/180)*90, (Math.PI/180)*0, false);//TR
        ctx.lineTo(this.x+this.w+buttonR,this.y+this.h);//R
        ctx.arc(this.x+this.w, this.y+this.h, buttonR, (Math.PI/180)*0, (Math.PI/180)*90, false);//RB
        ctx.lineTo(this.x,this.y+this.h+buttonR);//B
        ctx.arc(this.x, this.y+this.h, buttonR, (Math.PI/180)*90, (Math.PI/180)*180, false);//LB
        ctx.lineTo(this.x-buttonR,this.y);//L

        ctx.strokeStyle="#000000";
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.fillStyle=btnColor;
        if(disabled){
            ctx.fillStyle = "#666666";
        }
        ctx.fill();
        ctx.fillStyle = '#222222';
        ctx.fillText(this.label,this.x,this.y+buttonR*3/2);
        ctx.closePath();

        ctx.restore();
    };
}

