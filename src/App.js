import React from 'react';
import ReactScheduler from './scheduler/ReactScheduler';

const data = [
    {
        date: new Date(2020, 2, 8),
        title: 'Dia internacional da mulher',
        description: 'Dia de respeito à luta das mulheres',
        img: 'https://s.aficionados.com.br/imagens/o-mundo-geek-deseja-feliz-dia-internacional-da-mulher_f.jpg',
        details: {},
    },
    {
        date: new Date(2020, 2, 8),
        title: 'Aniversário',
        description: 'Aniversario de criança',
        styles: {
            backgroundColor: 'pink'
        }
    },
    {
        date: new Date(2020, 2, 8),
        title: 'Aniversário',
        description: 'Aniversario de criança',
        styles: {
            backgroundColor: 'pink'
        }
    },
    {
        date: new Date(2020, 2, 8),
        title: 'Aniversário',
        description: 'Aniversario de criança',
        styles: {
            backgroundColor: 'pink'
        }
    }
]

export default App => <ReactScheduler events={data} />