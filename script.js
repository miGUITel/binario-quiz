const bitRow = document.getElementById('bitRow');
    const output = document.getElementById('output');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizFeedback = document.getElementById('quizFeedback');
    const buttons = {
      calculatorMode: document.getElementById('calculatorMode'),
      quizMode1: document.getElementById('quizMode1'),
      quizMode2: document.getElementById('quizMode2'),
      quizMode3: document.getElementById('quizMode3')
    };

    let bits = Array(8).fill(0);
    let currentMode = 'calculator';
    let currentQuizValue = null;

    function updateOutput() {
      const decimalValue = parseInt(bits.join(''), 2);
      output.textContent = `Decimal Value: ${decimalValue}`;
      if (currentMode.startsWith('quiz') && decimalValue === currentQuizValue) {
        quizFeedback.textContent = '¡Correcto! ¿Quieres probar otra vez? (Presiona Enter o haz clic en Sí)';
        quizFeedback.style.color = '#28a745';
        renderRetryButton();
      } else if (currentMode.startsWith('quiz')) {
        quizFeedback.textContent = '';
      }
    }

    function toggleBit(index) {
      bits[index] = bits[index] === 0 ? 1 : 0;
      renderBits();
      updateOutput();
    }

    function renderBits() {
      bitRow.innerHTML = '';
      bits.forEach((bit, index) => {
        const button = document.createElement('button');
        button.textContent = bit;
        button.className = `bit ${bit === 1 ? 'active' : ''}`;
        button.addEventListener('click', () => toggleBit(index));
        bitRow.appendChild(button);
      });
    }

    function getRandomNumber(mode) {
      if (mode === 'quizMode1') return Math.floor(Math.random() * 16);
      if (mode === 'quizMode2') return 16 * Math.floor(Math.random() * 15 + 1); // Multiples of 16 from 16 to 240
      return Math.floor(Math.random() * 256);
    }

    function startQuiz(mode) {
      quizFeedback.textContent = '';
      quizQuestion.innerHTML = '';
      currentQuizValue = getRandomNumber(mode);
      quizQuestion.textContent = `Convert ${currentQuizValue} to binary.`;
    }

    function setMode(mode) {
      currentMode = mode;
      Object.values(buttons).forEach(button => button.classList.remove('active'));
      buttons[mode].classList.add('active');

      if (mode === 'calculator') {
        quizQuestion.textContent = '';
        quizFeedback.textContent = '';
        output.style.display = 'block';
      } else {
        output.style.display = 'none';
        startQuiz(mode);
      }
    }

    function renderRetryButton() {
      const retryButton = document.createElement('button');
      retryButton.textContent = 'Sí';
      retryButton.style.marginLeft = '10px';
      retryButton.className = 'bit';
      retryButton.addEventListener('click', () => startQuiz(currentMode));
      quizQuestion.appendChild(retryButton);

      document.addEventListener('keydown', function handleEnter(event) {
        if (event.key === 'Enter') {
          startQuiz(currentMode);
          document.removeEventListener('keydown', handleEnter);
        }
      });
    }

    Object.entries(buttons).forEach(([mode, button]) => {
      button.addEventListener('click', () => setMode(mode));
    });

    renderBits();
    updateOutput();