class DrawableObject {
    img;
    imageCache = {};
    currentImg = 0;
    x = 120;
    y = 280;
    width = 100;
    height = 150;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);


    }



    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.style = 'transform: scaleX(-1)'
            img.src = path;
            this.imageCache[path] = img;

        });
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coins) {
            ctx.beginPath();
            ctx.lineWidth = "0";
            ctx.strokeStyle = "transparent";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }



}