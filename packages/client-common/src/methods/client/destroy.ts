import { Destroyable } from '@algolia/requester-common';
import { Transporter } from '@algolia/transporter';

export const destroy = (base: { readonly transporter: Transporter }) => {
  return (): Readonly<Promise<void>> => {
    return ((base.transporter.requester as unknown) as Destroyable).destroy();
  };
};
