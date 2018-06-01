// for bg.js
var gridW = 20;
// for bg.js end
var cleanBgW;
var cleanBgH;

var objExclusiveLock = false;
var objArr = [];
var bezierArr = [];
var mouseInPanel = 0;

var requestAniFrame;
function initCanvas(canvasId,width,height){
	canvas = document.getElementById(canvasId);
	canvas.width = width;
	canvas.height = height;
	if(!canvas || !canvas.getContext){
		alert("浏览器不支持Canvas，请更换支持HTML5的浏览器");
		return;
	}
	if(!Promise){
		alert("浏览器不支持异步，请使用更高版本的浏览器");
		return;
	}
	requestAniFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                setInterval(callback, 1000 / fps);
            };
    })();

	var context = canvas.getContext("2d");
	ctx = context;

	cleanBgW = width;
	cleanBgH = height;

	// refresh canvas bounding, incase scroll page
	cvsRect = canvas.getBoundingClientRect();
	window.onresize = function(){
	    cvsRect = canvas.getBoundingClientRect();
	};
	window.onscroll = function(){
	    cvsRect = canvas.getBoundingClientRect();
	};

	canvas.onmousedown = function(e){
// 		e = e.touches?e.touches[0]:window.event;
		mouseInPanel = 0;
		// for block
		//for showing order, high priority will render first
    	for(var i=objArr.length-1;i>=0;i--){
    		if(!objExclusiveLock && objArr[i].isInArea(e.clientX,e.clientY)){
				objArr[i].onmousedown(e);
				objExclusiveLock = true;
    		}
    		objArr[i].passEvent(e);// pass event when mouse out of area and some event must process
    		mouseInPanel += objArr[i].isInArea(e.clientX,e.clientY)?1:0;
    		objArr[i].onmousedownOutPt(e);
    	}
    	//reorder showing order, high priority will render first
    	reOrder();

    	var bezierStarted = false;// check if start draw bezier to show color of inPoint when mouse over
    	for(var i=0;i<objArr.length;i++){
    		// in
    		for(var j=0;j<objArr[i].inPt.length;j++){
	    		if(objArr[i].inPt[j].isInParamPos(e.clientX,e.clientY)){
	    			bezierTemp = objArr[i].inPt[j].getLink();
	    			if(bezierTemp){
	    				objArr[i].inPt[j].setLink(null);
		    			objArr[i].inPt[j].removeLink();
		    			bezierTemp.setEndObj(null);
		    			bezierTemp.setStart(bezierTemp.getStart().x,bezierTemp.getStart().y);
		    			bezierTemp.startBezier(true);
		    			removeBezierFromList(bezierTemp);
		    			bezierStarted = true;
		    			break;
	    			}
	    		}
    		}
    		// out
    		for(var j=0;j<objArr[i].outPt.length;j++){
	    		if(objArr[i].outPt[j].isOutStart()){
	    			bezierTemp = new Bezier();
	    			objArr[i].outPt[j].addLink();
	    			bezierTemp.setStartObj(objArr[i].outPt[j]);
	    			bezierTemp.startBezier(true);
	    			bezierTemp.onmousedown(e);
	    			bezierStarted = true;
	    			break;
	    		}
    		}
    	}

    	// all in point ready for link(show color when mouse over)
		for(var i=0;i<objArr.length;i++){
			if(bezierStarted){
	    		for(var k=0;k<objArr[i].inPt.length;k++){
		    		objArr[i].inPt[k].readyForLink();
		    		objArr[i].inPt[k].value = null;
	    		}
			}
		}

		mouseCanDrag = true;
	};
	canvas.onmouseup = function(e){
// 		e = e.touches?e.touches[0]:window.event;
		mouseCanDrag = false;
		objExclusiveLock = false;
    	for(var i=0;i<objArr.length;i++){
    		objArr[i].onmouseup(e);
    		// in
    		for(var j=0;j<objArr[i].inPt.length;j++){
    			objArr[i].inPt[j].holdForLink();
	    		if(objArr[i].inPt[j].isInParamPos(e.clientX,e.clientY)){
	    			if(bezierTemp){
	    				if(!objArr[i].inPt[j].getLink()){
		    				bezierTemp.setEndObj(objArr[i].inPt[j]);
		    				objArr[i].inPt[j].setLink(bezierTemp);
		    				objArr[i].inPt[j].addLink();
	    				}else{
	    					showMsg("只能有一个输入，端口已经被占用");
	    				}
	    			}
	    		}
    		}
    	}
		if(bezierTemp){
			if(!bezierTemp.getEndObj()){
				// if bezier has no end point, remove start point
				(bezierTemp.getStartObj()).removeLink();
				bezierTemp.setStartObj(null);
				bezierTemp = null;
			}else{
				var existed = false;
				for(var i=0;i<bezierArr.length;i++){
					if(bezierTemp==bezierArr[i]){
						existed = true;
						bezierTemp = null;
						break;
					}
				}
				if(!existed){
					bezierArr.push(bezierTemp);
					bezierTemp = null;
				}
			}
		}
	};

	canvas.onmousemove = function (e){
        var e = e || window.event;
//         e = e.touches?e.touches[0]:window.event;

        // move on block
    	for(var i=0;i<objArr.length;i++){
    		objArr[i].onmousemove(e);
    	}

	    // for bezier
	    if(bezierTemp){
	    	bezierTemp.onmousemove(e);
	    }

		// for drag
	    if(mouseCanDrag){
	        // move block
	    	for(var i=0;i<objArr.length;i++){
	    		objArr[i].onmousemovewhendown(e);
	    	}

		    // for bezier
		    if(bezierTemp){
		    	bezierTemp.onmousemovewhendown(e);
		    }
	    }
    };

    //draw bg
    drawGrid(canvas,width,height);
    // loop
    requestAniFrame(render);
}

