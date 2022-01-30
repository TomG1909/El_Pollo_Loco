class Coins extends MovableObject {

    width = 100;
    height = 100;

    IMAGES = [
        'img/8.Coin/Moneda1.png',
        'img/8.Coin/Moneda2.png'
    ]


    constructor() {
        super().loadImage('img/8.Coin/Moneda1.png');
        this.loadImages(this.IMAGES);
        this.y = 50 + Math.random() * 100;
        this.x = 500 + Math.random() * 1200;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }

}