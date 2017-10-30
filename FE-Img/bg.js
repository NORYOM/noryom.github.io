var bgCvs;
function drawGrid(mainCvs,width,height){
    var gridW = 20;
    if(!bgCvs){
    	bgCvs = document.createElement("canvas");
    }
    bgCvs.style.position = "absolute";
    bgCvs.style.border = "0px solid green";
    bgCvs.width = width;
    bgCvs.height = height;
    bgCvs.style.left = mainCvs.style.left;
    bgCvs.style.top = mainCvs.style.top;
    bgCvs.style.zIndex = -100;
    document.body.appendChild(bgCvs);
    var bgCtx = bgCvs.getContext("2d");
	bgCtx.save();
	for(var i=0;i<height;i++){
		for(var j=0;j<width;j++){
			bgCtx.fillStyle = "#999999";
			bgCtx.fillRect(i*(gridW+1),j*(gridW+1),gridW,gridW);
		}
	}
	bgCtx.restore();
}