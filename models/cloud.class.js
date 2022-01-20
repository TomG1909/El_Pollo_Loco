class Cloud extends MovableObject {

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png')

        this.width = 500;
        this.height = 250;
        this.x = Math.random() * 500;
        this.y = 50;
        this.animate();
    }
    animate() {
        this.moveLeft();
    }
}