import { Destroyable } from '@sefai/requester-common';
import { Transporter } from '@sefai/transporter';

export const destroy = (base: { readonly transporter: Transporter }) => {
  return (): Readonly<Promise<void>> => {
    return ((base.transporter.requester as unknown) as Destroyable).destroy();
  };
};
