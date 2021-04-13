class SmallSpaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.points = pointValue; //store pointValue
        this.movespeed = game.settings.smallSpaceshipSpeed; //pixels per frame
        this.count = 0; //when to change direction
        this.upwards = -1; //direction
    }

    update() {
        //move spaceship left
        this.x += this.movespeed;
        if (this.count++ % 50 === 0) {
            this.upwards *= -1;
        }
        this.y += this.upwards;
        //wrap around from left to right edge
        if (this.x >= game.config.width - this.width) {
            this.reset();
        }
    }

    //position reset
    reset() {
        this.x = 0;
    }
}