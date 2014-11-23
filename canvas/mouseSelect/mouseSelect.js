/**
 * Created by Administrator on 2014-11-23.
 */
;//分号为了保证代码合并时不出错
(function(win){
     "use strict";
      var doc = win.document,cvs = doc.querySelector("#canvas"),
       selector = doc.getElementById("selector"),
       restBtn = doc.getElementById("resetBtn"),
       ctx = cvs.getContext("2d"),
       img = new Image(),width = cvs.width,height = cvs.height,msdown = {},selectRect = {},dragging = false;

       var _functions = {
           //选取开始
           selectStart : function(x,y) {
               msdown.x = x;//鼠标按下横坐标
               msdown.y = y;
               selectRect.left = msdown.x;
               selectRect.top = msdown.y;//
               this.moveSelector();//移动选取框
               this.showSelector();//显示选取框
               dragging = true;//
           },
           //移动选取框
           moveSelector: function () {
               selector.style.top = selectRect.top + "px";
               selector.style.left = selectRect.left + "px";

           },
           //显示选取框
           showSelector:function(){
               selector.style.display = "inline";
           },
           //展开选取框
           selectorStretch:function(x,y){
               selectRect.left = Math.min(x,msdown.x);
               selectRect.top = Math.min(y,msdown.y);
               selectRect.width = Math.abs(x - msdown.x);
               selectRect.height = Math.abs(y-msdown.y);
               this.moveSelector();//移动选取框
               this.resizeSelector();//重设选取框

           },
           //重设选取框大小
           resizeSelector:function(){
               selector.style.width = selectRect.width + "px";
               selector.style.height = selectRect.height + "px";
           },
           //重置选取框
           resetSelector:function(){
              selectRect = {top:0,left:0,width:0,height:0};
           },
           //选取结束
           selectEnd:function(){
               var _box = cvs.getBoundingClientRect();
               try{
                   ctx.drawImage(cvs,selectRect.left-_box.left,selectRect.top-_box.top,selectRect.width,selectRect.height,0,0,width,height);
               }catch (e){
               }
               this.resetSelector();
               selector.style.width = 0;
               selector.style.height = 0;
               this.hideSelector();
               dragging = false;
           },
           hideSelector:function(){
               selector.style.display = "none";
           }
       }

       cvs.onmousedown = function(e){
           var x = e.clientX,y = e.clientY;
           e.preventDefault();//阻止浏览器默认事件
           _functions.selectStart.call(_functions,x,y);
       }
       win.onmousemove  = function(e){
           var x = e.clientX,y = e.clientY;
           e.preventDefault();
           if(dragging){
               _functions.selectorStretch.call(_functions,x,y);
           }
       }
       win.onmouseup = function(e){
           e.preventDefault();
           _functions.selectEnd.call(_functions);
       }
       img.onload = function(){
           ctx.drawImage(img,0,0,width,height);
       }
       restBtn.onclick = function(e){
           ctx.clearRect(0,0,width,height);
           ctx.drawImage(img,0,0,width,height);
       }
       img.src = "img.jpg";
})(window);