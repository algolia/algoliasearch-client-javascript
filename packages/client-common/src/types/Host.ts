export type Host = {
  url: string;
  accept: 'read' | 'readWrite' | 'write';
  protocol: 'http' | 'https';
};

export type StatefulHost = Host & {
  status: 'down' | 'timed out' | 'up';
  lastUpdate: number;
  isUp: () => boolean;
  isTimedOut: () => boolean;
};
