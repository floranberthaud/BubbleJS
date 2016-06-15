var bubbleNumber = 0;

function createBubble(x, y) {
    bubbleNumber++;
    var bubbleOpacity = 0.5;
    var bubbleRadius = Math.random() * (bubblejs.maximumSize - bubblejs.minimumSize) + bubblejs.minimumSize;

    //Compute the offscreen starting position for the bubble
    x = x || Math.random() * $(document).width();
    y = y || $(document).height() + bubbleRadius;
    var bubblePosition = new Point(x, y);
    
    var circle = new Path.Circle(bubblePosition, bubbleRadius);
    
    var bubble = new Group([circle]); //Added to a group for adding futures elements
    bubble.data.originalX = x;
    bubble.data.random = Math.random();
    
    //Called each time the frame is drawn
    bubble.onFrame = function (event) {
        var circle = this.children[0];
        
        if (bubble.data.random > bubblejs.bubbleRatio) {
            circle.fillColor = bubblejs.firstBubbleColor;
        } else {
            circle.fillColor = bubblejs.secondBubbleColor;
        }

        circle.fillColor.alpha = bubbleOpacity;
        
        if (bubblejs.stroke === true) {
            circle.strokeWidth = 5;
            circle.strokeColor = "black";
        } else {
            circle.strokeWidth = 0;
        }

        var ratio = circle.bounds.width;

        //Compute the position using sinus function
        this.position.x = this.data.originalX + Math.sin(event.time + this.data.random * 15) * ratio * bubblejs.oscillation;
        this.position -= new Point(0, this.children[0].bounds.height / 40 * bubblejs.speed);

        if (this.position.y < -this.bounds.height) { //If offscreen
            //Remove the bubble
            bubbleNumber--;
            this.remove();
        }
    };
}

function onMouseDown(event) {
    createBubble(event.point.x, event.point.y);
}

function onFrame(event) {
    //Create bubbles until the maximum count
    if (bubbleNumber < bubblejs.bubbleCount) {
        createBubble();
    }
}