let canvas = document.getElementById('canId')
let ctx = canvas.getContext('2d')


/*
let image = new Image()
image.src = 'JavaTool.jpg'
image.addEventListener('load', function() {
    ctx.drawImage(image, 50, 5, 500, 400)
}, false);







/*
ctx.beginPath()
ctx.arc(75,75,50,0,Math.PI*2,true);
ctx.moveTo(110,75);
ctx.arc(75,75,35,0,Math.PI,false);
ctx.moveTo(65,65);
ctx.arc(60,65,5,0,Math.PI*2,true);
ctx.moveTo(95,65);
ctx.arc(90,65,5,0,Math.PI*2,true);
ctx.stroke();




/*
ctx.moveTo(10, 50)
ctx.lineTo(50, 10)
ctx.lineTo(50, 90)
ctx.fill()

/*
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 == 0) {
            let x = 25 + col * 50;
            let y = 25 + row * 50;
            ctx.fillRect(x, y, 50, 50);
        }
    }
}
*/
