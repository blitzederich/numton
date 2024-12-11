import { Fragment, useEffect, useState } from 'react';
import cn from 'classnames';

import './App.css'

export function App() {
  const [count, setCount] = useState(0);
  const [animateEnabled, setAnimateEnabled] = useState(false);
  const [timeoutID, setTimeoutID] = useState<ReturnType<typeof setTimeout>>();

  const increase = () => {
    setCount(prev => prev + 1);
    setAnimateEnabled(true);
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    setTimeoutID(setTimeout(() => setAnimateEnabled(false), 100));
  }

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.expand();

      setTimeout(() => {
        const user = tg.initDataUnsafe.user;
        if (!user) {
          return;
        }

        tg.showAlert(`Hello, ${user.first_name}!`);

        tg.requestContact((ok, res) => {
          if (ok) {
            tg.showAlert(JSON.stringify(res));
          }
        });
      });
    }
  }, []);

  return (
    <Fragment>
      <div className={cn('counter-container', animateEnabled && 'animate')}>
        {count}
      </div>
      <div className="button-container">
        <button className="button" onClick={increase}>
          {/* <span style={{width: '66.6%', height: '100%', backgroundColor: '#fff', display: 'block'}} /> */}
          <span className="button-text">UP</span>
        </button>
      </div>
    </Fragment>
  )
}
