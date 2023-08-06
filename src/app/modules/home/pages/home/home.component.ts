import { Component } from '@angular/core';

interface Plant {
  name: string;
  type: string;
  datePlanted: Date;
  expectedHarvestDate: Date;
  careHistory: string[];
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  plants  = [
    {
      id: 1,
      name: 'Planta 1',
      type: 'Indica',
      datePlanted: '2022-03-01',
      dateHarvested: '2022-07-01',
      image: '../../../../../assets/images/9a1ebc9f1ff3.jpg',
      history: [
        { date: '2022-03-07', note: 'Semilla plantada' },
        { date: '2022-03-14', note: 'Planta brotando' },
        { date: '2022-03-21', note: 'Planta creciendo' }
      ]
    },
    {
      id: 2,
      name: 'Planta 2',
      type: 'Sativa',
      datePlanted: '2022-04-01',
      dateHarvested: '2022-08-01',
      image: '../../../../../assets/images/37a9ba258524.jpg',
      history: [
        { date: '2022-04-07', note: 'Semilla plantada' },
        { date: '2022-04-14', note: 'Planta brotando' },
        { date: '2022-04-21', note: 'Planta creciendo' }
      ]
    },
    {
      id: 3,
      name: 'Planta 3',
      type: 'Híbrida',
      datePlanted: '2022-05-01',
      dateHarvested: '2022-09-01',
      image: '../../../../../assets/images/a3fb4aabccff.jpg',
      history: [
        { date: '2022-05-07', note: 'Semilla plantada' },
        { date: '2022-05-14', note: 'Planta brotando' },
        { date: '2022-05-21', note: 'Planta creciendo' }
      ]
    },
    {
      id: 4,
      name: 'Planta 4',
      type: 'Indica',
      datePlanted: '2022-03-01',
      dateHarvested: '2022-07-01',
      image: '../../../../../assets/images/b413-9a1ebc9f1ff3.jpg',
      history: [
        { date: '2022-03-07', note: 'Semilla plantada' },
        { date: '2022-03-14', note: 'Planta brotando' },
        { date: '2022-03-21', note: 'Planta creciendo' }
      ]
    },
    {
      id: 5,
      name: 'Planta 5',
      type: 'Sativa',
      datePlanted: '2022-04-01',
      dateHarvested: '2022-08-01',
      image: '../../../../../assets/images/b413-9a1ebc9f1ff3.jpg',
      history: [
        { date: '2022-04-07', note: 'Semilla plantada' },
        { date: '2022-04-14', note: 'Planta brotando' },
        { date: '2022-04-21', note: 'Planta creciendo' }
      ]
    },
    {
      id: 6,
      name: 'Planta 6',
      type: 'Híbrida',
      datePlanted: '2022-05-01',
      dateHarvested: '2022-09-01',
      image: '../../../../../assets/images/37a9ba258524.jpg',
      history: [
        { date: '2022-05-07', note: 'Semilla plantada' },
        { date: '2022-05-14', note: 'Planta brotando' },
        { date: '2022-05-21', note: 'Planta creciendo' }
      ]
    },
    {
      id: 7,
      name: 'Planta 7',
      type: 'Híbrida',
      datePlanted: '2022-05-01',
      dateHarvested: '2022-09-01',
      image: '../../../../../assets/images/9a1ebc9f1ff3.jpg',
      history: [
        { date: '2022-05-07', note: 'Semilla plantada' },
        { date: '2022-05-14', note: 'Planta brotando' },
        { date: '2022-05-21', note: 'Planta creciendo' }
      ]
    }
  ];


}
