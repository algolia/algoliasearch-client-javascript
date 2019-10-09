export const EventEnum: { readonly [key: string]: EventType } = {
  Click: 'click',
  Conversion: 'conversion',
  View: 'view',
};

export type EventType = 'click' | 'conversion' | 'view';
