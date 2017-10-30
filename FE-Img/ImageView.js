function ImageView(){
    this.x = 0;
    this.y = 0;
    this.img = null;

    var w = 10;
    var h = 10;
    var clnCvs;
    var rec;

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
    this.getW = function(){
        return w;
    };
    this.getH = function(){
        return h;
    };
    this.initImg = function(imgObj, borderW, borderH){
        this.img = imgObj;
        w = this.img.width;
        h = this.img.height;
        this.calculateImgSize(borderW,borderH);
    };
    this.getImg = function(){
        return this.img;
    };
    this.getImgClone = function(img,borderW,borderH){
        var clnImg = new Image();
        if(!clnCvs){
            clnCvs = document.createElement("canvas");
            clnCvs.id = "clnCvs";
        }
        w = img.width;
        h = img.height;
        rec = this.calculateImgSize(borderW,borderH);
        clnCvs.width = rec.width;
        clnCvs.height = rec.height;
        clnCvs.getContext("2d").drawImage(img,0,0,rec.width,rec.height);
        clnImg.src = clnCvs.toDataURL("image/jpeg");
        if(clnImg.width==0 || clnImg.height==0){// for chrome CORS problem
            var children = document.body.children;
            for(var i=0;i<children.length;i++){
                if(children[i].nodeName.toLowerCase()=="img"){
                    document.body.removeChild(children[i]);
                    break;
                }
            }
            clnImg = document.createElement("img");
            document.body.appendChild(clnImg);
            clnImg.src = img.src;
            clnImg.width = rec.width;
            clnImg.height = rec.height;
            clnImg.style.width = rec.width + "px";
            clnImg.style.height = rec.height + "px";
            clnImg.style.display = "none";
        }
        return clnImg;
    };
    this.cloneImg = function(img){
        var clnImg = new Image();
        var children = document.body.children;
        for(var i=0;i<children.length;i++){
            if(children[i].nodeName.toLowerCase()=="img"){
                document.body.removeChild(children[i]);
                break;
            }
        }
        document.body.appendChild(img);// rend original pic first to define width & height
        clnImg.src = img.src;
        clnImg.width = img.width;
        clnImg.height = img.height;
        clnImg.style.width = img.width + "px";
        clnImg.style.height = img.height + "px";
        img.style.display = "none";// hide original pic
        return clnImg;
    };
    this.calculateImgSize = function(borderW,borderH){
       if(w>h){
            while(w>=borderW*0.7){
                w *= 0.9;
                h *= 0.9;
            }
        }else{
            while(h>=borderH*0.7){
                w *= 0.9;
                h *= 0.9;
            }
        }
        return {width:w,height:h};
    };
    this.clearImg = function(){
        this.img = null;
    };

    this.rend = function(){
        if(this.img && this.img.width){// 'this.img.width' make sure the img is an image can be drawn
            ctx.save();
            ctx.drawImage(this.img, this.x, this.y, w, h);
            ctx.restore();
        }
    };
}

