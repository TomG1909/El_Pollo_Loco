class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    collectedBottles = 0;
    coins = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else
            return this.y < 110;
    }





    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {

        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 5;


    }


    isDead() {
        return this.energy == 0;


    }

    countBottles() {

        if (this.collectedBottles > 5) {
            this.collectedBottles = 5;

        } else {
            this.collectedBottles += 1;
        }

    }

    countCoins() {

        if (this.coins > 10) {
            this.coins = 10;
        } else {
            this.coins += 1;


        }

    }




    moveRight() {

        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {

        this.x -= this.speed;

    }

    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImg++;

    }
    jump() {
        this.speedY = 20;


    }
}