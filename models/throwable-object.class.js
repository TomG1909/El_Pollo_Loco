class ThrowableObject extends MovableObject {
    lastThrow = 0;
    IMAGES_BOTTLE = [

        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'

    ]

    constructor(x, y) {
        super().loadImage('img/6.botella/1.Marcador.png');
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw()
        this.animate();



    }

    throw () {

        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
    lastThrow() {
        let timepassed = new Date().getTime() - this.lastThrow; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 3;

    }

    animate() {

        setInterval(() => {

            if (this.throw) {

                this.playAnimation(this.IMAGES_BOTTLE);
            }

        }, 100)
    }
}