function addFileObj(){
	var objFile = new BlockImgFile();
	objFile.setX(100);
	objFile.setY(100);
	objFile.priority = objArr.length;
	objArr.push(objFile);
}
function addViewObj(){
	var objView = new BlockImgView();
	objView.setX(100);
	objView.setY(100);
	objView.priority = objArr.length;
	objArr.push(objView);
}
function addEFSObj(){
	var objEFS = new BlockImgEFS();
	objEFS.setX(100);
	objEFS.setY(100);
	objEFS.priority = objArr.length;
	objArr.push(objEFS);
}
function addSEFObj(){
	var objSEF = new BlockImgSEF();
	objSEF.setX(100);
	objSEF.setY(100);
	objSEF.priority = objArr.length;
	objArr.push(objSEF);
}
function addGaussObj(){
	var objGauss = new BlockImgGauss();
	objGauss.setX(100);
	objGauss.setY(100);
	objGauss.priority = objArr.length;
	objArr.push(objGauss);
}
function addCurveObj(){
	var objCurv = new BlockImgCurves();
	objCurv.setX(100);
	objCurv.setY(100);
	objCurv.priority = objArr.length;
	objArr.push(objCurv);
}
function addDVObj(){
	var objDV = new BlockDigiValue();
	objDV.setX(100);
	objDV.setY(100);
	objDV.setHorizon(false);
	objDV.priority = objArr.length;
	objArr.push(objDV);
}
function addSaveObj(){
	var objSave = new BlockImgSave();
	objSave.setX(100);
	objSave.setY(100);
	objSave.priority = objArr.length;
	objArr.push(objSave);
}

function reOrder(){
	var tempPriority;
	for(var i=0;i<objArr.length;i++){
		for(var j=i;j<objArr.length-1;j++){
			if(objArr[i].priority>objArr[j+1].priority){
				tempPriority = objArr[i];
				objArr[i] = objArr[j+1];
				objArr[j+1] = tempPriority;
			}
		}
	}
}

var bezierTemp;
function clear(){
    ctx.clearRect(0,0,cleanBgW,cleanBgH);
    ctx.fillStyle = "rgba(125,125,125,0)";
    ctx.fillRect(0,0,cleanBgW,cleanBgH);
}
function removeBezierFromList(bezier){
	for(var i=0;i<bezierArr.length;i++){
		if(bezier && bezier==bezierArr[i]){
			bezierArr.splice(i,1);
			break;
		}
	}
}
function removeBlockFromList(block){
	for(var i=0;i<objArr.length;i++){
		if(block && block==objArr[i]){
			objArr.splice(i,1);
			break;
		}
	}
    // in
    for(var j=0;j<block.inPt.length;j++){
        if(block.inPt[j]){
            bezierTemp = block.inPt[j].getLink();
            if(bezierTemp){
                block.inPt[j].setLink(null);
                block.inPt[j].removeLink();
                block.inPt[j].value = null;
                (bezierTemp.getStartObj()).removeLink();
                bezierTemp.setStartObj(null);
                bezierTemp.setEndObj(null);
                removeBezierFromList(bezierTemp);
                bezierTemp = null;
                break;
            }
        }
    }
    // out
    for(var j=0;j<block.outPt.length;j++){
        if(block.outPt[j]){
            for(var i=0;i<bezierArr.length;i++){
                if(block.outPt[j]==bezierArr[i].getStartObj()){
                    bezierTemp = bezierArr[i];
                    if(bezierTemp){
                        (bezierTemp.getStartObj()).setLink(null);
                        (bezierTemp.getStartObj()).removeLink();
                        (bezierTemp.getStartObj()).value = null;
                        (bezierTemp.getEndObj()).setLink(null);
                        (bezierTemp.getEndObj()).removeLink();
                        (bezierTemp.getEndObj()).value = null;
                        bezierTemp.setStartObj(null);
                        bezierTemp.setEndObj(null);
                        removeBezierFromList(bezierTemp);
                        bezierTemp = null;
                        i--;
                    }
                }
            }
        }
    }
    block = null;
}
var mouseCanDrag = false;
function render(timestamp){
	clear();

	// for bezier
	if(bezierTemp){
		bezierTemp.rend();
	}
	for(var i=0;i<bezierArr.length;i++){
		if(bezierTemp && bezierTemp==bezierArr[i]){
			continue;// already drawn, no need draw again
		}
		bezierArr[i].rend();

		// transfer value from outPt to inPt
		if(bezierArr[i].getStartObj() && bezierArr[i].getEndObj()){
		    bezierArr[i].getEndObj().value = bezierArr[i].getStartObj().value;
		    bezierArr[i].getEndObj().operation = bezierArr[i].getStartObj().operation;
		}
	}

	// move block
	for(var i=0;i<objArr.length;i++){
		objArr[i].rend();
        if(objArr[i].isClosed()){
		    removeBlockFromList(objArr[i]);
		}
	}

    // loop use requestAnimationFrame instead of setInterval
    requestAniFrame(render);
}
