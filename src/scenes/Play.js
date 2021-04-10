// init() prepares any data for the scene
// preload() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and allows us to update game objects

class Play extends Phaser.Scene {
    constructor() {
        super("playScene"); //when we call menu we want to use phaser scene giving it menuScene
    }

    preload() {
        // load images + tile sprites
        this.load.image('rocket', './assets/rocket.png'); //key + file location
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() { //whatever is made first gets put furthest back
        //scrolling starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height,
        'starfield').setOrigin(0,0);
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        borderUISize * 2, 0x00FF00).setOrigin(0,0); //x,y, width,height
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, 
        borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, 
        game.config.height, 0xFFFFFF).setOrigin(0,0);
        
        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - 
        borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, 
        borderUISize * 4,'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, 
        borderUISize * 5 + borderPadding * 2,'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4,
        'spaceship', 0, 10).setOrigin(0,0);
        

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
    }

    update() {
        this.starfield.tilePositionX -= starspeed;

        // update rocket
        this.p1Rocket.update();

        //update spaceship
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        //check collision
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        //temporarily hide the ship
        ship.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
    }
}