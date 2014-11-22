/**
 * Created by Administrator on 2014-11-22.
 */
(function(win){
   var doc = win.document,cvs = doc.getElementById("canvas"),ctx = cvs.getContext("2d"),
       WIDTH = cvs.width,HEIGHT = cvs.height,
       FONT_HEIGHT=3,MARGIN=160,HAND_TRUNCATION = WIDTH/10,
       HOUR_HAND_TRUNCTION = WIDTH/10,NUMERAL_SPACING = 20,
       RADIUS = WIDTH/2-MARGIN,HAND_RADIUS=RADIUS+NUMERAL_SPACING,
       numerals = [1,2,3,4,5,6,7,8,9,10,11,12];

    /**
     * 画图函数
     * @type {{}}
     */
    var _functions = {
        //画外层圆形
        drawCircle:function(){
            ctx.beginPath();//开始路径
            ctx.arc(WIDTH/2,HEIGHT/2,RADIUS,0,Math.PI*2,true);
            ctx.stroke();
        },
        //画钟表刻度
        drawNumerals:function(){
            var angle = 0,numeralWidth = 0;
            numerals.forEach(function(numeral){
                angle = Math.PI/6*(numeral-3);
                numeralWidth = ctx.measureText(numeral).width;
                ctx.fillText(numeral,WIDTH/2+Math.cos(angle)*(HAND_RADIUS)-numeralWidth/2,HEIGHT/2+Math.sin(angle)+(HAND_RADIUS)+FONT_HEIGHT/3);
            });
        },
        //画中间圆心
        drawCenter:function(){
            ctx.beginPath();
            ctx.arc(WIDTH/2,HEIGHT/2,5,0,Math.PI*2,true);
            ctx.fill();//实心
        },
        //画钟表指针
        drawHand:function(loc,isHour){
            var angle = (Math.PI*2)*(loc/60)-Math.PI/ 2,
                handRadius = isHour?RADIUS-HAND_TRUNCATION-HOUR_HAND_TRUNCTION:RADIUS-HAND_RADIUS;
            ctx.moveTo(WIDTH/2,HEIGHT/2);//改变圆点坐标
            ctx.lineTo(WIDTH/2+Math.cos(angle)*handRadius,HEIGHT/2+Math.sin(angle)*handRadius);
            ctx.stroke();
        },
        //画所有的钟表指针
        drawHands:function(){
            var _d = new Date,_h = _d.getHours(),
                _h = _h>12?_h-12:_h;
            this.drawHand(_h*5+(_d.getMinutes()/60)*5,true);
            this.drawHand(_d.getMinutes(),false);
            this.drawHand(_d.getSeconds(),false);
        },
        //画钟表主函数
        drawClock: function () {
            ctx.clearRect(0,0,WIDTH,HEIGHT);//清空画布
            this.drawCircle();
            this.drawCenter();
            this.drawHands();
            //this.drawNumerals();
        }
    }

    ctx.font = FONT_HEIGHT+"px";
    loop = setInterval(function(){
        _functions.drawClock.call(_functions);
    },1000);
})(window);
