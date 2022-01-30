class ThrowableObject extends MovableObject {

    IMAGES_BOTTLE = [

        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png'


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

    animate() {

        setInterval(() => {

            if (this.throw) {

                this.playAnimation(this.IMAGES_BOTTLE);
            }

        }, 160)
    }
}

class ThrowableChicken extends MovableObject {
    IMAGES_CHICKEN = [

        'img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'

    ]

    constructor(x, y) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png')
        this.loadImages(this.IMAGES_CHICKEN)

        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;

        this.throw();
        this.animate();




    }

    throw () {

        this.speedY = 5;
        this.applyGravity();
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }

    animate() {

        setInterval(() => {

            if (this.throw) {

                this.playAnimation(this.IMAGES_CHICKEN);
            }


        }, 260)
    }
}