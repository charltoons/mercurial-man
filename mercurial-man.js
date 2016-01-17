var MAX_CONSTANT = 45;

var POINTS = [

  // Center
  [0, 0],

  // North
  [0, -MAX_CONSTANT],

  // North East
  [MAX_CONSTANT, -MAX_CONSTANT],

  // East
  [MAX_CONSTANT, 0],

  // Southeast
  [MAX_CONSTANT, MAX_CONSTANT],

  // South
  [0, MAX_CONSTANT],

  // Southwest
  [-MAX_CONSTANT, MAX_CONSTANT],

  // West
  [-MAX_CONSTANT, 0],

  //Northwest
  [-MAX_CONSTANT, -MAX_CONSTANT]

];

function handleOrientation(e){

  if (e.alpha === null){
    alert('Go here on your phone, stupid head.');
    return;
  }
  var direction = getDirectionFromOrientation(e);

  document.getElementById('the-man').dataset.direction = direction;
}

function getDirectionFromOrientation(e){

  // the poor-man's Vornoi, bitches
  var currentPosition = [e.gamma, e.beta];

  // get the distances
  var distances = POINTS.map(function(point){
    return distance(point, currentPosition);
  });

  var smallestDistance = distances.reduce(function(prev, current){
    return (prev < current)? prev : current;
  }, Infinity);

  return distances.indexOf(smallestDistance)
}

function distance(pointA, pointB){
  return Math.sqrt(Math.pow((pointA[0] - pointB[0]), 2) + Math.pow((pointA[1] - pointB[1]), 2));
}

window.addEventListener("deviceorientation", handleOrientation, true);
