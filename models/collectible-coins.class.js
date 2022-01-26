class Coins extends MovableObject {
    direction = -1
    rotationTimer;
    width = 100;
    height = 100;




    constructor() {
        super().loadImage('img/8.Coin/Moneda1.png')

        this.y = 50 + Math.random() * 100;
        this.x = 500 + Math.random() * 1200;
        this.animate();
    }


    animate() {
        this.rotationTimer = setInterval(() => {
            this.width += 1 * this.direction;
            if (this.width == 0) { this.direction *= -1 }
            if (this.width == 100) { this.direction *= -1 }
        })
    }

}