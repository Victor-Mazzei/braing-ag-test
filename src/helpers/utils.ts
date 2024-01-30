import { cpf, cnpj} from 'cpf-cnpj-validator';

function validCPF(dataCPF) {
    return cpf.isValid(dataCPF);
}

function validCNPJ(dataCNPJ) {
    return cnpj.isValid(dataCNPJ);
}

export  {
    validCPF,
    validCNPJ
}