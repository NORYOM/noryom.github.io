function Bezier(){
    var startX=0, startY=0;
    var startDraw = false;
    var mx;
    var my;
    var drag = false;
    var cvs = canvas;
    var showControlPoint = false;
    var softControlPoint = true;
    var canDrawBezier = false;

    var startObj;
    var endObj;

    this.setStart = function(x,y){
        startX = x;
        startY = y;
    };
    this.getStart = function(){
        return {x:startX, y:startY};
    };
    this.setEnd = function(x,y){
        mx = x;
        my = y;
    };
    this.startBezier = function(flag){
        canDrawBezier = flag;
    };
    this.setStartObj = function(obj){
        startObj = obj;
    };
    this.setEndObj = function(obj){
        endObj = obj;
    };
    this.getStartObj = function(){
        return startObj;
    };
    this.getEndObj = function(){
        return endObj;
    };
    this.isDrawing = function(){
    	return drag;
    };
    this.setDrawing = function(flag){
    	drag = flag;
    };
    this.isDrawn = function(){
    	return startDraw;
    };
    this.setDrawn = function(flag){
    	startDraw = flag;
    };

    this.onmousedown = function(e){
        if(canDrawBezier){
            drag = true;
            
            startX = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
            startY = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
        }
    };
    this.onmousemovewhendown = function(e){
        if(drag){
            startDraw = true;
            mx = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
            my = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
        }
    };
    this.onmouseup = function(e){
        drag = false;
    };
    this.onmousemove = function(e){
    };

    this.rend = function(){
        if(startObj){
            startX = startObj.x;
            startY = startObj.y;
        }
        if(endObj){
            mx = endObj.x;
            my = endObj.y;
        }
        if(startDraw){
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            var x1 = startX + (mx-startX)/4;
            var y1 = startY - (my-startY)/4;
            var x2 = mx - (mx-startX)/4;
            var y2 = my + (my-startY)/4;
            if(softControlPoint){
                y1 = startY;
                y2 = my;
            }
            ctx.bezierCurveTo(x1,y1,x2,y2,mx,my);
            ctx.lineWidth=1;
            ctx.strokeStyle = "#222222";
            ctx.shadowColor = "RGBA(50,50,50,1)";
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.closePath();
            if(showControlPoint){
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(x1,y1,3,3);
                ctx.fillStyle = "#00ff00";
                ctx.fillRect(x2,y2,3,3);
            }
            ctx.restore();
        }
    };
}

