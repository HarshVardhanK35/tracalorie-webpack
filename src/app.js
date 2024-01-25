import './css/bootstrap.css';
import './css/style.css';

import CalorieTracker from './Tracker';
import { Meal, Workout } from './item';

import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';

// class App{
  // ----------------------------------- Refactored the code with DRY --------------------------------------
  //   constructor(){
//     this._tracker = new CalorieTracker();
//     document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this)) //--- here 'this' keyword refers to the element that the event is on
//     // but here we must have to make 'this' must pertain to the app that we initialize, so we have to bind this

//     this._tracker = new CalorieTracker();
//     document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this))
//   }

//   _newMeal(e){
//     e.preventDefault();

//     const name = document.getElementById('meal-name');
//     const calories = document.getElementById('meal-calories');

//     // validate the inputs
//     if(name.value === '' || calories.value === ''){
//       alert('please fill in all fields!!!')
//     }

//     const meal = new Meal(name.value, +calories.value)
//     this._tracker.addMeal(meal);

//     // reset the input boxes
//     name.value = ''
//     calories.value = ''

//     // Close the bootstrap forms after entering the new meals
//     const collapseMeal = document.getElementById('collapse-meal')
//     const bsCollapse = new bootstrap.Collapse(collapseMeal, {
//       toggle: true
//     })
//   }

//   _newWorkout(e){
//     e.preventDefault();

//     const name = document.getElementById('workout-name');
//     const calories = document.getElementById('workout-calories');

//     // validate the inputs
//     if(name.value === '' || calories.value === ''){
//       alert('please fill in all fields!!!')
//     }

//     const workout = new Workout(name.value, +calories.value)
//     this._tracker.addWorkout(workout);

//     // reset the input boxes
//     name.value = ''
//     calories.value = ''

//     // Close the bootstrap forms after entering the new workouts
//     const collapseWorkout = document.getElementById('collapse-workout')
//     const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
//       toggle: true
//     })
//   }
// }



class App{
  // ----------------------- Created class App{} another time for not to repeat same code for both meal and workout
  constructor(){
    this._tracker = new CalorieTracker();
    this._loadEventListeners()
    this._tracker.loadItems()
  }

  _loadEventListeners(){
    // Adding Items
    document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal')) //--- here 'this' keyword refers to the element that the event is on
    // but here we must have to make 'this' must pertain to the app that we initialize, so we have to bind this
    document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'))

    // Removing Items
    document.getElementById('meal-items').addEventListener('click', this._removeItems.bind(this, 'meal'))
    document.getElementById('workout-items').addEventListener('click', this._removeItems.bind(this, 'workout'))

    // Filtering Items
    document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'))
    document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'))

    // Reset
    document.getElementById('reset').addEventListener('click', this._reset.bind(this));

    // Set Calorie Limit
    document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this))
  }

  _newItem(type, e){
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // validate the inputs
    if(name.value === '' || calories.value === ''){
      alert('please fill in all fields!!!')
    }

    if(type === 'meal'){
      const meal = new Meal(name.value, +calories.value)
      this._tracker.addMeal(meal);
    }
    else{
      const workout = new Workout(name.value, +calories.value)
      this._tracker.addWorkout(workout);
    }

    // ----------------------- reset the input boxes -----------------------
    name.value = ''
    calories.value = ''

    // ----------------------- Close the bootstrap forms after entering the new meals
    const collapseItem = document.getElementById(`collapse-${type}`)
    const bsCollapse = new Collapse(collapseItem, {
      toggle: true
    })
  }

  _removeItems(type, e){
    if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
      if(confirm('Are you sure you want to delete?')){
        const id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');

        type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id)

        e.target.parentElement.parentElement.parentElement.parentElement.remove()
      }
    }
  }

  _filterItems(type, e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card `).forEach((item)=>{
      const name = item.firstElementChild.firstElementChild.textContent;
      if(name.toLowerCase().indexOf(text) !== -1){
        item.style.display = 'block'
      }
      else{
        item.style.display = 'none'
      }
    });
  }

  _reset(e){
    this._tracker.reset()
    document.getElementById('meal-items').innerHTML = ''
    document.getElementById('workout-items').innerHTML = ''
    document.getElementById('filter-meals').value = ''
    document.getElementById('filter-workouts').value = ''
  }

  _setLimit(e){
    e.preventDefault()
    const limit = document.getElementById('limit');

    if(limit.value === ''){
      alert('Please add a limit!!!')
    }

    this._tracker.setLimit(+limit.value);
    limit.value = '';

    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide()
  }
}

const app = new App();