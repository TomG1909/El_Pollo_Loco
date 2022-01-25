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
    endscreen = new Endscreen();
    EnemyIsAlive = true;
    endboss = level1.endboss[0];
    iconEnemyBar = new IconEnemyBar();






    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {

        this.character.world = this;

    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectedBottles();
            this.checkCollectedCoins();
            this.checkCollisionsEnemies();
            this.hurtBoss();

        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0 && !this.endboss.isHurt()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 120);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles -= 1;
            this.statusBarBottles.setPercentage(this.character.collectedBottles);
            console.log('my bottles', this.character.collectedBottles);

        }
    }

    checkCollisions() {

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.EnemyIsAlive) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('energy character', this.character.energy)


            }
        });
    }
    checkCollisionsEnemies() {

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.EnemyIsAlive = false;
                enemy.hit();
                console.log('Enemy alive', this.EnemyIsAlive)

            }
        });
    }
    hurtBoss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle) && !this.endboss.isHurt()) {
                this.endboss.hit();
                this.statusBarEnemy.setPercentage(this.endboss.energy);
                console.log('Boss energy', this.endboss.energy);

            }

        });
    }


    checkCollectedBottles() {

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.countBottles();
                this.statusBarBottles.setPercentage(this.character.collectedBottles)
                this.level.bottles.splice(index, 1)

            }



        });
    }
    checkCollectedCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.character.isAboveGround()) {
                this.character.countCoins();
                this.statusBarCoins.setPercentage(this.character.coins)
                this.level.coins.splice(index, 1)

            }

        })


    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        if (this.character.isDead()) {
            this.addToMap(this.endscreen);
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
            if (this.character.x > 1400) {
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