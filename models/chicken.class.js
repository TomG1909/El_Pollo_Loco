class Chicken extends MovableObject {
    y = 370;
    height = 60;
    speed = 20;
    energy = 2;
    lastHit = 0;

    IMAGES_WALKING = [


        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'

    ]



    constructor() {
        super().loadImages(this.IMAGES_WALKING);
        this.loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png')
        this.x = 500 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();


    }

    animate() {

        setInterval(() => {
            if (this.moveLeft) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        setInterval(() => {

            if (this.isDead()) {
                this.loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png')
            } else {
                this.moveLeft();
            }

        });

    }



}