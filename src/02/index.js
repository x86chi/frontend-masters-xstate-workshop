import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const feedbackMachine = createMachine({
  initial: 'question',
  states: {
    question: {
      on: {
        GOOD: 'thanks',
        BAD: 'form',
      },
    },
    form: {
      on: {
        SUBMIT: 'thanks',
      },
    },
    thanks: {
      on: {
        CLOSE: 'closed',
      },
    },
    closed: { type: 'final' },
  },
});

const feedbackService = interpret(feedbackMachine);

feedbackService.onTransition(({ value }) => {
  elBox.dataset.state = value;
});

feedbackService.start();

elBox.addEventListener('click', () => {
  feedbackService.send('GOOD');
});
