class Meal {
  constructor(name, calories){
    // Generating a random ID by making HexaDecimal and removing the 1st two indices(0 & .)
    this.id = Math.random().toString(16).slice(2)
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories){
    // Generating a random ID by making HexaDecimal and removing the 1st two indices(0 & .)
    this.id = Math.random().toString(16).slice(2)
    this.name = name;
    this.calories = calories;
  }
}

export { Meal, Workout };