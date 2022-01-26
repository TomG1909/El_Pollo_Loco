class StatusBarBottles extends DrawableObject {

    IMAGES_BOTTLE_BAR = [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png'
    ]

    percentage = 0;

    constructor() {
        super().loadImage('img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png'); //Methoden von übergeordneten Objekt aufrufen
        this.x = 0;
        this.y = 40;
        this.width = 180;
        this.height = 50;
        this.loadImages(this.IMAGES_BOTTLE_BAR);
        this.setPercentage(0);

    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];


    }
    resolveImageIndex() {
        if (this.percentage == 6) {
            return 5;
        } else if (this.percentage > 4) {
            return 4;
        } else if (this.percentage > 3) {
            return 3;
        } else if (this.percentage > 2) {
            return 2;
        } else if (this.percentage >= 1) {
            return 1;
        } else {
            return 0;
        };
    }
}