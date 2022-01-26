class Bottle extends MovableObject {

    IMAGES = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES)
        let position = Math.random() * 1; //Zahl zwischen 0 und 1
        let positionRounded = Math.round(position); // rundet auf ganze Zahl
        this.loadImage(this.IMAGES[positionRounded]); // Bild an der Stelle 0 oder 1
        this.y = 325;
        this.x = 300 + Math.random() * 1000;
        this.height = 100;
        this.width = 100;

    }

}