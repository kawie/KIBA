import React from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';
import KibaBar from './KibaBar.js';

var inserts = {
  'question1': {
    '-6': ['skeptisch', 'ablehnend', 'widerspenstig', 'verschlossen'],
    '-2': ['misstrauisch', 'kritisch', 'vorsichtig', 'zweifelnd'],
    '2': ['zuversichtlich', 'optimistisch', 'eingenommen', 'unvoreingenommen'],
    '6': ['begeistert', 'leidenschaftlich', 'fasziniert', 'inspiriert']
  },
  'question2': {
    '-6': ['nicht vorhandenes'],
    '-2': ['geringes'],
    '2': ['durschnittliches'],
    '6': ['großes']
  },
  'question3': {
    '-6': ['verschlossener/verschlossene', 'introvertierter/introvertierte', 'unnahbarer/unnahbare'],
    '-2': ['zurückhaltender/zurückhaltende', 'reservierter/reservierte'],
    '2': ['aufgeschlossener/aufgeschlossene', 'offener/offene'],
    '6': ['extrovertierter/extrovertierte', 'kontaktfreudiger/kontaktfreudige']
  },
  'question4': {
    '-6': ['sehr flaches Hierarchiedenken'],
    '-2': ['kritisches Systembewusstsein'],
    '2': ['durchdachtes Handlungskonzept'],
    '6': ['unzweifelndes Wesen']
  },
  'adjective5': [
    'rosig',
    'tollkühn',
    'golden',
    'angenehm'
  ],
  'sentence6': [
      'Dein unbestechliches Gefühl für Wahrheit und Gerechtigkeit verleiht Dir ein starkes moralisches Rückgrat in der automatisierten Zusammenarbeit.',
      'Als Filter setzt Du ein systematisierendes und Überblick verschaffendes Denken ein. Beste Voraussetzung für die digitalen Zukunftswelten.',
      'Deshalb trägst Du durch intensive Planung Deiner Aktivitäten dazu bei, dass die automatisierte Zusammenarbeit besonders organisch abläuft.',
      'Beziehungen sind für Dich die wichtigste Res­source und das Streben nach erfüllten Beziehungen be­stimmt auch dein Leben in der automatisierten Zukunft. Deshalb engagierst du dich für das Wohlergehen von Automaten.',
      'Für Dich hört sich die automatisierte Zukunft nach einer energetischen Pattsituation an. Du erkennst aber den Vorteil davon, Projekte von allen Seiten zu beleuchten, was Dich letztendlich auf das gemeinsame Ziel einschwingen lässt.',
      'Du bist ganz eng im Loop mit deinen kybernetischen Schwingungen.'
    ],
}

var trainingGeneratorValues = {
  'prefix': ['pro-', 'endo-', 'inter-', 'multi-', 'para-', 'prä-', 'post-', 'tele-', 'tri-', 'uni-', 'poly-'],
  'adjective': ['bedürfnisorientierte', 'nutzerzentrierte', 'intelligente', 'nachhaltige', 'strategische', 'kritische', 'motivierte', 'kreative', 'emotionale', 'institutionelle', 'realistische', 'integrierte', 'moderierte', 'systematisierte', 'eingebettete'],
  'competence': ['Energie-', 'Produktivitäts-', 'Veränderungs-', 'Emotionale-Intelligenz-', 'Innovations-', 'Handhabungs-', 'Trend-', 'Diversitäts-', 'Entscheidungs-', 'Reflektions-', 'Kompetenz-', 'Virtual Reality-', 'IoT-', 'Big Data-'],
  'result': ['Zufriedenheit', 'Glückseligkeit', 'Vertrauen', 'Entspannung', 'Resilienz', 'Begeisterung', 'Entzücken', 'Freude']
}

class ResultPage extends React.Component {
  randomValueFromArray(array) {
    var random = Math.floor(Math.random()*array.length);
    return array[random];
  }

  trainingGenerator(values){
    return this.randomValueFromArray(values.prefix) + this.randomValueFromArray(values.adjective) + " " + this.randomValueFromArray(values.competence) + this.randomValueFromArray(values.result);
  }

  calculateKIBAScore(values) {
    var futuromatPotential = this.props.values.futuromatPotential;
    var psychoPotential = 50 + this.props.values.question1 + this.props.values.question2 + this.props.values.question3 + this.props.values.question4;
    return this.props.values.job.id == 12345? futuromatPotential : futuromatPotential + psychoPotential / 2;
  }

  render() {
    axios.get('http://' + this.props.values.serverIP + ':5000/kiba/' + this.calculateKIBAScore(this.props.values))
      .then((response) => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });

    return (
      <div className="resultPage">
      {this.props.page == 1 && this.props.values.job.id == 12345 &&
        <div>
          <p>Dein Beruf ist herausfordernd und geistig anspruchsvoll. Deine Stärken sind Entscheidungsfreude, Kommunikation und strategisches Denken. Der Großteil deiner Tätigkeiten lässt sich nicht automatisieren – gleichwohl bist du auf den technologischen Wandel der Arbeitswelt vorbereitet.</p>
        </div>
      }
      {this.props.page == 1 && this.props.values.job.id != 12345 &&
        <div>
          <p>Als { this.randomValueFromArray(inserts.question3[this.props.values.question3]) } { this.props.values.jobTitle } siehst du der automatisierten Zukunft { this.randomValueFromArray(inserts.question1[this.props.values.question1]) } entgegen.</p>
          <p>Dein { this.randomValueFromArray(inserts.adjective5) }es Interesse an Neuerungen und Dein { this.randomValueFromArray(inserts.question4[this.props.values.question4]) } zeigen, dass deine persönlichen Mensch-Maschinen-Beziehungen in Zukunft { this.randomValueFromArray(inserts.adjective5) } aussehen werden. { this.randomValueFromArray(inserts.sentence6) } Das macht Dich äußerst beliebt bei Deinen Roboter-Kolleg/innen.</p>
          <p>Wir empfehlen Dir daher nur noch eine Fortbildung für { this.trainingGenerator(trainingGeneratorValues) }, um der Automatisierung bestens ausgebildet entgegen zu schreiten.</p>
        </div>
      }
      {this.props.page == 2 &&
        <div>
          <p>Jetzt bekommst du Dein KIBA!<br/>
          Dein KIBA besteht aus { this.calculateKIBAScore(this.props.values) }% KI und { 100 - this.calculateKIBAScore(this.props.values) }% BA.</p>
          <KibaBar ki={ this.calculateKIBAScore(this.props.values) } />
          <p>Das individuell auf Dich abgestimmte KIBA-Elixier bringt dich in Automatisierungs-Balance. KI motiviert mit seinem hohen Anteil an Antioxidantien zum Lernen neuer Skills. BA wirkt ausgleichend gegen etwaige Substituierbarkeits-Ängste und virtuelle Sorgen, denn das enthaltene Magnesium stärkt die Nerven und bekämpft zu hohen Blutdruck.</p>
        </div>
      }
      </div>
    );
  }
}

export default ResultPage;