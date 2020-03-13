# OD React Scheduler
The main goal of this Scheduler is to be simple, clean and fast :)
This is still an ongoing project. Feel free to contribute and report issues =)

[![Build Status](https://travis-ci.com/gcamara/react-scheduler.svg?branch=master)](https://travis-ci.com/gcamara/react-scheduler)

# Installation
```
   npm i od-react-scheduler
```

# Examples & Usage

Basic usage displays only a calendar
```react
  import { ODReactScheduler } from 'od-react-scheduler';
  
  function App() {
    return (
      <ODReactScheduler />
    )
  }
```

Usage with data
```
 const data = [
  {
      id: 1,
      startDate: new Date(2020, 2, 8),
      title: 'Dia internacional da mulher',
      description: 'O Dia Internacional da Mulher é celebrado anualmente, no dia 8 de março. A ideia de uma celebração anual surgiu depois que o Partido Socialista da América organizou um Dia da Mulher, em 20 de fevereiro de 1909, em Nova York - uma jornada de manifestação pela igualdade de direitos civis e em favor do voto feminino.',
      details: {},
      img: 'http..//..'
  },
  {
      id: 2,
      startDate: new Date(2020, 2, 14),
      title: 'Aniversário',
      description: 'Aniversario de criança',
      styles: { // this are css styles
          backgroundColor: 'pink'
      }
  }
  
  function App() {
    return <ODReactScheduler events={data} />
  }
```
