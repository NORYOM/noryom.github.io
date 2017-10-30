function BlockImgEFS(){
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=20;
    this.w=120;
    this.title="效果";
    this.titleColor = 'rgba(20,20,20,0.5)';

    this.inPt = [new ParamPoint()];
    this.outPt = [new ParamPoint()];

    var img = new Image();
    var psMethod = [
                "美肤","素描","自然增强","紫调","柔焦",
                "复古","黑白","仿lomo","亮白增强","灰白",
                "灰色","暖秋","木雕","粗糙"
             ];
    var imageView = new ImageView();

    var sel = new Selector();
    for(var i=0;i<psMethod.length;i++){
        sel.addOption(psMethod[i],psMethod[i]);
    }
    sel.setDefaultOption(0);
    sel.setEvtName("selChanged-"+this.id);
    var selChanged = false;

    var done = false;
    var oldImgSrc;
    var outImgSrc = 1;

    var asyncFunc = new Promise((resolve, reject) => {
        resolve();
    });
    addEventListener("selChanged-"+this.id, function(e){
        selChanged = true;
        done = false;
    });
    this.doAction = function(){
        if(this.inPt[0].value && this.inPt[0].value instanceof Image){
            if(!oldImgSrc){
                oldImgSrc = this.inPt[0].value.accessKey;
            }else{
                if(oldImgSrc!=this.inPt[0].value.accessKey){
                    done = false;
                    oldImgSrc = this.inPt[0].value.accessKey;
                }
            }
            if(!done){
                if(sel.getValue()!=0x101){
                    asyncFunc.then(() => {
                        var clnImg = imageView.getImgClone(this.inPt[0].value,this.w*1.5,this.w*1.5);
                        img = new Image();
                        $AI(clnImg).ps(sel.getValue()).replace(img);
                        // make sure out value is the newest and will not lost
                        this.outPt[0].value = img;
                        this.outPt[0].operation = [];
                        if(this.inPt[0].operation){
                            for(var j=0;j<this.inPt[0].operation.length;j++){
                                this.outPt[0].operation.push(this.inPt[0].operation[j]);
                            }
                        }
                        this.outPt[0].operation.push({type:"ps",value:sel.getValue()});
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

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        sel.onmousemove(e);
    };
    this.passEvent = function(e){
        sel.onmousedown(e);
    }

    this.rend = function(){
        this.parentType.rend.call(this);

        sel.setPos(this.x+this.w-sel.getW(),this.y+this.r-5);
        sel.rend();
    };
}

