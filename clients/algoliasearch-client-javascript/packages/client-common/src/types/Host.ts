export type Host = {
  url: string;
  accept: 'read' | 'readWrite' | 'write';
  protocol: 'http' | 'https';
};

export type StatefulHost = Host & {
  status: 'down' | 'timedout' | 'up';
  lastUpdate: number;
  isUp: () => boolean;
  isTimedout: () => boolean;
};
