import React from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';
import KibaBar from './KibaBar.js';

var inserts = {
  'question1': {
    '-6': ['skeptisch', 'ablehnend', 'widerspenstig', 'verschlossen'],
    '-2': ['misstrauisch', 'kritisch', 'vorsichtig', 'zweifelnd'],
    '2': ['zuversichtlich', 'optimistisch', 'unvoreingenommen'],
    '6': ['begeistert', 'leidenschaftlich', 'fasziniert', 'inspiriert']
  },
  'question2': {
    '-6': ['wenig ausgeprägtes'],
    '-2': ['geringes'],
    '2': ['positives'],
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
      'Dein unbestechliches Gefühl für Gerechtigkeit verleiht Dir ein starkes Rückgrat in der automatisierten Zusammenarbeit.',
      'Dein Kontakt zur Umwelt findet am liebsten gefiltert statt. Dabei setzt du ein systematisierendes & Überblick verschaffendes Denken ein.',
      'Durch intensive Planung Deiner Aktivitäten trägst du dazu bei, dass die automatisierte Zusammenarbeit besonders organisch abläuft.',
      'Für Dich hört sich die automatisierte Zukunft nach einer energetischen Pattsituation an. Du erkennst aber den Vorteil davon, Projekte von allen Seiten zu beleuchten.',
      'Du bist ganz eng im Loop mit deinen kybernetischen Schwingungen.'
    ],
}

var trainingGeneratorValues = {
  'prefix': ['pro-', 'endo-', 'inter-', 'multi-', 'para-', 'prä-', 'post-', 'tele-', 'tri-', 'uni-', 'poly-'],
  'adjective': ['bedürfnisorientierte', 'nutzerzentrierte', 'intelligente', 'nachhaltige', 'strategische', 'kritische', 'motivierte', 'kreative', 'emotionale', 'institutionelle', 'realistische', 'integrierte', 'moderierte', 'systematisierte', 'eingebettete'],
  'competence': ['Energie-', 'Produktivitäts-', 'Veränderungs-', 'Emotionale-Intelligenz-', 'Innovations-', 'Handhabungs-', 'Trend-', 'Diversitäts-', 'Entscheidungs-', 'Reflektions-', 'Kompetenz-', 'Virtual Reality-', 'IoT-', 'Big Data-'],
  'result': ['Zufriedenheit', 'Glückseligkeit', 'Gewissheit', 'Entspannung', 'Resilienz', 'Begeisterung', 'Entzückung', 'Freude']
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
    return this.props.values.job.id == 12345? futuromatPotential : (futuromatPotential + psychoPotential) / 2;
  }

  componentDidMount(){
    this.props.onComplete(this.calculateKIBAScore(this.props.values));
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
          <p>Der KIBA-Algorithmus hat für dich folgende Zukunftsprognose errechnet:</p>
          <p>Als <b>{ this.randomValueFromArray(inserts.question3[this.props.values.question3]) } { (this.props.values.jobTitle && this.props.values.captchaComplete)? this.props.values.jobTitle : this.props.values.captchaComplete? "Persönlichkeit" : "Roboter" }</b> siehst du der automatisierten Zukunft { this.randomValueFromArray(inserts.question1[this.props.values.question1]) } entgegen.</p>
          <p>Dein { this.randomValueFromArray(inserts.question2[this.props.values.question2]) } Interesse an Neuerungen und Dein { this.randomValueFromArray(inserts.question4[this.props.values.question4]) } zeigen, dass deine persönlichen Mensch-Maschinen-Beziehungen in Zukunft { this.randomValueFromArray(inserts.adjective5) } aussehen werden.</p>
          <p>{ this.randomValueFromArray(inserts.sentence6) } Das macht Dich äußerst beliebt bei Deinen Roboter-Kolleg/innen.</p>
          <p>KIBA empfielt eine <b>Fortbildung für { this.trainingGenerator(trainingGeneratorValues) }</b>, um der Automatisierung bestens ausgebildet entgegen zu schreiten.</p>
        </div>
      }
      {this.props.page == 2 &&
        <div>
          <p style={{lineHeight:'1.2em', fontSize: '0.8em'}}><b>1.</b> Drücke den <b>blinkenden grünen Knopf</b> um die Elixir-Ausgabe zu starten!<span className="cursor">&#9608;</span></p>
          <p style={{lineHeight:'1.2em', fontSize: '0.8em'}}><b>2.</b> Fertige ein Dokumentationsfoto an und teile es unter <b>#KIBAyourself</b></p>
          <KibaBar ki={ this.calculateKIBAScore(this.props.values) } />
          <p className="kibaScoreResult captchaBox">KI { this.calculateKIBAScore(this.props.values) }%<br/>BA { 100 - this.calculateKIBAScore(this.props.values) }%</p>
        </div>
      }
      </div>
    );
  }
}

export default ResultPage;
