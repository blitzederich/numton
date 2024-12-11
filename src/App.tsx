import { useEffect, useState } from 'react';
import cn from 'classnames';

import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [animateEnabled, setAnimateEnabled] = useState(false);

  const increase = () => {
    setCount(prev => prev + 1);
    setAnimateEnabled(true);
    setTimeout(() => setAnimateEnabled(false), 200);
  }

  useEffect(() => {
    const interval = setInterval(increase, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn('counter-container', animateEnabled && 'animate')}>
      {count}
    </div>
  )
}

export default App
