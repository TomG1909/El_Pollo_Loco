class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEnemy = new StatusBarEnemy()
    throwableObjects = [];
    throwableChickens = [];
    endscreen = new Endscreen();
    winscreen = new WinnerScreen();
    endboss = level1.endboss[0];
    iconEnemyBar = new IconEnemyBar();
    reloading = false;
    bottle_sound = new Audio('audio/bottle.mp3');
    coin_sound = new Audio('audio/coins.mp3');
    chicken_sound = new Audio('audio/chicken.mp3');





    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.shootChicken();




    }

    setWorld() {

        this.character.world = this;

    }

    run() {
        setInterval(() => {

            this.checkThrowObjects();
            this.checkCollectedBottles();
            this.checkCollectedCoins();
            this.checkCollisionsEnemies();
            this.hurtBoss();
            this.hurtCharacter();



        }, 200);

    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 120);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles -= 1;
            this.statusBarBottles.setPercentage(this.character.collectedBottles);
            console.log('my bottles', this.character.collectedBottles);

        }
    }

    bossAttack() {

        if (this.character.x > 4000) {
            let chicken = new ThrowableChicken(this.endboss.x + 100 + (Math.random() * 200), this.endboss.y + 220);
            this.throwableChickens.push(chicken);

        }
    }

    shootChicken() {

        this.bossAttack();
        let time = 1000 * Math.random();
        setTimeout(() => {
            this.shootChicken();
        }, time)

    }

    checkCollisionsEnemies() {

        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !this.character.isHurt()) {
                    enemy.hit();
                    this.chicken_sound.play();
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);

                    console.log('energy chicken', enemy.energy)

                }



            }
        });
    }
    hurtBoss() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.endboss.isColliding(bottle) && !this.endboss.isDead()) {
                this.endboss.hit();
                this.chicken_sound.play();
                this.throwableObjects.splice(index, 1);
                this.statusBarEnemy.setPercentage(this.endboss.energy);

            } else if (this.endboss.passedTimeDeath()) {
                setTimeout(() => {
                    this.gameEnds()
                }, 1000);

            }

        });
    }

    hurtCharacter() {
        this.throwableChickens.forEach((chicken) => {
            if (this.character.isColliding(chicken) && !this.character.isDead()) {
                this.character.hit();

                this.statusBar.setPercentage(this.character.energy);
            }


        });

    }


    checkCollectedBottles() {

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.countBottles();
                this.bottle_sound.play();
                this.statusBarBottles.setPercentage(this.character.collectedBottles)
                this.level.bottles.splice(index, 1)

            }



        });
    }
    checkCollectedCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.character.isAboveGround()) {
                this.character.countCoins();
                this.coin_sound.play();
                this.statusBarCoins.setPercentage(this.character.coins)
                this.level.coins.splice(index, 1)

            }

        })


    }



    gameEnds() {

        document.getElementById('btn-replay').classList.remove('d-none');


    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        if (this.character.isDead()) {
            this.addToMap(this.endscreen);
        } else if (this.endboss.passedTimeDeath()) {

            this.addToMap(this.winscreen);






        } else {
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);

            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            this.ctx.translate(this.camera_x, 0);

            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBarCoins);
            this.ctx.translate(this.camera_x, 0);

            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBarBottles);
            this.ctx.translate(this.camera_x, 0);
            if (this.character.x > 4200) {
                this.ctx.translate(-this.camera_x, 0);
                this.addToMap(this.statusBarEnemy);
                this.ctx.translate(this.camera_x, 0);

                this.ctx.translate(-this.camera_x, 0);
                this.addToMap(this.iconEnemyBar);
                this.ctx.translate(this.camera_x, 0);
            }

            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.endboss);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.coins);
            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.throwableChickens);
            this.ctx.translate(-this.camera_x, 0);



            let self = this;
            requestAnimationFrame(function() {
                self.draw();
            });
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}