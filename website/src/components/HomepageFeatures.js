import clsx from 'clsx';
import React from 'react';

import styles from './HomepageFeatures.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={clsx('col col--4')}>
        <div className="text--center padding-horiz--md">
          <h3>API Clients Automation by Algolia</h3>
        </div>
      </div>
    </section>
  );
}
