class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cfpLimpo', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ''),
    });
  }

  eSequencia() {
    return this.cfpLimpo.charAt(0).repeat(11) === this.cfpLimpo.length;
  }

  geraNovoCpf() {
    const cpfSemDigitos = this.cfpLimpo.slice(0, -2);
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  static geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for (let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }
    const digito = 11 - (total % 11);
    return digito < 9 ? String(digito) : '0';
  }

  valida() {
    if (!this.cfpLimpo) return false;
    if (typeof this.cfpLimpo !== 'string') return false;
    if (this.cfpLimpo.length !== 11) return false;
    if (this.eSequencia()) return false;
    if (!this.geraNovoCpf());
    // console.log(this.novoCPF);

    return this.novoCPF === this.cfpLimpo;
  }
}
