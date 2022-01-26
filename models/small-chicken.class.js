class SmallChicken extends MovableObject {
    y = 370;
    height = 60;
    speed = 20;
    energy = 2;
    IMAGES = [

        'img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'

    ]

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png')
        this.loadImages(this.IMAGES)
        this.x = 2200 + Math.random() * 1200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();

    }

    animate() {

        setInterval(() => {
            if (this.moveLeft) {
                this.playAnimation(this.IMAGES);
            }
        }, 100);
        setInterval(() => {

            if (this.isDead()) {
                this.loadImage('img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png')
            } else {
                this.moveLeft();
            }

        });

    }
}