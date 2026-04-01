export const OPTIONS = {
  accommodation: [
    { value: 'camping',  label: 'Camping',        cost: 5,   emoji: '⛺' },
    { value: 'hostel',   label: 'Hostel',          cost: 15,  emoji: '🏨' },
    { value: 'airbnb',   label: 'Airbnb',          cost: 50,  emoji: '🏠' },
    { value: 'hotel',    label: 'Hotel',           cost: 100, emoji: '🏩' },
  ],
  food: [
    { value: 'street_food',  label: 'Street food',  cost: 10, emoji: '🍜' },
    { value: 'groceries',    label: 'Groceries',    cost: 15, emoji: '🛒' },
    { value: 'restaurants',  label: 'Restaurants',  cost: 30, emoji: '🍽️' },
  ],
  transportation: [
    { value: 'walking',     label: 'Walking / Biking', cost: 0,  emoji: '🚶' },
    { value: 'bus',         label: 'Local bus',        cost: 5,  emoji: '🚌' },
    { value: 'rideshare',   label: 'Rideshare',        cost: 15, emoji: '🚗' },
    { value: 'car_rental',  label: 'Car rental',       cost: 40, emoji: '🚙' },
  ],
  utilities: [
    { value: 'none',          label: 'None',             cost: 0,  emoji: '—' },
    { value: 'sim_only',      label: 'SIM card',         cost: 2,  emoji: '📱' },
    { value: 'coworking',     label: 'Coworking space',  cost: 20, emoji: '💻' },
    { value: 'sim_coworking', label: 'SIM + Coworking',  cost: 22, emoji: '🖥️' },
  ],
}

export function getOption(category, value) {
  return OPTIONS[category].find(o => o.value === value)
}

export function calculateTotal(selections) {
  return Object.entries(selections).reduce((total, [category, value]) => {
    const option = getOption(category, value)
    return total + (option ? option.cost : 0)
  }, 0)
}
