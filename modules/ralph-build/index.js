import chalk from 'chalk';

export default function () {
  const { nuxt } = this;

  // Don't activate in production
  if (nuxt.options.dev === false) {
    return;
  }

  // https://v2.nuxt.com/docs/internals-glossary/internals-nuxt#hooks
  nuxt.hook('listen', (server, { port }) => {
    // Add messages to the CLI
    nuxt.options.cli.badgeMessages.push(
      `${chalk.bold('Ralph UI docs:')} ${chalk.green(
        'npm run ralph-ui-docs',
      )}${chalk.yellow('*')}`,
    );
    nuxt.options.cli.badgeMessages.push('');
    nuxt.options.cli.badgeMessages.push(
      `${chalk.yellow('*')}${chalk.dim(
        'This will show the docs of your currently installed version of Ralph UI',
      )}`,
    );
  });
}
