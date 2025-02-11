let produtos = [];
let editandoIndex = null;

window.onload = function() {
    document.querySelector('button:nth-child(1)').onclick = cadastrar_Produto;
    document.querySelector('button:nth-child(2)').onclick = ordenar_Descricao;
    document.querySelector('button:nth-child(3)').onclick = ordenar_Codigo;
};

function cadastrar_Produto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;

    if (codigo && descricao) {
        if (editandoIndex !== null) {
            // Atualiza o produto existente
            produtos[editandoIndex] = { codigo, descricao };
            editandoIndex = null;  // Reseta o modo de edição
        } else {
            // Adiciona um novo produto
            produtos.push({ codigo, descricao });
        }

        exibirProdutos();
        limparCampos();
    } else {
        alert("Preencha todos os campos!");
    }
}

function exibirProdutos() {
    let tabela = document.querySelector("table");
    tabela.innerHTML = `
        <tr>
            <td>Código</td>
            <td>Descrição</td>
            <td>Ação</td>
        </tr>
    `;

    produtos.forEach((produto, index) => {
        let row = tabela.insertRow();

        let cellCodigo = row.insertCell(0);
        let cellDescricao = row.insertCell(1);
        let cellAcao = row.insertCell(2);

        cellCodigo.innerHTML = produto.codigo;
        cellDescricao.innerHTML = produto.descricao;
        cellAcao.innerHTML = `
            <button onclick="editarProduto(${index})">Editar</button>
            <button onclick="deletarProduto(${index})">Deletar</button>
        `;
    });
}

function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
}

function editarProduto(index) {
    let produto = produtos[index];
    document.getElementById("codigo").value = produto.codigo;
    document.getElementById("descricao").value = produto.descricao;

    // Armazena o índice do produto que está sendo editado
    editandoIndex = index;
}

function deletarProduto(index) {
    if (confirm("Deseja excluir esse produto?")) {
        produtos.splice(index, 1);
        exibirProdutos();
        alert("Item excluído!");
    }
}

function ordenar_Descricao() {
    produtos.sort((a, b) => a.descricao.localeCompare(b.descricao));
    exibirProdutos();
}

function ordenar_Codigo() {
    produtos.sort((a, b) => a.codigo.localeCompare(b.codigo));
    exibirProdutos();
}
