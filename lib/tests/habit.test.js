// Habit Tracker Unit Tests

// Mock localStorage
const mockLocalStorage = {
  store: {},
  getItem: function(key) {
    return this.store[key] || null;
  },
  setItem: function(key, value) {
    this.store[key] = value;
  },
  clear: function() {
    this.store = {};
  }
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Test suite for habit streak calculations
describe('Habit Streak Calculations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should calculate streak correctly for daily habits', () => {
    const habit = {
      id: '123',
      name: 'Exercise',
      frequency: 'daily',
      completedDates: [
        '2024-01-01',
        '2024-01-02',
        '2024-01-03'
      ]
    };
    
    expect(calculateStreak(habit)).toBe(3);
  });

  test('should break streak when a day is missed', () => {
    const habit = {
      id: '123',
      name: 'Exercise',
      frequency: 'daily',
      completedDates: [
        '2024-01-01',
        '2024-01-02',
        // Missing 2024-01-03
        '2024-01-04'
      ]
    };
    
    expect(calculateStreak(habit)).toBe(1);
  });

  test('should handle weekly habits correctly', () => {
    const habit = {
      id: '123',
      name: 'Exercise',
      frequency: 'weekly',
      completedDates: [
        '2024-01-01',
        '2024-01-08',
        '2024-01-15'
      ]
    };
    
    expect(calculateStreak(habit)).toBe(3);
  });
});

// Test suite for habit storage
describe('Habit Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save habit to localStorage', () => {
    const habit = {
      id: '123',
      name: 'Exercise',
      frequency: 'daily'
    };
    
    saveHabit(habit);
    const saved = JSON.parse(localStorage.getItem('habits') || '[]');
    expect(saved).toContainEqual(habit);
  });

  test('should load habits from localStorage', () => {
    const habits = [
      { id: '123', name: 'Exercise', frequency: 'daily' },
      { id: '456', name: 'Read', frequency: 'weekly' }
    ];
    
    localStorage.setItem('habits', JSON.stringify(habits));
    const loaded = loadHabits();
    expect(loaded).toEqual(habits);
  });
});

// Test suite for export/import functionality
describe('Habit Export/Import', () => {
  test('should export habits to JSON', () => {
    const habits = [
      { id: '123', name: 'Exercise', frequency: 'daily' },
      { id: '456', name: 'Read', frequency: 'weekly' }
    ];
    
    const exported = exportHabits(habits);
    expect(JSON.parse(exported)).toEqual(habits);
  });

  test('should import habits from JSON', () => {
    const habits = [
      { id: '123', name: 'Exercise', frequency: 'daily' },
      { id: '456', name: 'Read', frequency: 'weekly' }
    ];
    
    const json = JSON.stringify(habits);
    const imported = importHabits(json);
    expect(imported).toEqual(habits);
  });
});

// Test suite for reminder scheduling
describe('Habit Reminders', () => {
  test('should schedule reminder for habit', () => {
    const habit = {
      id: '123',
      name: 'Exercise',
      frequency: 'daily',
      reminderTime: '09:00'
    };
    
    const reminder = scheduleReminder(habit);
    expect(reminder.title).toBe('Exercise Reminder');
    expect(reminder.time).toBe('09:00');
  });
});