// init() prepares any data for the scene
// preload() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and allows us to update game objects

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene"); //when we call menu we want to use phaser scene giving it menuScene
    }

    create() {
        this.add.text(20,20,"Rocket Patrol Menu");

        //change scenes
        this.scene.start("playScene");
    }
}

