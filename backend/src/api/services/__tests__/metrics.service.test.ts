import metricsService from '../metrics.service';

describe('calculatePercentageSaved', () => {
  it('Correctly calculates saved energy', () => {
    const curr = 50;
    const prev = 100;
    const result: number = metricsService.calculatePercentageSaved(curr, prev);
    expect(result).toBe(50); // 50% decreased usage
  });

  it('Correctly calculates increased energy usage', () => {
    const curr = 100;
    const prev = 50;
    const result: number = metricsService.calculatePercentageSaved(curr, prev);
    expect(result).toBe(-100); // 100% increased usage
  });
});
