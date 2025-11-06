import { calculatePoints } from '../utils/rewardCalculator';

test("calculates reward for $120", () => {
    expect(calculatePoints(120)).toBe(90);
});

test("calculates reward for $75", () => {
    expect(calculatePoints(75)).toBe(25);
});

test("calculates reward for $50", () => {
    expect(calculatePoints(50)).toBe(0);
});

test("calculates reward for $101", () => {
    expect(calculatePoints(101)).toBe(52);
});

test("calculates reward for $49", () => {
    expect(calculatePoints(49)).toBe(0);
});

test("calculates reward for $100", () => {
    expect(calculatePoints(100)).toBe(50);
});

// second test case


describe('calculatePoints', () => {
    // Positive
    test('120 → 90', () => expect(calculatePoints(120)).toBe(90));
    test('80 → 30', () => expect(calculatePoints(80)).toBe(30));
    test('102.5 → 55', () => expect(calculatePoints(102.5)).toBe(55));

    // Negative
    test('40 → 0', () => expect(calculatePoints(40)).toBe(0));
    test('negative → 0', () => expect(calculatePoints(-5)).toBe(0));
    test('invalid → 0', () => {
        expect(calculatePoints('abc')).toBe(0);
        expect(calculatePoints(null)).toBe(0);
    });
});