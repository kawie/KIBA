import React from 'react';
import { Formik, Field } from 'formik';

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
      'Dein Kontakt zur Umwelt findet am liebsten gefiltert statt. Beste Voraussetzung für die digitalen Zukunftswelten. Als Filter setzt Du ein systematisierendes und Überblick verschaffendes Denken ein.',
      'Deshalb trägst Du durch intensive Planung Deiner Aktivitäten dazu bei, dass die automatisierte Zusammenarbeit besonders organisch abläuft.',
      'Beziehungen sind für Dich die wichtigste Res­source eines Menschen und das Streben nach erfüllten Beziehungen be­stimmt auch dein Leben in der automatisierten Zukunft. Deshalb engagierst du dich für das Wohlergehen von Automaten.',
      'Für Dich hört sich die automatisierte Zukunft kompliziert und nach einer energetischen Pattsituation an. Du erkennst aber den Vorteil davon Projekte von allen Seiten zu beleuchten, was Dich letztendlich auf das gemeinsame Ziel einschwingen lässt.'
    ],


}

class ResultPage extends React.Component {
  randomValueFromArray(array) {
    var random = Math.floor(Math.random()*array.length);
    return array[random];
  }

  render() {
    return (
      <div className="resultPage">
        <p>Als { this.randomValueFromArray(inserts.question3[this.props.values.question3]) } [Koch/Köchin] siehst du der automatisierten Zukunft { this.randomValueFromArray(inserts.question1[this.props.values.question1]) } entgegen.</p>
        <p>Dein { this.randomValueFromArray(inserts.adjective5) }es Interesse an Neuerungen und Dein { this.randomValueFromArray(inserts.question4[this.props.values.question4]) } zeigen, dass deine persönlichen Mensch-Maschinen-Beziehungen in Zukunft { this.randomValueFromArray(inserts.adjective5) } aussehen werden. { this.randomValueFromArray(inserts.sentence6) } Das macht Dich äußerst beliebt bei Deinen Roboter-Kollegen.</p>
        <p>Wir empfehlen Dir daher nur noch eine Fortbildung für para-autorisierte Trend-Resilienz, um der Automatisierung bestens ausgebildet entgegen zu schreiten.</p>
        <p>Jetzt bekommst du Dein KIBA!<br/>
        Dein KIBA besteht aus [37]% KI und [63]% BA.</p>
        <p>Das individuell auf Dich abgestimmte KIBA-Elixier bringt dich in Automatisierungs-Balance. KI motiviert mit seinem hohen Anteil an Antioxidantien zum Lernen neuer Skills. BA wirkt ausgleichend gegen etwaige Substituierbarkeits-Ängste und virtuelle Sorgen, denn das enthaltene Magnesium stärkt die Nerven und bekämpft zu hohen Blutdruck.</p>
        <p>Ergebnis: { JSON.stringify(this.props.values, null, 2) }</p>
      </div>
    );
  }
}

export default ResultPage;