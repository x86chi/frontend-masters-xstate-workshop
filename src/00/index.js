import { createMachine } from 'xstate';

const elOutput = document.querySelector('#output');

function output(object) {
  elOutput.innerHTML = JSON.stringify(object, null, 2);
}

console.log('Welcome to the XState workshop!');

const machine = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'pending',
      },
    },
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'rejected',
      },
    },
    resolved: {},
    rejected: {},
  },
};

function transition(state, event) {
  return machine.states[state].on?.[event] || state;
}

output(transition('idle', 'FETCH'));

let currentState = machine.initial;

function send(event) {
  const nextState = transition(currentState, event);
  console.log(nextState);
  currentState = nextState;
}

window.send = send;
