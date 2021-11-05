Starward.Game = function () {};
var total = 0;

var totalEnemies = 3;
var currentEnemies = totalEnemies;
var chestSpawned = false;


// initializes array to hold the enemies
var enemies = [];

// booleanArray. Tells us if the space is taken
var spaceTaken = [];

// enemy attacks
var facingDirection;
var turretProjectile;
var dangerSquares = [];
var projectiles = [];
var projectileHit = false;

// player stuff
var currentLives = 3;
var lives = [];

Starward.Game.prototype = {
    
    create: function () {
        game.physics.startSystem(Phaser.Physics.Arcade);
        timer = this.time.create();
        map = this.add.tilemap('tilemap1');

        tileset = map.addTilesetImage('starward', 'tileset1', 64, 64);
        this.layer1 = map.createLayer('bg');
        this.layer2 = map.createLayer('ground');
        map.setCollision(13, true, this.layer);
        this.layer2.resizeWorld();
        
        
        // GUI things
        scoreboard = this.add.sprite(0, 0, 'scoreboard');
        scoreboard.enableBody = true;
        
        money = 0;
        this.scoreText = this.add.text(32, 16, '$:  0', {font:'24px Comic Sans MS', fill:'#fff'});
        
        for (i = 0; i < currentLives; i++){
            life = this.add.sprite(i * 64, 64, 'life');
            life.enableBody = true;
            lives.push(life);
        }
        
        // creates empty 2D array to hold values on whether the space is taken by a enemy sprite or not
        this.createSpaces();
        
        
        
        // fill the spaces with enemies
        this.enemySpawner(enemies, totalEnemies);
        
        //================================
        // TURRET ENEMY ATTACK TIMER
        //================================
        game.time.events.loop(Phaser.Timer.SECOND * 4, function(){
            
            // danger squares appear 2 seconds before the turret fires
            game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                // first need to loop through the enemies
                for ( i = 0; i < totalEnemies; i++){
                    // then get the direction that the enemy is facing
                    facingDirection = enemies[i].attackDirection;
                    
                    // 1 = south, 2 = west, 3 = north, 4 = east
                    // x and y coordinates for danger squares will add or subtract depending on the above values
                    
                    // loop through the amount of danger squares (6)
                    for (j = 1; j < 7; j++){
                        // add the danger square sprite in the direction enemy is facing
                        if (facingDirection == 1){
                            dangerSquare = this.add.sprite(enemies[i].x, enemies[i].y + 64 * j, 'dangerBlink');
                            dangerSquare.enableBody = true;
                            dangerSquare.animations.add('blink', [1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
                            dangerSquare.animations.play('blink');
                        } else if (facingDirection == 2){
                            dangerSquare = this.add.sprite(enemies[i].x - 64 * j, enemies[i].y, 'dangerBlink');
                            dangerSquare.enableBody = true;
                            dangerSquare.animations.add('blink', [1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
                            dangerSquare.animations.play('blink');
                        } else if (facingDirection == 3){
                            dangerSquare = this.add.sprite(enemies[i].x, enemies[i].y - 64 * j, 'dangerBlink');
                            dangerSquare.enableBody = true;
                            dangerSquare.animations.add('blink', [1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
                            dangerSquare.animations.play('blink');
                        } else if (facingDirection == 4){
                            dangerSquare = this.add.sprite(enemies[i].x + 64 * j, enemies[i].y, 'dangerBlink');
                            dangerSquare.enableBody = true;
                            dangerSquare.animations.add('blink', [1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
                            dangerSquare.animations.play('blink');
                        }
                        dangerSquares.push(dangerSquare);
                    }
                }
                
                
            }, this);
            
            // this is when the turrets will attack, shoot their projectile
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                // loop through enemies
                for (i = 0; i < totalEnemies; i++){
                    // destroy the danger squares
                    for ( j = 0; j < dangerSquares.length; j++){
                        dangerSquares[j].destroy();
                    }
                    // find out which direction to launch projectiles in
                    facingDirection = enemies[i].attackDirection;
                    
                    // add the projectile to be shot from the square in front of the enemy
                    if (facingDirection == 1){
                        turretProjectile = this.add.sprite(enemies[i].x, enemies[i].y + 64, 'turretBul');
                        turretProjectile.enableBody = true;
                        this.physics.arcade.enable(turretProjectile);
                        turretProjectile.animations.add('spinning', [1, 2, 3, 4], 4, true);
                        turretProjectile.animations.play('spinning');
                        turretProjectile.body.velocity.y = 256;
                    } else if (facingDirection == 2){
                        turretProjectile = this.add.sprite(enemies[i].x - 64, enemies[i].y, 'turretBul');
                        turretProjectile.enableBody = true;
                        this.physics.arcade.enable(turretProjectile);
                        turretProjectile.animations.add('spinning', [1, 2, 3, 4], 4, true);
                        turretProjectile.animations.play('spinning');
                        turretProjectile.body.velocity.x = -256;
                    } else if (facingDirection == 3){
                        turretProjectile = this.add.sprite(enemies[i].x, enemies[i].y - 64, 'turretBul');
                        turretProjectile.enableBody = true;
                        this.physics.arcade.enable(turretProjectile);
                        turretProjectile.animations.add('spinning', [1, 2, 3, 4], 4, true);
                        turretProjectile.animations.play('spinning');
                        turretProjectile.body.velocity.y = -256;
                    } else if (facingDirection == 4){
                        turretProjectile = this.add.sprite(enemies[i].x + 64, enemies[i].y, 'turretBul');
                        turretProjectile.enableBody = true;
                        this.physics.arcade.enable(turretProjectile);
                        turretProjectile.animations.add('spinning', [1, 2, 3, 4], 4, true);
                        turretProjectile.animations.play('spinning');
                        turretProjectile.body.velocity.x = 256;
                    }
                    
                    projectiles.push(turretProjectile);
                }
                
                
            }, this);
        }, this);
        
        // player stuff
        player = this.add.sprite(192, 512, 'player');
        player.enableBody = true;
        this.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        this.countdown = this.add.text('$: ' + this.money, 10);
        player.animations.add('idle_f', [1, 2, 3, 4, 5, 6], 6, true);
        player.animations.add('walk_f', [7, 8, 9, 10], 4, true);
        player.animations.add('idle_r', [11, 12, 13, 14, 15, 16], 6, true);
        player.animations.add('walk_r', [17, 18, 19, 20], 4, true);
        player.animations.add('idle_l', [27, 28, 29, 30, 31, 32], 6, true);
        player.animations.add('walk_l', [33, 34, 35, 36], 4, true);
        player.animations.add('idle_b', [37, 38, 39, 40, 41, 42], 6, true);
        player.animations.add('walk_b', [43, 44, 45, 46], 4, true);
        
        cursors = this.input.keyboard.createCursorKeys();
        game.input.keyboard.addKey.Q;
        
        
        

    },
    
    //===================================
    // HELPER FUNCTIONS FOR MODULARITY
    //===================================
    movePlayer: function (x, y) {
        if (player.isMoving) {
            return;
        }
        player.isMoving = true;
        this.add.tween(player).to({x: player.x + x * 64, y: player.y + y * 64 }, 
            150, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() {
            player.isMoving = false;}, this);
    },
    
    collideMoney: function(chest, player){
        if(chest.exists){
            chest.kill();
            money += 10;
            this.scoreText.text = '$:' + money;
            this.gameover = true;
            }
    },
    
    // randomized enemy spawner that can/will vary from level to level
    enemySpawner: function(enemies, totalEnemies) {

        // every possible space for a turret
        var spaces = [[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9]]
        var direction;
       
        for ( i = 0; i < totalEnemies; i++) {
            
            random = Math.floor(Math.random() * spaces.length);
            selection = spaces[random];
           
            // set direction, 1 is north, 2 east, 3 south, 4 west
            if (selection[1] == 2){
                direction = 1
            } 
            else if(selection[0] == 9){
                direction = 2
            } 
            else if(selection[1] == 9){
                direction = 3
            } 
            else{
                direction = 4
            }
            
            // spawn the enemy
            enemy = this.add.sprite( 64 * selection[0], 64 * selection[1], 'turret' + direction.toString());
            enemy.enableBody = true;
            
            // set their stats
            enemy.health = 10;
            enemy.fireRate = 3; // seconds
            enemy.damage = 1;   // takes away 1 player heart
            enemy.attackDirection = direction;
            // . . .
            
            
            // then add them to the current list of enemies
            enemies.push(enemy);

            // delete the selection from spaces array to avoid turret in same space
            var deleted = spaces.splice(random,1);


        
        //                                                       //
        //                                                       //
        //  PREVIOUS CODE FOR TURRET PLACEMENT COMMENTED BELOW   //
        //                                                       //
        //                                                       //


        // var randLocation;
        // var previousRandLocation = -1;
        // var direction;
        // var row;
        // var column;
        // var otherPoint;

        // // loop until totalEnemies is reached
        // for ( i = 0; i < totalEnemies; i++) {
        //     // need to make a random integer from 0-23 that representes the clockwise order of the spaces surrounding the board
        //     randLocation = Math.floor(Math.random() * 24);
        //     // then whatever that location is i can divide that by 6 to find in which direction the enemy should be placed
        //     // if the result is 0-1 then we are north, 1-2 is east, 2-3 is south, 3-4 is west
        //     if (randLocation / 6 <= 1) {
        //         direction = 1;
        //     } else if (randLocation / 6 > 1 && randLocation / 6 <= 2) {
        //         direction = 2;
        //     } else if (randLocation / 6 > 2 && randLocation / 6 <= 3) {
        //         direction = 3;
        //     } else if (randLocation / 6 > 3 && randLocation / 6 <= 4) {
        //         direction = 4;
        //     }
        //     // reset the values so that it doesn't mess up the loops
        //     row = 0;
        //     column = 0;
        //     // direction 1 is the 3rd row and has columns 4-9 (north)
        //     // direction 2 is the 10th column and has rows 4-9 (east)
        //     // direction 3 is the 10th row and has columns 4-9 (south)
        //     // direction 4 is the 3rd column and has rows 4-9 (west)
        //     // need to subtract 1 from the row and column though because it technically starts at 0 not 1
            
        //     // now write if-statements for each direction and assign the starting row or column based on that
        //     if (direction == 1) {
        //         row = 2;
        //     } else if (direction == 2) {
        //         column = 9;
        //     } else if (direction == 3) {
        //         row = 9;
        //     } else if (direction == 4) {
        //         column = 2;
        //     }
        //     // now i need to get which exact second coordinate point their at by using modulus
        //     otherPoint = randLocation % 6 + 3;
        //     // with this, i get either 0, 1, 2, 3, 4, or 5 then add 3 to not have them spawn in corners
            
        //     if (row == 2 || row == 9) {
        //         column = otherPoint;
        //     } else {
        //         row = otherPoint;
        //     }
            
        //     // I now have coordinates for where I want the enemy to be placed
        //     // next is to check whether there exists an enemy there already
        //     if (spaceTaken[row][column] == false) {
        //         // first flip the switch
        //         spaceTaken[row][column] = true;
        //         // then spawn the enemy
        //         enemy = this.add.sprite( 64 * column, 64 * row, 'turret');
        //         enemy.enableBody = true;
                
        //         // set their stats
        //         enemy.health = 10;
        //         enemy.fireRate = 3; // seconds
        //         enemy.damage = 1;   // takes away 1 player heart
        //         enemy.attackDirection = direction;
        //         // . . .
                
        //         // console.log(enemy.attackDirection);
                
        //         // then add them to the current list of enemies
        //         enemies.push(enemy);
        //     }

        
        //                                                       //
        //                                                       //
        //            END OF TURRET COMMENTED CODE               //
        //                                                       //
        //                                                       //

        }
    },
    
    // creates empty spaces for enemy sprites to take up
    createSpaces: function() {
        // iterates through the rows
        for (i = 0; i < 12; i++){
            spaceTaken[i] = [];
            
            // iterates through the columns
            for (j = 0; j < 12; j++){
                spaceTaken[i][j] = false;
            }
        }
    },
    
    collisionHandler: function() {
        
        lives.pop().destroy();
        projectileHit = true;
        currentLives -= 1;
    },

    update: function () {

        game.physics.arcade.collide('player', map);
        if (chestSpawned == true){
            this.physics.arcade.overlap(chest, player, this.collideMoney, null, this);
        }


        // set the game over screen when player loses all of their lives
        if (currentLives == 0){
            this.state.start('GameOver');
            
            
        }
        
        
        
        // While nothing is being pressed, make player stand still
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.animations.play('idle_f');
        
        // out-of-bounds destruction for projectiles
        for (i = 0; i < projectiles.length; i++){
            if (projectiles[i].x > 704 || projectiles[i].x < 64 || projectiles[i].y > 704 || projectiles[i].y < 64){
                projectiles[i].destroy();
            }
        }
        
        //============================
        // PLAYER TAKING DAMAGE
        //============================
        
        for (i = 0; i < projectiles.length; i++){
            game.physics.arcade.collide(projectiles[i], player, this.collisionHandler, null, this);
            if (projectileHit == true){
                projectiles[i].destroy();
                projectileHit = false;
            }
        }
        
        
        
        // Check for dead enemies
//        if (enemy1.health <= 0){    // Change this code later, could work by putting them in arrray
//            enemy1.destroy();
//            numEnemies -= 1;
//            enemy1.health = 10;
//        }
//        else if (enemy2.health <= 0){
//            enemy2.destroy();
//            numEnemies -= 1;
//            enemy2.health = 10;
//        }
//        else if (enemy3.health <= 0){
//            enemy3.destroy();
//            numEnemies -= 1;
//            enemy3.health = 10;
//        }
        
        // Player attack
//        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
//            
//            attack = this.game.add.sprite(player.x + 32, player.y, 'playerAttack'); // Also store these in an array later
//            
//            if (attack.x == enemy1.x && attack.y == enemy1.y && enemy1.health > 0){     // Code heavily subject to change
//                // decrease enemy health
//                enemy1.health -= 1;
//                
//            }
//            else if (attack.x == enemy2.x && attack.y == enemy2.y && enemy2.health > 0){
//                enemy2.health -=1;
//                
//            }
//            else if (attack.x == enemy3.x && attack.y == enemy3.y && enemy3.health > 0){
//                enemy3.health -= 1;
//                
//            }
//            
//        }
        
        // Player movement
        
        if (cursors.left.isDown) {
            //player.body.velocity.x = -200;
            player.animations.play('walk_l');
            if(player.x == 192){
                return
            }
            else{
                //  Move to the left
                this.movePlayer(-1, 0);
            }
            
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.animations.play('walk_r');
            if(player.x == 512){
                return
            }
            else{
                this.movePlayer(1,0);
            }
            //player.body.velocity.x = 200;
        }
        else if (cursors.up.isDown) {
            //player.body.velocity.y = -200;
            player.animations.play('walk_b');
            if(player.y == 192){
                return
            }
            else{
                this.movePlayer(0,-1);
            }
        }
        else if (cursors.down.isDown) {
            //player.body.velocity.y = 200;
            player.animations.play('walk_f');
            if(player.y == 512){
                return
            }
            else{
                this.movePlayer(0,1);
            }
        }
        else {
            player.animations.play('idle_f');
        }

        
        // When all enemies are defeated, spawn the chest to proceed to the shop
//        if (numEnemies == 0 && chestSpawned == false){
//            chest = this.add.sprite(128, 0, 'chest');
//            chest.enableBody = true;
//            this.physics.arcade.enable(chest);
//            chestSpawned = true;
//            this.proceedText = this.add.text(0, 64, 'Collect chest to proceed!', {font: '12px Comic Sans MS', fill: '#fff'});
//        }


        if(this.gameover == true){
                this.state.start('Shop');
            }
        }
};

