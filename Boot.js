var Starward = Starward || {};
Starward.Boot = function(game) {};

Starward.Boot.prototype = {
	
	preload: function() {
        this.load.image('preloadBar', 'assets/loader_bar.png');
    },

	create: function() {

		this.stage.backgroundColor = '#fff';
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
	}
	
};