function print_grid_a4()
{
    var width=160, height=240;
    document.write("<div id='testbox'>0</div>");
    for (i = 0; i < 8; i++)
        document.write("<div style=' height:" + height + "mm; left:" + (i * 20 + 5) + "mm;' class='vgrid10'></div>");
    for (i = 1; i < 16; i++)
        document.write("<div style=' height:" + height + "mm; left:" + (i * 10) + "mm;' class='vgrid05'><span>" + i + "</span></div>");
    document.write("<div style='height:" + height + "mm; left:" + (i * 10) + "mm;' class='vgrid05'><span style='color:#F63;'>&#9658;</span></div>");

    for (i = 0; i < 12; i++)
        document.write("<div style='width:" + width + "mm;  top:" + (i * 20 + 10) + "mm;' class='hgrid10'></div>");
    for (i = 1; i < 24; i++)
        document.write("<div style='width:" + width + "mm; top:" + (i * 10+5) + "mm;' class='hgrid05'><div><span>" + i + "</span></div></div>");
    document.write("<div style='width:" + width + "mm;  top:" + (i * 10+5) + "mm;' class='hgrid05'><div><span style='color:#F63;'>&#9660;</span></div></div>");

}

function print_grid_cm()
{
    document.write("<div id='testbox'>0</div>");
    var testbox = document.getElementById("testbox");
    var height = 0, width = 0;
    if (document.all)
    {
        height = document.body.offsetHeight;
        width = document.body.offsetWidth;
    }
    else
    {
        height = window.innerHeight;
        width = window.innerWidth;
    }
    var col_num = Math.floor(width / testbox.clientWidth * 10) - 1;
    if ((col_num % 2) == 0) col_num--;

    var row_num = Math.floor(height / testbox.clientHeight * 10) - 1;
    if ((row_num % 2) == 0) row_num--;

    height = row_num * 10;
    width = col_num * 10;

    for (i = 0; i < col_num / 2; i++)
        document.write("<div style=' height:" + height + "mm; left:" + (i * 20 + 5) + "mm;' class='vgrid10'></div>");
    for (i = 1; i < col_num; i++)
        document.write("<div style=' height:" + height + "mm; left:" + (i * 10) + "mm;' class='vgrid05'><span>" + i + "</span></div>");
    document.write("<div style='height:" + height + "mm; left:" + (i * 10) + "mm;' class='vgrid05'><span style='color:#F63;'>&#9658;</span></div>");

    for (i = 0; i < row_num / 2; i++)
        document.write("<div style='width:" + width + "mm;  top:" + (i * 20 + 10) + "mm;' class='hgrid10'></div>");
    for (i = 1; i < row_num; i++)
        document.write("<div style='width:" + width + "mm; top:" + (i * 10+5) + "mm;' class='hgrid05'><div><span>" + i + "</span></div></div>");
    document.write("<div style='width:" + width + "mm;  top:" + (i * 10+5) + "mm;' class='hgrid05'><div><span style='color:#F63;'>&#9660;</span></div></div>");
}

var posx;
var posy;
var zMax = 0;
var obj;
var oldClass = '';

function drag_start(itemToMove, e)
{
    itemToMove.style.zIndex = ++window.zMax;
    if (!e) e = window.event;
    obj = itemToMove;
    posx = e.clientX - parseInt(obj.style.left);
    posy = e.clientY - parseInt(obj.style.top);

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    obj.style.border = "solid #36f 1px";
    oldClass = obj.getAttribute('class');
    obj.setAttribute('class', oldClass + ' drag');
}

function drag_stop(e)
{
    if (obj)
    {
        obj.style.border = "solid #ccf 1px";
	obj.setAttribute('class', oldClass);
        obj = null;
    } else
    {

    }
}

function drag(e)
{
    if (!obj) return;

    if (!e) e = window.event;

    var height, width;
    if (document.all)
    {
        height = document.body.offsetHeight;
        width = document.body.offsetWidth;
    }
    else if (document.layers)
    {
        height = window.innerHeight;
        width = window.innerWidth;
    }
    var newX = e.clientX - posx;
    var newY = e.clientY - posy;
    if (newX < -obj.clientWidth / 2)
    {
        newX = -obj.clientWidth / 2;
        posx = e.clientX - parseInt(obj.style.left);
    }
    if (newY < -obj.clientHeight / 2)
    {
        newY = -obj.clientHeight / 2;
        posy = e.clientY - parseInt(obj.style.top);
    }

    obj.style.left = newX;
    obj.style.top = newY;

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
}

document.onmousemove = drag;
document.onmouseup = drag_stop;

document.ondragstart = function()
{
    return false;
}
document.onselectstart = function()
{
    return false;
}