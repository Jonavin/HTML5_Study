/**
 * Created by Administrator on 2014-11-22.
 *
 */
;
(function(win){
    //局部变量（这样定义变量会增加链深，但管理集中
    var doc = win.document,_cvs = doc.getElementById("canvas");
    var prop = {
        cvs:_cvs,
        readout:doc.getElementById("readout"),
        width:_cvs.width,//
        height:_cvs.height,
        ctx:_cvs.getContext("2d"),
        imgsheet:new Image()//显示结果的表
    };
    var _functions = {
        //窗口坐标转为换cvs坐标
        winPos2CvsPos:function(cvs,_x,_y){
            var _box = cvs.getBoundingClientRect();//获得cvs元素相对于浏览器圆点的坐标
            return {
                x:_x-_box.left*(cvs.width/_box.width),
                y:_y-_box.top*(cvs.height/_box.height)
            }
        },
        //画背景
        drawBg:function(){
            var VERTICAL_LINE_SPACING = 12,i = prop.height,ctx = prop.ctx;
            ctx.clearRect(0,0,prop.width,prop.height);//清空画布
            ctx.strokeStyle = 'lightgray';
            ctx.lineWidth = 0.5;
            while(i>VERTICAL_LINE_SPACING*4){
                ctx.beginPath();//开始作画
                ctx.moveTo(0,1);//移动圆点
                ctx.lineTo(prop.width,i);
                ctx.stroke();
                i-=VERTICAL_LINE_SPACING;
            }
        },
        //画表
        drawImgSheet: function () {
            prop.ctx.drawImage(prop.imgsheet,0,0);
        },
        //画导航线
        drawGuideLines:function(x,y){
            prop.ctx.strokeStyle='lightblue';
            prop.ctx.lineWidth=1;
            this.drawVerticalLine(x);
            this.drawHorizontalLine(y);
        },
        //更新显示结果
        updateReadout: function (x,y) {
            prop.readout.innerText = '('+ x.toFixed(0)+','+ y.toFixed(0)+')';
        },
        //画水平线
        drawHorizontalLine:function(y){
            prop.ctx.beginPath();
            prop.ctx.moveTo(0,y+.5);
            prop.ctx.lineTo(prop.width,y+.5);
            prop.ctx.stroke();
        },
        //画垂直线
        drawVerticalLine: function (x) {
            prop.ctx.beginPath();
            prop.ctx.moveTo(x +.5,0)
            prop.ctx.lineTo(x +.5,prop.height);
            prop.ctx.stroke();
        }
    }
    //鼠标滑过画布
    prop.cvs.onmousemove = function(e){
        var _loc = _functions.winPos2CvsPos.call(_functions,_cvs, e.clientX, e.clientY);
        _functions.drawBg.call(_functions);
        _functions.drawImgSheet.call(_functions);
        _functions.drawGuideLines.call(_functions,_loc.x,_loc.y);
        _functions.updateReadout.call(_functions,_loc.x,_loc.y);
    }
    //初始化
    prop.imgsheet.src = "img.jpg";
    prop.imgsheet.onload = function(){
        _functions.drawImgSheet.call(_functions);
    }
    _functions.drawBg.call(_functions);//调用
})(window);
