import { Composition, forEach, randomWithinRange } from '../index';

window.onload = () => {
  let testDiv = document.getElementById('test');
  let comp = new Composition(testDiv);
  let layer0 = comp.newLayer('2d');
  let layer1 = comp.newLayer('2d');
  let layer2 = comp.newLayer('2d');
  setInterval(() => {
    layer1.drawSquare(
      randomWithinRange(0, layer1.cvs.width),
      randomWithinRange(0, layer1.cvs.height),
      50,
      'red',
      0.5
    )
    layer2.drawSquare(
      randomWithinRange(0, layer1.cvs.width),
      randomWithinRange(0, layer1.cvs.height),
      50,
      'orange',
      0.5
    )
  }, 200)
  layer0.background('rgba(255,0,0,0.5)');

  comp.onResize = () => {
    layer0.background('rgba(255,0,0,0.5)');
  }
}

