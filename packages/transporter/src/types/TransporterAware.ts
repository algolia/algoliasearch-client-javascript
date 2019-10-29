import { createTransporter } from '../createTransporter';

export type TransporterAware = {
  readonly transporter: ReturnType<typeof createTransporter>;
};
