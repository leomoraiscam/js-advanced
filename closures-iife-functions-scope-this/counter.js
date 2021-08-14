(() => {
  const BTN_RESTART = "btnRestart";
  const ID_COUNTER = "counter";
  const VALUE_COUNTER = 100;
  const BREAK_PERIOD = 10;

  class Counter {
    constructor() {
      this.init();
    }

    prepareCounterProxy() {
      const handler = {
        set: (currentContext, propertyKey, newValue) => {
          console.log({ currentContext, propertyKey, newValue });

          if(!currentContext.value) {
            currentContext.makeStop();
          }

          currentContext[propertyKey] = newValue;

          return true;
        }
      }

      const counter = new Proxy({
        value: VALUE_COUNTER,
        makeStop: () => { }
      }, handler);

      return counter;
    }

    updateText = ({ countElement, counter }) => () => {
      const textId = '$$count';

      const defaultText = `Começando em <strong>${textId}</strong> segundos...`;

      countElement.innerHTML = defaultText.replace(textId, counter.value --);
    }

    scheduleStopCounter({ countElement, intervalId }) {
      return () => {
        clearInterval(intervalId);
        
        countElement.innerHTML = ""

        this.disableButton(false);
      }
    }

    prepareButton(buttonElement, startFunction) {
      buttonElement.addEventListener('click', startFunction.bind(this));
      
      return (value = true) => {
        const attribute = 'disabled';

        if (value) {
          buttonElement.setAttribute(attribute, value);
          
          return;
        }

        buttonElement.removeAttribute(attribute);
      };
    }

    init() {
      console.log('inicializou!!');

      const countElement = document.getElementById(ID_COUNTER);

      const counter = this.prepareCounterProxy();

      const closureUpdateTextFunctionValue = this.updateText({ countElement, counter });

      const intervalId = setInterval(closureUpdateTextFunctionValue, BREAK_PERIOD);

      {
        const buttonElement = document.getElementById(BTN_RESTART);

        const disableButton = this.prepareButton(buttonElement, this.init);
        
        disableButton();

        const closureStopCounterFunctionValue = this.scheduleStopCounter.apply({ disableButton }, [{ countElement, intervalId }]);
        
        counter.makeStop = closureStopCounterFunctionValue;
      }
    }
  } 

  window.Counter = Counter;
})()
