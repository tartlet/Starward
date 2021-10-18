var Starward = Starward || {};
Starward.Boot = function() {};

Starward.Boot.prototype = {
	
	preload: function() {
		this.load.image("background", "assets/startMenuBackground.png");
		this.load.image("startButton", "assets/startButton.png");
		this.load.image("tutorialButton", "assets/tutorialButton.png");
    },

	create: function() {
		background = this.add.sprite(0, 0, 'background');
		// startButton = this.add.sprite(384, 360, 'startButton');
		var tutorialButton = this.add.button(384, 470, 'tutorialButton', tutorial());
		tutorialButton.scale.setTo(.8);
		tutorialButton.anchor.set(.5,.5);

		var startButton = this.add.button(384, 360, "startButton", startGame)
		startButton.scale.setTo(.8);
		startButton.anchor.set(.5,.5);

		function startGame(){
			game.state.start('Preload');
		}

		function tutorial(){
			//game.state.start('tutorial');
		}

	

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	
};