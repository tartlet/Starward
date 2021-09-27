var Starward = Starward || {};

Starward.Game = function () {};
var total = 0;

Starward.Game.prototype = {
    
    create: function () {
        timer = this.time.create();
        map = this.add.tilemap('tilemap1');
        tileset = map.addTilesetImage('tset1', 'tileset1');
        this.layer = map.createLayer(0,'toplayer', tileset);
        player = this.add.sprite(0, 128, 'player');
        // player.enableBody = true;
        this.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        this.countdown = this.add.text('$: ' + this.money, 10);
        player.animations.add('idle', [1, 2, 3, 4, 5, 6], 10, true);
        player.animations.add('walk', [7, 8, 9, 10], 100, true);

        chest = this.add.sprite(128, 0, 'chest');
        // chest.enableBody = true;
        this.physics.arcade.enable(chest);
        cursors = this.input.keyboard.createCursorKeys();
        money = 0;
        this.scoreText = this.add.text(0, 0, '$:0', {font:'15px Comic Sans MS', fill:'#fff'});
    },

    movePlayer: function (x, y) {
        if (player.isMoving) {
            return;
        }
        player.isMoving = true;
        this.add.tween(player).to({x: player.x + x * 32, y: player.y + y * 32 }, 
            150, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() {
            player.isMoving = false;}, this);
    },
    
    collideMoney: function(chest, player){
        if(chest.exists){
            chest.kill();
            money += 10;
            this.scoreText.text = '$:' + money
            this.gameover = true;
            }
            
    },

    update: function () {
        this.physics.arcade.overlap(chest, player, this.collideMoney, null, this);
        // player.body.velocity.x = 0;       ### default is 0 ###
        // player.body.velocity.y = 10; 
        // player.animations.play('idle');      ### Redundant ###
        if (cursors.left.isDown) {
            //  Move to the left
            this.movePlayer(-1, 0);
            //player.body.velocity.x = -200;
            player.animations.play('walk');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            this.movePlayer(1, 0);
            //player.body.velocity.x = 200;
            player.animations.play('walk');
        }
        else if (cursors.up.isDown) {
            this.movePlayer(0, -1);
            //player.body.velocity.y = -200;
            player.animations.play('walk');
        }
        else if (cursors.down.isDown) {
            this.movePlayer(0, 1);
            //player.body.velocity.y = 200;
            player.animations.play('walk');
        }
        else {
            player.animations.play('idle');
        }

        if(this.gameover == true){
                this.state.start('Shop');
            }
        }
};

