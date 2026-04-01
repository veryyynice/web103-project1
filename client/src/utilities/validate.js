// Returns an error string if the combination is impossible, otherwise null.
export function getValidationError(selections) {
  const { accommodation, utilities } = selections

  if (
    accommodation === 'camping' &&
    (utilities === 'coworking' || utilities === 'sim_coworking')
  ) {
    return "Can't combine camping with a coworking space — no power or reliable internet at a campsite!"
  }

  return null
}
