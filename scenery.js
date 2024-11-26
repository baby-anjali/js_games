const lineBreaks = '\n\n\n\n\n\n\n\n';
const oneLineBreak = '\n';
const roadBit = '_';

const bird =' ོ 𓂃   𓂃 ོ   ོ';
const road = repeat(roadBit, 140);
const car = 'cō͡≡o˞̶';

const cloudLayer1 = repeat(' ⋆        ⁺      ₊          ', 10);
const cloudLayer2 = repeat(' ╭◜◝ ͡ ◜◝╮              ', 10);
const cloudLayer3 = repeat('(        )             ', 10);
const cloudLayer4 = repeat(' ╰◟◞ ͜ ◟◞╯              ', 10);

const buildingLayer1 = repeat('  __                    __     __     ', 5);
const buildingLayer2 = repeat(' |::| _____     __  __ |::|   |::|    ', 5);
const buildingLayer3 = repeat(' |::||::|::|   |::||::||::|   |::| __ ', 5);
const buildingLayer4 = repeat(' |::||::|::|   |::||::||::|   |::||::|', 5);

function delay(times) {
  for (let i = 0; i < times; i++);
}

function repeat(string, times) {
  if (times < 1) {
    return '';
  }

  return string + repeat(string, times - 1);
}

function lengthifyToRoad(string) {
  let newString = '';

  for (let index = 0; index < road.length; index++) {
    const stringIndex = index % string.length;
    newString += string[stringIndex];
  }

  return newString;
}

function getRemaining(limit, string) {
  let remaining = '';

  for (let index = 0; index < limit - 1; index++) {
    remaining += string[index];
  }

  return remaining;
}

function makeEachLayer(start, string) {
  if (start < road.length / 2) {
    return lengthifyToRoad(string);
  }

  const limit = road.length;
  let newLayer = '';

  for (let index = start; index < limit; index++) {
    newLayer += string[index];
  }

  return newLayer + getRemaining(start, string);
}

function getCloudLayer(start) {
  const newCloudLayer1 = makeEachLayer(start, cloudLayer1);
  
  const newCloudLayer2 = makeEachLayer(start, cloudLayer2);
  const newCloudLayer3 = makeEachLayer(start, cloudLayer3);
  const newCloudLayer4 = makeEachLayer(start, cloudLayer4);
  
  return newCloudLayer1 + oneLineBreak + newCloudLayer2 + oneLineBreak + newCloudLayer3 + oneLineBreak + newCloudLayer4 + oneLineBreak;
}

function getBirdLayer(gap) {
  if (gap < road.length / 2) {
    return oneLineBreak + repeat(' ', road.length - gap) + bird;
  }

  return oneLineBreak + repeat('   ', road.length - gap) + bird;
}

function getBuildingLayer(start) {
  const newBuildLayer1 = makeEachLayer(start, buildingLayer1);
  const newBuildLayer2 = makeEachLayer(start, buildingLayer2);
  const newBuildLayer3 = makeEachLayer(start, buildingLayer3);
  const newBuildLayer4 = makeEachLayer(start, buildingLayer4);

  return oneLineBreak + newBuildLayer1 + oneLineBreak + newBuildLayer2 + oneLineBreak + newBuildLayer3 + oneLineBreak + newBuildLayer4 + oneLineBreak;

}

function getCarRoad(start) {
  if (start < road.length / 2) {
    const roadBehind = repeat(roadBit, start) + car;
    return roadBehind + repeat(roadBit, road.length - roadBehind.length) + oneLineBreak;
  }

  const midRoad = Math.floor(road.length / 2) - 3;
  return repeat(roadBit, midRoad) + car + repeat(roadBit, midRoad);
}

function showScene() {
  for (let index = 0; index < road.length; index++) {
    console.clear();
    const wholeScene = getCloudLayer(index) + getBirdLayer(index) + getBuildingLayer(index) + getCarRoad(index);
    console.log(lineBreaks, wholeScene);
    delay(8 ** 9);
  }
}

showScene();
