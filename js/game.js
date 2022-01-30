let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let reloading = false;




function init() {
    if (!gameRunning) {
        document.getElementById('btn').blur(); // take keybord focus from Button
        document.getElementById('btn').classList.add('d-none');
        document.getElementById('start').classList.add('d-none');
        document.getElementById('canvas').classList.remove('d-none');


        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
        gameRunning = true;
    }
    console.log('My character is', world.character);

}

function reloadGame() {
    if (!this.reloading) {
        this.reloading = true;
        location.reload();
    }
}

function fullScreen() {
    screen = document.getElementById("canvas")
    if (!screen.fullscreenElement) {
        screen.requestFullscreen()
    } else {
        {
            screen.exitFullscreen()
        }
    }

}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == '38') {
        keyboard.UP = true;
        // up arrow
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = true
            // down arrow
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = true
            // left arrow
    }
    if (e.keyCode == '39') {
        keyboard.RIGHT = true
            // right arrow
    }
    if (e.keyCode == '32') {
        keyboard.SPACE = true
            // Space
    }
    if (e.keyCode == '68') {
        keyboard.D = true
            // D
    }

    /*console.log(e);*/
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == '38') {
        keyboard.UP = false;
        // up arrow
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = false;
        // down arrow
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = false;
        // left arrow
    }
    if (e.keyCode == '39') {
        keyboard.RIGHT = false;
        // right arrow
    }
    if (e.keyCode == '32') {
        keyboard.SPACE = false;
        // Space
    }
    if (e.keyCode == '68') {
        keyboard.D = false;
        // D
    }

    /*console.log(e);*/
});

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {

    } else if (e.keyCode == '40') {
        // down arrow
    } else if (e.keyCode == '37') {
        // left arrow
    } else if (e.keyCode == '39') {
        // right arrow
    }

}