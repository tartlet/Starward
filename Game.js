var Starward = Starward || {};

Starward.Game = function () {};
var total = 0;
var numEnemies = 3;
var chestSpawned = false;

Starward.Game.prototype = {
    
    create: function () {
        
        
        
        timer = this.time.create();
        map = this.add.tilemap('tilemap1');
        tileset = map.addTilesetImage('tset1', 'tileset1');
        this.layer = map.createLayer(0,'toplayer', tileset);
        
        
        player = this.add.sprite(0, 128, 'player');
        player.enableBody = true;
        this.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        this.countdown = this.add.text('$: ' + this.money, 10);
        player.animations.add('idle', [1, 2, 3, 4, 5, 6], 10, true);
        player.animations.add('walk', [7, 8, 9, 10], 100, true);
        
        // Move this chunk later to add the chest after the enemies are slain
        
        
        // Add the enemy animations below
        enemy1 = this.add.sprite(128, 128, 'basicEnemy');
        enemy2 = this.add.sprite(64, 64, 'basicEnemy');
        enemy3 = this.add.sprite(64, 0, 'basicEnemy');
        
        // Enable the bodies for enemies below
        enemy1.enableBody = true;
        enemy2.enableBody = true;
        enemy3.enableBody = true;
        
        // Set Enemy HP
        enemy1.health = 10;
        enemy2.health = 10;
        enemy3.health = 10;
        
        
        cursors = this.input.keyboard.createCursorKeys();
        
        
        money = 0;
        this.scoreText = this.add.text(0, 0, '$:0', {font:'15px Comic Sans MS', fill:'#fff'});
        this.attackText = this.add.text(0, 140, 'Spacebar to attack!', {font: '12px Comic Sans MS', fill: '#fff'});
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
        
        if (chestSpawned == true){
            this.physics.arcade.overlap(chest, player, this.collideMoney, null, this);
        }
        
        
        // While nothing is being pressed, make player stand still
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.animations.play('idle');
        
        // Check for dead enemies
        if (enemy1.health <= 0){    // Change this code later, could work by putting them in arrray
            enemy1.destroy();
            numEnemies -= 1;
            enemy1.health = 10;
        }
        else if (enemy2.health <= 0){
            enemy2.destroy();
            numEnemies -= 1;
            enemy2.health = 10;
        }
        else if (enemy3.health <= 0){
            enemy3.destroy();
            numEnemies -= 1;
            enemy3.health = 10;
        }
        
        // Player attack
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            
            attack = this.game.add.sprite(player.x + 32, player.y, 'playerAttack'); // Also store these in an array later
            
            if (attack.x == enemy1.x && attack.y == enemy1.y && enemy1.health > 0){     // Code heavily subject to change
                // decrease enemy health
                enemy1.health -= 1;
                
            }
            else if (attack.x == enemy2.x && attack.y == enemy2.y && enemy2.health > 0){
                enemy2.health -=1;
                
            }
            else if (attack.x == enemy3.x && attack.y == enemy3.y && enemy3.health > 0){
                enemy3.health -= 1;
                
            }
            
        }
        
        // Player movement
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
        
        // When all enemies are defeated, spawn the chest to proceed to the shop
        if (numEnemies == 0 && chestSpawned == false){
            chest = this.add.sprite(128, 0, 'chest');
            chest.enableBody = true;
            this.physics.arcade.enable(chest);
            chestSpawned = true;
            this.proceedText = this.add.text(0, 64, 'Collect chest to proceed!', {font: '12px Comic Sans MS', fill: '#fff'});
        }

        if(this.gameover == true){
                this.state.start('Shop');
            }
        }
};
