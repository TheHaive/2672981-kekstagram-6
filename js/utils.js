const ALERT_TIME = 5000;

const getRandomInt = (minInt, maxInt) => {
  const lower = Math.ceil(Math.min(Math.abs(minInt), Math.abs(maxInt)));
  const upper = Math.floor(Math.max(Math.abs(minInt), Math.abs(maxInt)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
}

const alertShow = (message) => {
  const containerAlert = document.createElement('div');
  containerAlert.style.position = 'absolute';
  containerAlert.style.zIndex = '100';
  containerAlert.style.right = '0';
  containerAlert.style.left = '0';
  containerAlert.style.padding = '10px 3px';
  containerAlert.style.top = '0';
  containerAlert.style.fontSize = '30px';
  containerAlert.style.backgroundColor = 'red';
  containerAlert.style.textAlign = 'center';
  containerAlert.classList.add('data-error');
  containerAlert.textContent = message;

  document.body.append(containerAlert);

  setTimeout(() => {
    containerAlert.remove();
  }, ALERT_TIME);
}

const isKeyEsc = (evt) => {
  return evt.key === 'Escape';
}

const Debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const Throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export { getRandomInt, getRandomElement, alertShow, isKeyEsc, Debounce, Throttle };
