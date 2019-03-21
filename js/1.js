
$(document).ready(function(){ 

  $("img.pic").click(function() {

   var cur_img = this.id;

   $("#pic_m").fadeOut(500);

   window.setTimeout("$(\"#pic_m\").empty();", 500);  

   window.setTimeout(function() {

    $("#pic_m").append("<img id=\"" + cur_img + "_view\" src=\"img_b/" + cur_img + ".bmp>");

   }, 500);

   $("#" + cur_img + "_view").load(function() { $("#pic_m").fadeIn(500); });

  });

});
