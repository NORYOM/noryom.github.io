function DigiNum(){
    this.x = 0;
    this.y = 0;
    this.recLen = 10;
    this.triH = 2;
    this.triW = 2;
    this.colorBorder = "#444444";
    this.colorOff = "#888888";
    this.colorOn = "#ff9966";

    var num;

    this.setNum = function(n){
        num = n;
    }
    this.test = function(){
        num = 'test';
    }
    this.shut = function(){
        num = null;
    }
    this.getWidth = function(){
        return this.triW*4+this.recLen;
    };
    this.getHeight = function(){
        return this.triH*6+this.recLen*2;
    };

    this.drawHorizon = function(x,y,c){
        ctx.save();
        ctx.beginPath();

        ctx.moveTo(x, y);
        ctx.lineTo(x+this.triH, y-this.triW);
        ctx.lineTo(x+this.triH+this.recLen, y-this.triW);
        ctx.lineTo(x+this.triH+this.recLen+this.triW, y);
        ctx.lineTo(x+this.triH+this.recLen, y+this.triW);
        ctx.lineTo(x+this.triH, y+this.triW);
        ctx.lineTo(x, y);

        ctx.strokeStyle=this.colorBorder;
        ctx.lineWidth=1;
        ctx.stroke();
        ctx.fillStyle=c;
        ctx.fill();

        ctx.closePath();
        ctx.restore();
    };

    this.drawVertical = function(x,y,c){
        ctx.save();
        ctx.beginPath();

        ctx.moveTo(x, y);
        ctx.lineTo(x-this.triW, y+this.triH);
        ctx.lineTo(x-this.triW, y+this.triH+this.recLen);
        ctx.lineTo(x, y+this.triH+this.recLen+this.triH);
        ctx.lineTo(x+this.triW, y+this.triH+this.recLen);
        ctx.lineTo(x+this.triW, y+this.triH);
        ctx.lineTo(x, y);

        ctx.strokeStyle=this.colorBorder;
        ctx.lineWidth=1;
        ctx.stroke();
        ctx.fillStyle=c;
        ctx.fill();

        ctx.closePath();
        ctx.restore();
    };

//    -a
//  b|  |d
//    _c
//  e|  |g
//    -f
    this.drawOff = function(){
        this.drawHorizon(this.x, this.y, this.colorOff);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOff);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOff);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOff);//g
    };
    this.drawOn = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOn);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };

    this.draw0 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOn);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };
    this.draw1 = function(){
        this.drawHorizon(this.x, this.y, this.colorOff);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOff);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };
    this.draw2 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOn);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOff);//g
    };
    this.draw3 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOn);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };
    this.draw4 = function(){
        this.drawHorizon(this.x, this.y, this.colorOff);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOff);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };
    this.draw5 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOff);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOn);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };
    this.draw6 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOff);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOn);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };
    this.draw7 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOff);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };
    this.draw8 = function(){
        this.drawOn();
    };
    this.draw9 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+this.triH*2+this.recLen, this.colorOn);//c
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+this.triH*2+this.recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+this.triH*4+this.recLen*2, this.colorOn);//f
        this.drawVertical(this.x+this.triH*2+this.recLen, this.y+this.triH*2+this.recLen, this.colorOn);//g
    };

    this.rend = function(){
        if(num==null){
            this.drawOff();
        }else if(num=='test'){
            this.drawOn();
        }else{
            switch(num){
                case 0:this.draw0();break;
                case 1:this.draw1();break;
                case 2:this.draw2();break;
                case 3:this.draw3();break;
                case 4:this.draw4();break;
                case 5:this.draw5();break;
                case 6:this.draw6();break;
                case 7:this.draw7();break;
                case 8:this.draw8();break;
                case 9:this.draw9();break;
            }
        }
    };
}