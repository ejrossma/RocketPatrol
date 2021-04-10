class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.points = pointValue; //store pointValue
        this.movespeed = game.settings.spaceshipSpeed; //pixels per frame
    }

    update() {
        //move spaceship left
        this.x -= this.movespeed;
        //wrap around from left to right edge
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}