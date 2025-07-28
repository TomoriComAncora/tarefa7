const buttonCadastro = document.getElementById("cadastrar");
const cep = document.getElementById("cep");

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
}

cep.addEventListener("blur", (e) => {
  const cepInformado = e.target.value;

  if (!(cepInformado.length === 8)) {
    alert("Informe um CEP válido");
  } else {
    buscarCep(cepInformado);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cepConsulta = localStorage.getItem("cep");

  if (!cepConsulta) {
    localStorage.setItem("cep", cep.value);
  } else {
    cep.value = cepConsulta;
    buscarCep(cepConsulta);
  }
});

const botao = document.getElementById("cadastrar");
botao.addEventListener("click", () => {
  alert("Endereço cadastrado com sucesso!");
  limparCampos();
});
