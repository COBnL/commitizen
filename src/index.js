const inquirer = require('inquirer');
const wrap = require('word-wrap');
const questions = require('./prompt/questions');
const LimitedInput = require('./prompt/LimitedInput');

const MAX_LINE_WIDTH = 72;

inquirer.registerPrompt('limitedInput', LimitedInput);

module.exports = {
  prompter (cz, commit) {
    const promptQuestions = questions;

    return inquirer.prompt(promptQuestions)
      .then((answers) => {
        const wrapOptions = {
          indent: '',
          trim: true,
          width: MAX_LINE_WIDTH
        };

        const head = answers.type + ': ' + answers.subject;

        // Wrap these lines at MAX_LINE_WIDTH character
        const body = wrap(answers.body, wrapOptions);
        const breaking = wrap(answers.breaking, wrapOptions);
        const footer = wrap(answers.footer, wrapOptions);

        let msg;

        msg = head;

        if (body) {
          msg += '\n\n' + body;
        }

        if (breaking) {
          msg += '\n\nBREAKING CHANGE: ' + breaking;
        }

        if (footer) {
          msg += '\n\nIssues: ' + footer;
        }

        return commit(msg);
      });
  }
};
