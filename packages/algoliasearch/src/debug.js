import ms from 'ms';
import format from 'format-util';

export default function debug(namespace) {
  if (process.env.DEBUG === undefined) return noop;

  const DEBUG = process.env.DEBUG.replace('*', '');

  if (namespace.indexOf(DEBUG) === -1) return noop;

  let lastMessageTime;
  return (message, ...params) => {
    if (lastMessageTime === undefined) {
      lastMessageTime = Date.now();
    }

    console.log(format('%s: %s +%s',
      namespace,
      format(message, ...params),
      ms(Date.now() - lastMessageTime)
    ));

    lastMessageTime = Date.now();
  };
}

function noop() {}
