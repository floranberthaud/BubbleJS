var bubbleNumber = 0;

function createBubble(x, y) {
    bubbleNumber++;
    var bubbleOpacity = 0.5;
    var bubbleRadius = Math.random() * (bubblejs.maximumSize - bubblejs.minimumSize) + bubblejs.minimumSize;
    x = x || Math.random() * $(document).width();
    y = y || $(document).height() + bubbleRadius;
    var bubblePosition = new Point(x, y);
    
    var circle = new Path.Circle(bubblePosition, bubbleRadius);
    
    var bubble = new Group([circle]);
    bubble.data.originalX = x;
    bubble.data.random = Math.random();
    
    bubble.onFrame = function (event) {
        var circle = this.children[0];
        
        if (bubble.data.random > bubblejs.bubbleRatio) {
            circle.fillColor = bubblejs.firstBubbleColor;
        } else {
            circle.fillColor = bubblejs.secondBubbleColor;
        }
        circle.fillColor.alpha = bubbleOpacity;
        //circle.fillColor.hue += event.count/2;
        
        if (bubblejs.stroke === true) {
            circle.strokeWidth = 5;
            circle.strokeColor = "black";
        } else {
            circle.strokeWidth = 0;
        }
        
        this.position -= new Point(0, this.children[0].bounds.height / 40 * bubblejs.speed);
        var ratio = circle.bounds.width;
        this.position.x = this.data.originalX + Math.sin(event.time + this.data.random * 15) * ratio * bubblejs.oscillation;
        if (this.position.y < -this.bounds.height) {
            bubbleNumber--;
            this.remove();
        }
    };
}

function onMouseDown(event) {
    createBubble(event.point.x, event.point.y);
}

function onFrame(event) {
    if (bubbleNumber < bubblejs.bubbleCount) {
        createBubble();
    }
}