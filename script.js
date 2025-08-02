
const V_full_formulas = {
  overall: { intercept: -41.202563, age: 0.209932, BH: 0.310488, BW: 0.082042, sex: -5.290119, LWD: 0.26399 },
  age_21_30: { intercept: 50.23307, age: 1.02706, BH: -0.13235, BW: -0.01701, sex: -9.61616, LWD: 0.23455 },
  age_31_40: { intercept: 38.67985, age: -0.54431, BH: -0.02994, BW: -0.29383, sex: -0.95732, LWD: 0.31332 },
  age_41_50: { intercept: -339.88820, age: 1.54177, BH: 2.06182, BW: -0.94156, sex: -1.52254, LWD: 0.29920 },
  age_51_60: { intercept: 14.2292, age: 1.3450, BH: -0.5594, BW: 0.9084, sex: -6.6907, LWD: 0.1929 },
  age_61_70: { intercept: -248.63921, age: 0.47539, BH: 1.47966, BW: 0.06770, sex: 3.30853, LWD: 0.26118 },
  age_71_80: { intercept: 32.00735, age: -0.29187, BH: -0.03707, BW: 0.26438, sex: -4.54843, LWD: 0.29317 }
};

const V_simple_formulas = {
  overall: { intercept: 20.086381, age: 0.133691, sex: -9.166467, LWD: 0.264242 },
  age_21_30: { intercept: 26.2747, age: 1.0539, sex: -8.3443, LWD: 0.2339 },
  age_31_40: { intercept: 24.072559, age: -0.787502, sex: 3.899513, LWD: 0.306641 },
  age_41_50: { intercept: -14.71316, age: 0.74416, sex: -12.65068, LWD: 0.28675 },
  age_51_60: { intercept: -5.2912, age: 1.0147, sex: -9.4692, LWD: 0.2066 },
  age_61_70: { intercept: 56.5246, age: -0.4155, sex: -16.7405, LWD: 0.2662 },
  age_71_80: { intercept: 38.8833, age: -0.1843, sex: -1.6022, LWD: 0.2810 }
};

document.getElementById('calcForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const length = parseFloat(document.getElementById('length').value);
  const width = parseFloat(document.getElementById('width').value);
  const depth = parseFloat(document.getElementById('depth').value);
  const age = parseFloat(document.getElementById('age').value);
  const sex = parseInt(document.getElementById('sex').value);
  const height = parseFloat(document.getElementById('height').value || 0);
  const weight = parseFloat(document.getElementById('weight').value || 0);
  const model = document.getElementById('model').value;
  const ageGroup = document.getElementById('ageGroup').value;
  const LWD = length * width * depth;

  const formula = (model === 'V_full' ? V_full_formulas : V_simple_formulas)[ageGroup];

  let volume = formula.intercept +
               formula.age * age +
               formula.sex * sex +
               formula.LWD * LWD;

  if (model === 'V_full') {
    volume += formula.BH * height + formula.BW * weight;
  }

  document.getElementById('results').innerHTML = `
    <strong>Estimated Spleen Volume (${model}, ${ageGroup.replace('_', '-')})</strong><br>
    ${volume.toFixed(2)} mL
  `;
});
