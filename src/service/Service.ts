function getBudget() {
  const budget = localStorage.getItem('budget');
  return !budget ? '0,00' : budget;
}

function setBudget(value: string) {
  localStorage.setItem('budget', value);
}

const Service = {
  getBudget,
  setBudget,
};

export default Service;
