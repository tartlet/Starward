var Starward = Starward || {};

Starward.Preload = function(game) {
    this.money;
};

Starward.Preload.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.tilemap('tilemap1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset1', 'assets/tilemap_64px.png');
        this.load.spritesheet('player', 'assets/forgottenv2_64px.png', 64, 64);
        
        
        
        // Load the player's attacking spritesheet below
        this.load.image('playerAttack', 'assets/PlayerBasicAttack.png', 32, 32);
        
        this.load.spritesheet('chest', 'assets/chest.png', 32, 32);
    
        // Load the enemy sprites below
        this.load.image('basicEnemy', 'assets/BasicEnemySprite.png', 32, 32);
        
        // Load the enemy danger squares below
        this.load.image('dangerSquare', 'assets/DangerSquare.png', 32, 32);
        
        
        
    },

    create: function() {
        this.state.start('Game');
    }
};