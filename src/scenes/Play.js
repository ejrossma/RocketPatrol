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

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.starfield.tilePositionX -= starspeed;

        // update rocket
        this.p1Rocket.update();
    }
}