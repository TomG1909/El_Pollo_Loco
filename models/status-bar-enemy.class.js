class StatusBarEnemy extends DrawableObject {

    IMAGES_ENEMY_BAR = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'
    ]

    percentage = 10;

    constructor() {
        super().loadImage('img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png'); //Methoden von übergeordneten Objekt aufrufen
        this.x = 500;
        this.y = 0;
        this.width = 180;
        this.height = 50;
        this.loadImages(this.IMAGES_ENEMY_BAR);
        this.setPercentage(10);


    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENEMY_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];


    }
    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage >= 8) {
            return 4;
        } else if (this.percentage >= 6) {
            return 3;
        } else if (this.percentage >= 4) {
            return 2;
        } else if (this.percentage >= 2) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        };
    }
}