// src/utils/documentStatus.js

const VALID_TRANSITIONS = {
  'generated': ['in_use', 'archived'],
  'in_use': ['archived', 'generated'],
  'archived': [],
};

const isValidTransition = (currentStatus, newStatus) => {
  if (currentStatus === newStatus) return false;
  return VALID_TRANSITIONS[currentStatus]?.includes(newStatus) || false;
};

const getValidNextStatuses = (currentStatus) => {
  return VALID_TRANSITIONS[currentStatus] || [];
};

module.exports = {
  VALID_TRANSITIONS,
  isValidTransition,
  getValidNextStatuses,
};
