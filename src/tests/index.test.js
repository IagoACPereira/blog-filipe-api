function soma(a, b) {
  return a + b;
}

describe('Testando Jest', () => {
  it('soma de 2 + 2 = 4', () => {
    expect(soma(2, 2)).toBe(4);
  });
});
