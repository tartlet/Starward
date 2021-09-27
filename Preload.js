var Starward = Starward || {};

Starward.Preload = function(game) {
    this.money;
};

Starward.Preload.prototype = {
    preload: function() {
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.tilemap('tilemap1', 'assets/level1.csv', null, Phaser.Tilemap.CSV);
    this.load.image('tileset1', 'assets/TileMap.png');
    this.load.image('level1bg', 'assets/sky.png');
    this.load.spritesheet('player', 'assets/forgotten.png', 32, 32);
    this.load.spritesheet('chest', 'assets/chest.png', 32, 32);

    },

    create: function() {
        this.state.start('Game');
    }
};