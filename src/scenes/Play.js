class Play extends Phaser.Scene {
    constructor() {
        super("playScene"); //when we call menu we want to use phaser scene giving it menuScene
    }

    create() {
        this.add.text(20,20,"Rocket Patrol Play");
    }
}