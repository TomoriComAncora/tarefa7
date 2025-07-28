const buttonCadastro = document.getElementById("cadastrar");
const cep = document.getElementById("cep");
const numero = document.getElementById("numero");

async function buscarCep(cepInformado) {
  await fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.erro) {
        document.getElementById("rua").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("estado").value = data.estado;
        localStorage.setItem("cep", cepInformado);
      } else {
        alert("CEP não encontrado");
        limparCampos();
      }
    })
    .catch((err) => console.log(err));
}

function limparCampos() {
  document.getElementById("cep").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
  localStorage.removeItem("cep");
}

cep.addEventListener("blur", (e) => {
  const cepInformado = e.target.value;

  if (!(cepInformado.length === 8)) {
    alert("Informe um CEP válido");
    limparCampos();
    return;
  } else {
    buscarCep(cepInformado);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cepConsulta = localStorage.getItem("cep");

  if (!cepConsulta || cepConsulta.length === 0) {
    console.log("Não tem nada no local Storage");
    return;
  } else {
    cep.value = cepConsulta;
    buscarCep(cepConsulta);
  }
});

const botao = document.getElementById("cadastrar");
botao.addEventListener("click", (e) => {
  e.preventDefault();
  if (cep.value.length === 8 && numero.value.length > 0) {
    alert("Endereço cadastrado com sucesso!");
    limparCampos();
  } else {
    alert("Preencha os campos");
  }
});
