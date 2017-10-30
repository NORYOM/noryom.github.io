function Selector(){
    this.x = 0;
    this.y = 0;
    this.colorSelBg = "#727272";
    this.colorSelOn = "#3C3F41";
    this.colorSelDisable = "#666666";

    var cvs = canvas;

    var w = 50;
    var h = 10;
    var selR = 5;
    var disabled = false;
    var option = [{
        value: 0x101,
        display: "请选择"
    }];
    var selectedItem = 0;// init default
    var showItems = false;
    var selectedH = 10;
    var openedH = 10;
    var highLightX,highLightY,highLightW,highLightH;
    var firstItemCanHighlight = false;
    var oldValue = selectedItem;
    var event;

    this.setPos = function(x,y){
        this.x = x;
        this.y = y;
    };
    this.getW = function(){
        return w;
    };
    this.getH = function(){
        return h;
    };
    this.setDisable = function(flag){
        disabled = flag;
    };
    this.setOption = function(opt){
        option = opt;
    };
    this.addOption = function(optVal,optDis){
        option.push({value: optVal,display: optDis});
        openedH = selR*3.5*option.length;
        h = selR*3.5*option.length;
        var tmpW = getStrLength(optDis);
        if(tmpW>w-selR){
            w = tmpW+selR*2;
        }
    };
    this.clearOption = function(opt){
        option = [];
    };
    this.setDefaultOption = function(n){
        if(n>option.length){
            n = option.length-1;
        }
        if(n<0){
            n = 0;
        }
        selectedItem = n;
    };
    this.getValue = function(){
        return option[selectedItem].value;
    }
    this.setEvtName = function(name){
        event = new CustomEvent(name);
    }

    this.onmousedown = function(e){
        if(this.isInSelectorArea(e.clientX,e.clientY) && option.length>1){
            showItems = !showItems;
        }
        if(!showItems){
            firstItemCanHighlight = false;
            if(oldValue!=selectedItem){
                oldValue = selectedItem;
                dispatchEvent(event);
            }
        }else{
            oldValue = selectedItem;
        }
    };
    this.onmousemove = function(e){
        if(!showItems){
            return;
        }
        var tmpY = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);// first item
        if(tmpY>this.y+selR+selectedH){
            firstItemCanHighlight = true;
        }
        if(showItems && firstItemCanHighlight){
            this.highLight(e.clientX,e.clientY);
        }
    };
    this.isInSelectorArea = function(mx,my){
        var cx = mx-cvsRect.left*(cvs.width/cvsRect.width);
        var cy = my-cvsRect.top*(cvs.height/cvsRect.height);
        return (cx>this.x-selR && cx<(this.x+w+selR) && cy>this.y-selR && cy<(this.y+h+selR));
    };
    this.highLight = function(mx,my){
        var cx = mx-cvsRect.left*(cvs.width/cvsRect.width);
        var cy = my-cvsRect.top*(cvs.height/cvsRect.height);
        highLightX = this.x-selR;
        highLightW = w+selR*2;
        highLightH = selR*3.5;
        for(var i=0;i<option.length;i++){
            highLightY = this.y-selR+i*selR*3.5;
            if(cx>highLightX && cx<(highLightX+highLightW) && cy>highLightY && cy<(highLightY+highLightH)){
                selectedItem = i;
            }
        }
    };
    function getStrLength(str){
        var realLength = 0;
        for (var i = 0; i < str.length; i++){
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
            realLength += 1;
            else
            realLength += 2;
        }
        return realLength*6;
    }
    function drawArrow(x,y){
        ctx.beginPath();
        ctx.strokeStyle="#eeee99";
        ctx.moveTo(x+w-selR,y+selR/2);
        ctx.lineTo(x+w,y+selR/2);
        ctx.lineTo(x+w-selR/2,y+selR*3/2);
        ctx.lineTo(x+w-selR,y+selR/2);
        ctx.stroke();
        ctx.closePath();
    }
    this.rend = function(){
        ctx.save();

        if(!showItems){// show selected item
            h = selectedH;
            this.setDefaultOption(selectedItem);
            ctx.beginPath();
            ctx.arc(this.x, this.y, selR, (Math.PI/180)*180, -1*(Math.PI/180)*90, false);//TL
            ctx.lineTo(this.x+w,this.y-selR);//T
            ctx.arc(this.x+w, this.y, selR, -1*(Math.PI/180)*90, (Math.PI/180)*0, false);//TR
            ctx.lineTo(this.x+w+selR,this.y+h);//R
            ctx.arc(this.x+w, this.y+h, selR, (Math.PI/180)*0, (Math.PI/180)*90, false);//RB
            ctx.lineTo(this.x,this.y+h+selR);//B
            ctx.arc(this.x, this.y+h, selR, (Math.PI/180)*90, (Math.PI/180)*180, false);//LB
            ctx.lineTo(this.x-selR,this.y);//L

            ctx.strokeStyle="#000000";
            ctx.lineWidth=1;
            ctx.stroke();
            ctx.fillStyle=this.colorSelOn;
            if(disabled){
                ctx.fillStyle = this.colorSelDisable;
            }
            ctx.fill();

            // show text
            ctx.fillStyle = '#eeee99';
            ctx.fillText(option[selectedItem].display,this.x,this.y+selR*3/2);
            ctx.closePath();

            // arrow
            drawArrow(this.x,this.y);
        }else{// show all items
            h = openedH;
            ctx.beginPath();
            ctx.moveTo(this.x-selR, this.y-selR);//O
            ctx.lineTo(this.x+w+selR,this.y-selR);//T
            ctx.lineTo(this.x+w+selR,this.y+h);//R
            ctx.lineTo(this.x-selR,this.y+h);//B
            ctx.lineTo(this.x-selR,this.y-selR);//L

            ctx.strokeStyle="#000000";
            ctx.lineWidth=1;
            ctx.stroke();
            ctx.fillStyle=this.colorSelBg;
            if(disabled){
                ctx.fillStyle = this.colorSelDisable;
            }
            ctx.fill();

            // show text
            for(var i=0;i<option.length;i++){
                if(option[selectedItem].value==option[i].value){
                    var ox = this.x-selR;
                    var oy = this.y-selR+i*selR*3.5;
                    highLightX = ox;
                    highLightY = oy;
                    highLightW = w+selR*2;
                    highLightH = selR*3.5;
                    ctx.beginPath();
                    ctx.fillStyle=this.colorSelOn;
                    ctx.moveTo(ox,oy);
                    ctx.lineTo(ox+w+selR*2,oy);
                    ctx.lineTo(ox+w+selR*2,oy+selR*3.5);
                    ctx.lineTo(ox,oy+selR*3.5);
                    ctx.lineTo(ox,oy);
                    ctx.fill();
                    ctx.closePath();
                }
                ctx.fillStyle = '#eeee99';
                ctx.fillText(option[i].display,this.x,this.y+selR*1.5+i*selR*3.5);
            }
            ctx.closePath();

            // arrow
            drawArrow(this.x,this.y);
        }

        ctx.restore();
    };
}

