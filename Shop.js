Starward.Shop = function(){};

Starward.Shop.prototype = {
    preload: function() {
        this.load.image('shopfront', 'assets/shop/shopfront.png');
        this.load.spritesheet('leftchoice', 'assets/shop/leftchoice.png', 30, 52);
        this.load.spritesheet('middlechoice', 'assets/shop/middlechoice.png', 30, 52);
        this.load.spritesheet('rightchoice', 'assets/shop/rightchoice.png', 30, 52);
        this.load.image('textbox', 'assets/textbox.png');
    },

    create: function(){
        confirmChoice = 0;
        //change imgs to group maybe later?
        this.add.sprite(0,0, 'shopfront');
        this.add.sprite(16,106,'textbox');
        this.scoreText = this.add.text(120, 0, '$:' + money, {font:'15px Comic Sans MS', fill:'#fff'});
        var choice1 = this.add.button(21,49, 'leftchoice', actionOnClick1, this, 1, 0);
        choice1.events.onInputOver.add(over,this);
        choice1.events.onInputOut.add(out,this);
        function over(){
            console.log('hover');
            return;
        }
        function out(){
            console.log('out');
            return;
        }

        var choice2 = this.add.button(65,49, 'middlechoice', actionOnClick2, this, 1, 0); 
        choice2.events.onInputOver.add(over,this);
        choice2.events.onInputOut.add(out,this);
      
        var choice3 = this.add.button(110,49, 'rightchoice', actionOnClick3, this, 1, 0);
        choice3.events.onInputOver.add(over,this);
        choice3.events.onInputOut.add(out,this);


        function actionOnClick1(){
            choice1.setTexture('leftchoice', 1);
            confirmChoice=1;

        }
        function actionOnClick2(){
            choice2.setTexture('middlechoice', 1);
            confirmChoice=1;
        }
        function actionOnClick3(){
            choice3.setTexture('rightchoice', 1);
            confirmChoice=1;
        }
        if(confirmChoice>= 0){
            console.log('debug');
            this.confirmSelection;
        }
    },
    confirmSelection: function(){
        var words = String("Confirm your selection?").split();
        for(var i=0; i<words.length;i++){
            this.add.bitmapText(26, 116, 'Comic Sans MS', words[i], 12);
        }
    },

    update: function(){
    }
    
}