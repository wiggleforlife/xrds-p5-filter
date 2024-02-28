let facemesh;
let video;
let predictions = [];
let hat;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    hat = loadImage("/static/hat.png");

    facemesh = ml5.facemesh(video, modelReady);

    facemesh.on("predict", results => {
        predictions = results;
    });
    video.hide();
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    image(video, 0, 0, width, height);
    //image(hat,0,0)

    drawKeypoints();
    printAnnotations();
}

function printAnnotations() {
    if (predictions.length > 0) {
        console.log(predictions[0])
        let box = predictions[0].boundingBox;
        let x = box.topLeft[0][0] + Math.abs(box.topLeft[0][0] - box.bottomRight[0][0] / 2)
        let y = box.topLeft[0][1];
        console.log(x + " " + y)

        image(hat, x, y)
    }
}


function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
        const keypoints = predictions[i].scaledMesh;
        // Draw facial keypoints.
        for (let j = 0; j < keypoints.length; j += 1) {
            const [x, y] = keypoints[j];
            fill(0, 255, 0);
            ellipse(x, y, 5, 5);

        }
    }
}

