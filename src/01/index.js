const elBox = document.querySelector('#box');

const model = {
  initial: 'active',
  state: {
    active: { on: { CLICK: 'inactive' } },
    inactive: { on: { CLICK: 'active' } },
  },
};

// Pure function that returns the next state,
// given the current state and sent event
function transition(state, event) {
  return model.state[state].on[event] || state;
}

// Keep track of your current state
let currentState = model.initial;

function send(event) {
  // Determine the next value of `currentState`
  const nextState = transition(currentState, event);
  currentState = nextState;
  elBox.dataset.state = currentState;
}

elBox.addEventListener('click', () => {
  send('CLICK');
});
