import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/index.js';

// importacao do  bootstrap
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';

// importando style.css
import '../css/style.css';

// importando jquery não precisa porque foi importado pelo webpack.config.js
//import 'jquery/dist/jquery.js';

// importacao do  js do bootstrap
import 'bootstrap/js/modal.js';


$('h1').click( () => console.log('juqery está iniciado') );

//console.log($('h1').modal());
console.log( $('h1').modal );

const controller = new NegociacaoController();
const negociacao = new Negociacao(new Date(), 1, 200);
const headers    = new Headers();

headers.set('Content-Type', 'application/json');

const body = JSON.stringify(negociacao);
const method = 'POST';

const config = { 
    method,
    headers,
    body 
};

fetch(`${SERVICE_URL}/negociacoes`, config)
    .then(() => console.log('Dado enviado com sucesso'));