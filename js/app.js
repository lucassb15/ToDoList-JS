'use strict';

const pegarBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const enviarBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));
const criarTarefa = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice} >
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice} >
    `;

    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = pegarBanco();
    banco.forEach((item, indice) => criarTarefa(item.tarefa, item.status, indice));
}

const adicionarTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = pegarBanco();
        banco.push({ 'tarefa': texto, 'status': '' });
        enviarBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = pegarBanco();
    banco.splice(indice, 1);
    enviarBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = pegarBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    enviarBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type == 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type == 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('novoItem').addEventListener('keypress', adicionarTarefa);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
