function secretTreasure(input) {
  const treasures = ["blood", "cake", "bismuth", "dolphin", "lipstick"];

  let result = treasures.map((treasure, index) => {
    if (index % input === 0) {
      return [...treasure].reverse().join("");
    } else {
      return treasure.toUpperCase();
    }
  });

  let secret = result.reduce((acc, current) => acc + current, "");
  secret = secret.replace(/[aeiou]/gi, "#");

  return secret;
}

console.log(secretTreasure(2));
