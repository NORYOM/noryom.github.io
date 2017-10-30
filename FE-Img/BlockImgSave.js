function BlockImgSave(){
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=50;
    this.w=100;
    this.title="保存";
    this.titleColor = 'rgba(200,0,0,0.5)';

    this.inPt = [new ParamPoint()];
    this.outPt = [];
    this.btnSave = new Button();
    this.btnSave.label = "保存新图片";
    this.btnSave.doAction = function(){
        showLoading();
        setTimeout(callSave,30);// delay 30 ms for show loading box
    };
    function callSave(){
        asyncFunc.then(() => {
            decodeOperation();
            saveImg();
            hideLoading();
        });
    }

    var imageView = new ImageView();
    var img;
    var done = false;
    var opArr;
    var saveCvs;
    var saveLnk;

    var asyncFunc = new Promise((resolve, reject) => {
        resolve();
    });
    this.doAction = function(){
        if(this.inPt[0].value && this.inPt[0].value instanceof Image){
            opArr = this.inPt[0].operation;
        }else{
            opArr = null;
        }
    };

    function decodeOperation(){
        if(opArr){
            var aiTmp;
            for(var i=0;i<opArr.length;i++){
                if(opArr[i].type=="src"){
                    img = imageView.cloneImg(opArr[i].value);
                }
                if(img){
                    if(opArr[i].type=="ps"){
                        if(!aiTmp){
                            aiTmp = $AI(img);
                        }
                        aiTmp = aiTmp.ps(opArr[i].value);
                    }
                    if(opArr[i].type=="act"){
                        if(!aiTmp){
                            aiTmp = $AI(img);
                        }
                        var act = opArr[i].value;
                        if(act){
                            if(act.action=="curve"){
                                aiTmp = aiTmp.act("curve",act.param[0],act.param[1]);
                            }else if(act.action=="noParam"){
                                aiTmp = aiTmp.act(act.param);
                            }else if(act.action=="gaussBlur"){
                                aiTmp = aiTmp.act(act.param[0],act.param[1]);
                            }
                        }
                    }
                }
            }
            if(aiTmp){
                aiTmp.replace(img);
            }
        }else{
            img = null;
        }
    }

    function saveImg(){
        if(img){
            if(!saveCvs){
                saveCvs = document.createElement("canvas");
            }
            saveCvs.width = img.width;
            saveCvs.height = img.height;
            saveCvs.getContext("2d").clearRect(0,0,img.width,img.height);
            saveCvs.getContext("2d").drawImage(img,0,0,img.width,img.height);
            if(!saveLnk){
                saveLnk = document.createElement("a");
                saveLnk.download = "新图片.jpg";
                if(navigator.userAgent.indexOf("QQBrowser")==-1 || img.width*img.height>1920*1152){// only QQBrowser and size less then 2560*1536 support download
                    var div = document.createElement("div");
                    div.align = "center";
                    div.style.zIndex = 999;
                    div.style.position = "absolute";
                    div.style.backgroundColor = "#777777";
                    div.style.color = "#ffff77";
                    div.style.border = "solid 1px #eeeebb";
                    div.innerHTML = "&nbsp;&nbsp;正在使用的浏览器出于安全原因可能会阻止图片自动下载，请右单击图片保存。";
                    div.innerHTML += "<br>&nbsp;如果尺寸大于1920x1152请右单击图片复制并粘贴到画图板中保存为JPG格式";
                    var btn = document.createElement("input");
                    btn.type = "button";
                    btn.value = "点击关闭";
                    btn.onclick = function(){
                        document.body.removeChild(div);
                        div.remove();
                        img = null;
                    };
                    div.appendChild(document.createElement("br"));
                    div.appendChild(document.createElement("br"));
                    var showImg = new Image();
                    showImg.src = img.src;
                    var compressRate = 1;
                    if(img.width>img.height){
                        showImg.width = canvas.width/2;
                        compressRate = showImg.width/img.width;
                        div.width = showImg.width;
                        div.height = img.height*compressRate;
                    }else{
                        showImg.height = canvas.height/2;
                        compressRate = showImg.height/img.height;
                        div.width = img.width*compressRate;
                        div.height = showImg.height;
                    }
                    div.appendChild(showImg);
                    div.style.top = (canvas.height-div.height)/2 - 30+"px";
                    div.style.left = (canvas.width-div.width)/2 - 30+"px";
                    div.innerHTML += "<br>" + img.width +"x"+ img.height;
                    div.appendChild(document.createElement("br"));
                    div.appendChild(btn);
                    document.body.appendChild(div);
                }else{
                    saveLnk.href = saveCvs.toDataURL("image/jpeg").replace("image/jpeg",'image/octet-stream');
                }
                saveLnk.click();
                saveLnk.remove();
                saveLnk = null;
            }
        }else{
            showMsg("没有图片可以保存");
        }
    }

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
        this.btnSave.onmousedown(e);
    };

    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        this.btnSave.onmouseup(e);
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        this.btnSave.onmousemove(e);
    };
    this.rend = function(){
        this.parentType.rend.call(this);
        // button
        this.btnSave.setPos(this.x+this.r,this.y+this.r/2);
        this.btnSave.rend();
    };
}

