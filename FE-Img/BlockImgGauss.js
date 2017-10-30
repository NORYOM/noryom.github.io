function BlockImgGauss(){// single effect
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=60;
    this.w=120;
    this.title="高斯模糊";
    this.titleColor = 'rgba(20,20,20,0.5)';

    this.inPt = [new ParamPoint(),new ParamPoint()];
    this.outPt = [new ParamPoint()];

    var img = new Image();
    var imageView = new ImageView();

    var done = false;
    var oldImgSrc;
    var outImgSrc = 1;
    var oldValue = null;

    var asyncFunc = new Promise((resolve, reject) => {
        resolve();
    });
    this.doAction = function(){
        if(this.inPt[0].value && this.inPt[0].value instanceof Image){
            var paramValue = 0;
            if(this.inPt[1].value!=null){
                paramValue = this.inPt[1].value;
                if(oldValue!=this.inPt[1].value){
                    done = false;
                    oldValue = this.inPt[1].value;
                }
            }else{
                this.outPt[0].value = null;
                oldValue = null;
            }
            if(!oldImgSrc){
                oldImgSrc = this.inPt[0].value.accessKey;
            }else{
                if(oldImgSrc!=this.inPt[0].value.accessKey){
                    done = false;
                    oldImgSrc = this.inPt[0].value.accessKey;
                }
            }
            if(!done){
                if(this.inPt[1].value!=null && this.inPt[1].value!=0){
                    asyncFunc.then(() => {
                        var clnImg = imageView.getImgClone(this.inPt[0].value,this.w*1.5,this.w*1.5);
                        img = new Image();
                        $AI(clnImg).act("gaussBlur",paramValue).replace(img);
                        // make sure out value is the newest and will not lost
                        this.outPt[0].value = img;
                        this.outPt[0].operation = [];
                        if(this.inPt[0].operation){
                            for(var j=0;j<this.inPt[0].operation.length;j++){
                                this.outPt[0].operation.push(this.inPt[0].operation[j]);
                            }
                        }
                        this.outPt[0].operation.push({type:"act",value:{action:"gaussBlur",param:["高斯模糊",paramValue]}});
                        outImgSrc *= -1;
                        img.accessKey = outImgSrc;
                    });
                }else{
                    this.outPt[0].value = null;
                }
                done = true;
            }
        }else{
            done = false;
            // clear img value make sure output is no value
            img = null;
            this.outPt[0].value = img;
        }
    };

    this.rend = function(){
        this.parentType.rend.call(this);
        ctx.save();

        ctx.beginPath();
        ctx.fillStyle = '#eeeebb';
        ctx.fillText("输入图片",this.x,this.y+this.r+3);
        ctx.fillText("模糊参数（数值1至255）",this.x,this.y+this.r*2+3);
        ctx.closePath();

        ctx.restore();
    };
}

