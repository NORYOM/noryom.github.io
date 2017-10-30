function BaseObj(){
    this.r = 20;
    this.w = 100;
    this.h = 50;
    this.x = 50;
    this.y = 50;
    this.title = "提示";
    this.titleColor = 'rgba(80,82,85,0.5)';
    this.priority = 0;
    var oldPriority = 0;

    var dx,dy;
    var drag = false;

    var cvs = canvas;

    this.setR = function(n){
        this.r = n;
    };
    this.getR = function(){
        return this.r;
    };
    this.setW = function(n){
        this.w = n;
    };
    this.setH = function(n){
        this.h = n;
    };
    this.setX = function(n){
        this.x = n;
    };
    this.setY = function(n){
        this.y = n;
    };
    this.getCVS = function(){
        return cvs;
    };

    this.isInArea = function(mx,my){
        var cx = mx-cvsRect.left*(cvs.width/cvsRect.width);
        var cy = my-cvsRect.top*(cvs.height/cvsRect.height);
        return (cx>this.x-this.r && cx<(this.x+this.w+this.r) && cy>this.y-this.r && cy<(this.y+this.h+this.r));
    };
    this.isInTitleBar = function(mx,my){
        var cx = mx-cvsRect.left*(cvs.width/cvsRect.width);
        var cy = my-cvsRect.top*(cvs.height/cvsRect.height);
        return (cx>this.x-this.r && cx<(this.x+this.w+this.r) && cy>this.y-this.r && cy<this.y);
    };

    this.onmousedown = function(e){
        if(this.isInTitleBar(e.clientX,e.clientY)){
            drag = true;
        }
        dx = e.clientX - this.x;
        dy = e.clientY - this.y;

        //for showing order
        oldPriority = this.priority;
        this.priority = 1000;
    };
    this.onmousemovewhendown = function(e){
        if(drag){
            this.x = (e.clientX - dx);
            this.y = (e.clientY - dy);
        }
    };
    this.onmouseup = function(e){
        drag = false;
        this.priority = oldPriority;
        oldPriority = 0;
    };
    this.onmousemove = function(e){
    };
    this.passEvent = function(e){
    // pass event from top level when mouse out of area and some event must process
    };

    this.rend = function(){
        // base shape
        ctx.save();
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.strokeStyle="#000000";
        
        ctx.moveTo(this.x+this.w+this.r,this.y);
        ctx.lineTo(this.x+this.w+this.r,this.y+this.h);//R
        ctx.arc(this.x+this.w, this.y+this.h, this.r, (Math.PI/180)*0, (Math.PI/180)*90, false);//RB
        ctx.lineTo(this.x,this.y+this.h+this.r);//B
        ctx.arc(this.x, this.y+this.h, this.r, (Math.PI/180)*90, (Math.PI/180)*180, false);//LB
        ctx.lineTo(this.x-this.r,this.y);//L

        ctx.stroke();
        ctx.fillStyle='rgba(88,88,88,0.5)';
        ctx.shadowColor = "RGBA(50,50,50,1)";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, (Math.PI/180)*180, -1*(Math.PI/180)*90, false);//TL
        ctx.lineTo(this.x+this.w,this.y-this.r);//T
        ctx.arc(this.x+this.w, this.y, this.r, -1*(Math.PI/180)*90, (Math.PI/180)*0, false);//TR
        ctx.lineTo(this.x+this.w+this.r,this.y);//C
        ctx.stroke();
        ctx.fillStyle = this.titleColor;
        ctx.fill();
        ctx.fillStyle = '#eeeebb';
        ctx.fillText(this.title,this.x-this.r/4,this.y-this.r/4);
        ctx.closePath();

        ctx.restore();
    };
}

