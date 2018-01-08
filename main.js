function setup()
{
    createCanvas(800, 600);
}

function draw()
{
    if (mouseIsPressed && !keyIsDown(SHIFT))
    {
        fill(0);
        ellipse(mouseX, mouseY, 10, 10);
    }
    else if (keyIsDown(SHIFT) && mouseIsPressed)
    {
        fill(255);
        ellipse(mouseX, mouseY, 10, 10);

    }
}