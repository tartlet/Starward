Starward.GameOver = function(){};

Starward.GameOver.prototype = {
    
    create: function() {
        this.stage.backgroundColor = '#000';
        this.gameOverText = this.add.text(480, 400, 'Game Over', {font:'36px Comic Sans MS', fill:'#fff'});
    }
}
