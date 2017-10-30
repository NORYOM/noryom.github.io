function ParamPoint(){
    var cvs = canvas;

    this.id = (new Date()).getTime()+Math.random();
    this.x = 0;
    this.y = 0;
    colorOff = "#cccccc";
    colorReday = "#77cc77";
    colorOccupied = "#cc7777";
    colorMouseDown = "#7777cc";
    colorOn = "#cccc00";
    this.value = null;
    this.operation = null;

    var parameterPointR = 5;
    var mouseDrag = false;
    var mouseDown = false;

    var link;
    var lnkNum = 0;
    var next;
    var readyForLink = false;

    this.setLink = function(obj){
        link = obj;
    };
    this.getLink = function(){
        return link;
    };
    this.addLink = function(){
        lnkNum++;
    };
    this.removeLink = function(){
        lnkNum--;
        if(lnkNum<0){
            lnkNum = 0;
        }
    };

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
        return parameterPointR;
    };

    this.isOutStart = function(){
    	return mouseDown;
    };

    this.holdForLink = function(){
        readyForLink = false;
    };
    this.readyForLink = function(){
        readyForLink = true;
    };

    this.isInParamPos = function(mx,my){
        var cx = mx-cvsRect.left*(this.getCVS().width/cvsRect.width);
        var cy = my-cvsRect.top*(this.getCVS().height/cvsRect.height);
        
        if(cx>this.x-parameterPointR && cx<(this.x+parameterPointR)
        && cy>this.y-parameterPointR && cy<(this.y+parameterPointR)){
            return true;
        }
        return false;
    };

    this.onmousedown = function(e){
        if(this.isInParamPos(e.clientX,e.clientY)){
            mouseDown = true;
        }
    };
    this.onmousemovewhendown = function(e){
        if(this.isInParamPos(e.clientX,e.clientY)){
            mouseDrag = true;
        }else{
            mouseDrag = false;
        }
    };
    this.onmouseup = function(e){
    	mouseDown = false;
        if(this.isInParamPos(e.clientX,e.clientY)){
            mouseDrag = false;
        }
    };

    this.rend = function(){
        var ptColor = mouseDrag?(lnkNum?(readyForLink?colorOccupied:colorOn):(readyForLink?colorReday:colorOff)):(lnkNum?colorOn:colorOff);
        ptColor = mouseDown?colorMouseDown:ptColor;

        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, parameterPointR, (Math.PI/180)*0, (Math.PI/180)*360, false);
        ctx.strokeStyle="#000000";
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.fillStyle=ptColor;
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    };
}

