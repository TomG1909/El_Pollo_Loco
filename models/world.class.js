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
    throwableObjects = [];
    endscreen = new Endscreen();
    EnemyIsAlive = true;





    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
        this.checkCollectedItems();
    }

    setWorld() {

        this.character.world = this;

    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectedItems();
            this.checkCollisionsEnemies();
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

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.EnemyIsAlive = false;
                enemy.hit();
                console.log('Enemy alive', this.EnemyIsAlive)

            }
        });
    }

    checkCollectedItems() {

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.countBottles();
                this.statusBarBottles.setPercentage(this.character.collectedBottles)
                this.level.bottles.splice(index, 1)

            }



        });

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


            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.enemies);
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