class StatusBarCoins extends DrawableObject {

    IMAGES_COINS = [

        'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png'
    ]
    percentage = 0;

    constructor() {
        super().loadImage('img/7.Marcadores/Barra/Marcador moneda/azul/0_.png'); //Methoden von übergeordneten Objekt aufrufen
        this.x = 0;
        this.y = 80;
        this.width = 180;
        this.height = 50;
        this.loadImages(this.IMAGES_COINS);
        this.setPercentage(0);

    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];


    }
    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage < 8) {
            return 4;
        } else if (this.percentage < 6) {
            return 3;
        } else if (this.percentage < 4) {
            return 2;
        } else if (this.percentage < 2) {
            return 1;
        } else if (this.percentage < 0) {
            return 0;
        };
    }

}