var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];

// var meowImage = new Image();
// meowImage.src = "https://static.pexels.com/photos/34950/pexels-photo.jpg";

// canvas.width = 1280;
// canvas.height = 720;
canvas.width = dimension[0];
canvas.height = dimension[1];

function Cube(x, y, width, height, speed, color)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speed;
    this.speedY = speed;
    this.color = color;

    this.draw = function ()
    {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height)
    }

    this.update = function (move = true)
    {
        if (move == true)
        {
            if (this.x > canvas.width - this.width || this.x < 0)
                this.speedX = -this.speedX;
            this.x += this.speedX;

            if (this.y > canvas.height - this.height || this.y < 0)
                this.speedY = -this.speedY;
            this.y += this.speedY;

        }

        this.draw();

    }
}

// function getMousePosition(e)
// {
//     var mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
//     var mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
//     return { x: mouseX, y: mouseY };
// }



var canvasPos = getPosition(canvas);
var mouseX = 0;
var mouseY = 0;

canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e)
{
    mouseX = e.clientX - canvasPos.x;
    mouseY = e.clientY - canvasPos.y;
}

// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

function updatePosition()
{
    canvasPos = getPosition(canvas);
    dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    canvas.width = dimension[0];
    canvas.height = dimension[1];
    drawGrid();
}

// Helper function to get an element's exact position
function getPosition(el)
{
    var xPos = 0;
    var yPos = 0;

    while (el)
    {
        if (el.tagName == "BODY")
        {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        }
        else
        {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}


// var cube1 = new Cube(20, 20, 20, 20, 20, 'red');
// var cube2 = new Cube(300, 300, 100, 100, 20, 'blue');
// var cube3 = new Cube(250, 100, 10, 10, -3.1, 'orange');
// var cube4 = new Cube(100, 100, 10, 10, 3.1, 'cyan');
// var cube5 = new Cube(100, 500, 15, 100, 5, 'purple');
// var cube6 = new Cube(700, 100, 100, 10, 5, 'green');

var cubeList = [
    new Cube(20, 20, 20, 20, 20, 'red'),
    new Cube(50, 20, 20, 20, 20, 'blue'),
    new Cube(300, 300, 100, 100, 20, 'blue'),
    new Cube(250, 100, 10, 10, -3.1, 'orange'),
    new Cube(100, 100, 10, 10, 3.1, 'cyan'),
    new Cube(100, 500, 15, 100, 5, 'purple'),
    new Cube(700, 100, 100, 10, 5, 'green')];



function updateObjects()
{
    for (let i = 0; i < cubeList.length; i++)
    {
        cubeList[i].update();
    }
    // cube1.update();
    // cube2.update();
    // cube3.update(false);
    // cube4.update();
    // cube5.update();
    // cube6.update();
}

function getDistance(x1, y1, x2, y2)
{
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function checkColision(obj1, obj2)
{
    if (obj1.x + obj1.width < obj2.x || obj1.x > obj2.x + obj2.width ||
        obj1.y + obj1.height < obj2.y || obj1.y > obj2.y + obj2.height)
    {
        obj1.color = 'green';
        obj2.color = 'green';
    }
    else
    {
        obj1.color = 'red';
        obj2.color = 'red';
    }

}

var step = 50;
function drawGrid()
{
    // c.fillStyle = 'rgba(100,155,255,1)';
    // c.fillRect(0, 0, canvas.width, canvas.height);
    // for (let i = 0; i < canvas.width; i += step)
    // {
    //     for (let j = 0; j < canvas.height; j += step)
    //     {
    // c.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    // c.fillStyle =
    // 'rgba(' + Math.round(Math.random() * 255) +
    // ',' + Math.round(Math.random() * 255) +
    // ',180,1)';
    // c.fillStyle = 'rgba(47,48,65,1)';
    // c.fillRect(i, j, i + step, j + step);
    // }
    // }

    //testing something , also drawing all the screen at once instead of drawing pixel by pixel
    c.fillStyle = 'rgba(47,48,65,1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
}
// setInterval(drawGrid, 500);
drawGrid();

function animate()
{
    requestAnimationFrame(animate);
    expandFire();
    // drawGrid();
    // var distance = getDistance(cube3.x, cube3.y, cube4.x, cube4.y);
    // cubeList[2].x = mouseX - cubeList[2].width / 2;
    // cubeList[2].y = mouseY - cubeList[2].height / 2;
    // for (let i = 0; i < cubeList.length - 1; i++)
    // {
    //     checkColision(cubeList[i], cubeList[i + 1]);

    // }
    // c.drawImage(meowImage, 0, 0, 1000, 800);
    // updateObjects();
}

animate();

canvas.addEventListener("mousemove", drawCubeAtMousePos, false);

function drawCubeAtMousePos(e)
{
    c.fillStyle = 'rgba(74,78,105,1)';
    var aX = Math.floor(Math.floor(mouseX) % step);
    var aY = Math.floor(Math.floor(mouseY) % step);
    var drawPositionX = Math.floor(mouseX) - aX;
    var drawPositionY = Math.floor(mouseY) - aY;

    c.fillRect(drawPositionX, drawPositionY, step, step, 1);

}

function expandFire()
{
    for (let i = 0; i < canvas.width; i += step)
    {
        for (let j = 0; j < canvas.height; j += step)
        {
            var pixelData = c.getImageData(i, j, 1, 1).data;
            if (pixelData[0] == 74)
            {
                // c.fillStyle = 'rgba(203,23,23,23)';
                // c.fillRect(i, j, step, step, 1);
                if (c.getImageData(i - step, j, 1, 1).data[0] == 47)
                {
                    c.fillStyle = 'rgba(78,78,105,1)';
                    c.fillRect(i - step, j, step, step, 1);
                }
                if (c.getImageData(i + step, j, 1, 1).data[0] == 47)
                {
                    c.fillStyle = 'rgba(78,78,105,1)';
                    c.fillRect(i + step, j, step, step, 1);
                }
                if (c.getImageData(i, j - step, 1, 1).data[0] == 47)
                {
                    c.fillStyle = 'rgba(78,78,105,1)';
                    c.fillRect(i, j - step, step, step, 1);
                }
                if (c.getImageData(i, j + step, 1, 1).data[0] == 47)
                {
                    c.fillStyle = 'rgba(78,78,105,1)';
                    c.fillRect(i, j + step, step, step, 1);
                }
            }
        }
    }
    for (let i = 0; i < canvas.width; i += step)
    {
        for (let j = 0; j < canvas.height; j += step)
        {
            var pixelData = c.getImageData(i, j, 1, 1).data;
            if (pixelData[0] == 78)
            {
                c.fillStyle = 'rgba(74,78,105,1)';
                c.fillRect(i, j, step, step, 1);
            }
        }
    }
}

// setInterval(expandFire, 50);

canvas.addEventListener("mousedown", expandFire, false);
