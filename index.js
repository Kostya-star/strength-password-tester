const input = document.querySelector('.input');
const strengthMeter = document.querySelector('.strength-meter');
const warningsContainer = document.querySelector('.warnings');

input.addEventListener('input', (e) => calculatePasswordStrength(e.target.value));

// initially draw the percentage bar of the password strength
calculatePasswordStrength(input.value);

function calculatePasswordStrength(password) {
  const weaknesses = [];
  let strength = 100;

  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(numbersWeakness(password));

  warningsContainer.innerText = ''

  weaknesses.forEach((weakness) => {
    if (!weakness) return;
    strength -= weakness.deduction;

    const warning = document.createElement('div');
    warning.innerText = weakness.message;
    warningsContainer.appendChild(warning);
  });

  strengthMeter.style.setProperty('--strength', strength);
}

function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5)
    return {
      message: 'password should be more than 5 symbols',
      deduction: 40,
    };

  if (length <= 10)
    return {
      message: 'password could be longer',
      deduction: 15,
    };
}

function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, 'lowercase symbals')
}

function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, 'uppercase symbals')
}

function numbersWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, 'numbers')
}

function characterTypeWeakness(password, regex, type) {
  const match = password.match(regex) ?? [];

  if (!match.length)
    return {
      message: `password doesnt have ${type}`,
      deduction: 30,
    };

  if (match.length <= 2)
    return {
      message: `password could have more ${type}`,
      deduction: 15,
    };
}