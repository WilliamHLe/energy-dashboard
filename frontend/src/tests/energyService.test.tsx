import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import * as energyService from '../services/energyService';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

test('Energy usage is transformed correctly', () => {
  const usage = [
    {
      category: {
        _id: '6061fe1f057b0340a90c82fa',
        name: 'idrettsbygg',
      },
      usage: [
        {
          date: '2018-01-01',
          value: 37740,
        },
        {
          date: '2018-01-02',
          value: 50372,
        },
        {
          date: '2018-01-03',
          value: 59877,
        },
        {
          date: '2018-01-04',
          value: 32176,
        },
        {
          date: '2018-01-05',
          value: 24324,
        },
        {
          date: '2018-01-06',
          value: 16365,
        },
        {
          date: '2018-01-07',
          value: 10210,
        },
        {
          date: '2018-01-08',
          value: 10195,
        },
        {
          date: '2018-01-09',
          value: 24333,
        },
        {
          date: '2018-01-10',
          value: 1376,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82fc',
        name: 'annet',
      },
      usage: [
        {
          date: '2018-01-01',
          value: 35791,
        },
        {
          date: '2018-01-02',
          value: 47617,
        },
        {
          date: '2018-01-03',
          value: 60238,
        },
        {
          date: '2018-01-04',
          value: 31492,
        },
        {
          date: '2018-01-05',
          value: 24445,
        },
        {
          date: '2018-01-06',
          value: 18799,
        },
        {
          date: '2018-01-07',
          value: 12975,
        },
        {
          date: '2018-01-08',
          value: 15608,
        },
        {
          date: '2018-01-09',
          value: 15680,
        },
        {
          date: '2018-01-10',
          value: 954,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82fb',
        name: 'helsebygg',
      },
      usage: [
        {
          date: '2018-01-01',
          value: 95200,
        },
        {
          date: '2018-01-02',
          value: 99541,
        },
        {
          date: '2018-01-03',
          value: 132816,
        },
        {
          date: '2018-01-04',
          value: 89828,
        },
        {
          date: '2018-01-05',
          value: 67873,
        },
        {
          date: '2018-01-06',
          value: 44415,
        },
        {
          date: '2018-01-07',
          value: 41712,
        },
        {
          date: '2018-01-08',
          value: 41329,
        },
        {
          date: '2018-01-09',
          value: 48705,
        },
        {
          date: '2018-01-10',
          value: 2608,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82f9',
        name: 'skole',
      },
      usage: [
        {
          date: '2018-01-01',
          value: 124170,
        },
        {
          date: '2018-01-02',
          value: 179360,
        },
        {
          date: '2018-01-03',
          value: 236632,
        },
        {
          date: '2018-01-04',
          value: 90893,
        },
        {
          date: '2018-01-05',
          value: 76536,
        },
        {
          date: '2018-01-06',
          value: 60424,
        },
        {
          date: '2018-01-07',
          value: 25633,
        },
        {
          date: '2018-01-08',
          value: 37464,
        },
        {
          date: '2018-01-09',
          value: 40191,
        },
        {
          date: '2018-01-10',
          value: 2912,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82f8',
        name: 'barnehage',
      },
      usage: [
        {
          date: '2018-01-01',
          value: 38676,
        },
        {
          date: '2018-01-02',
          value: 52025,
        },
        {
          date: '2018-01-03',
          value: 70806,
        },
        {
          date: '2018-01-04',
          value: 28780,
        },
        {
          date: '2018-01-05',
          value: 22495,
        },
        {
          date: '2018-01-06',
          value: 17806,
        },
        {
          date: '2018-01-07',
          value: 8562,
        },
        {
          date: '2018-01-08',
          value: 15275,
        },
        {
          date: '2018-01-09',
          value: 10232,
        },
        {
          date: '2018-01-10',
          value: 937,
        },
      ],
    },
  ];
  const correctResponse = [
    {
      cropThreshold: 9999,
      name: 'idrettsbygg',
      data: [
        {
          x: 1514764800000,
          y: 37740,
        },
        {
          x: 1514851200000,
          y: 50372,
        },
        {
          x: 1514937600000,
          y: 59877,
        },
        {
          x: 1515024000000,
          y: 32176,
        },
        {
          x: 1515110400000,
          y: 24324,
        },
        {
          x: 1515196800000,
          y: 16365,
        },
        {
          x: 1515283200000,
          y: 10210,
        },
        {
          x: 1515369600000,
          y: 10195,
        },
        {
          x: 1515456000000,
          y: 24333,
        },
        {
          x: 1515542400000,
          y: 1376,
        },
      ],
    },
    {
      cropThreshold: 9999,
      name: 'annet',
      data: [
        {
          x: 1514764800000,
          y: 35791,
        },
        {
          x: 1514851200000,
          y: 47617,
        },
        {
          x: 1514937600000,
          y: 60238,
        },
        {
          x: 1515024000000,
          y: 31492,
        },
        {
          x: 1515110400000,
          y: 24445,
        },
        {
          x: 1515196800000,
          y: 18799,
        },
        {
          x: 1515283200000,
          y: 12975,
        },
        {
          x: 1515369600000,
          y: 15608,
        },
        {
          x: 1515456000000,
          y: 15680,
        },
        {
          x: 1515542400000,
          y: 954,
        },
      ],
    },
    {
      cropThreshold: 9999,
      name: 'helsebygg',
      data: [
        {
          x: 1514764800000,
          y: 95200,
        },
        {
          x: 1514851200000,
          y: 99541,
        },
        {
          x: 1514937600000,
          y: 132816,
        },
        {
          x: 1515024000000,
          y: 89828,
        },
        {
          x: 1515110400000,
          y: 67873,
        },
        {
          x: 1515196800000,
          y: 44415,
        },
        {
          x: 1515283200000,
          y: 41712,
        },
        {
          x: 1515369600000,
          y: 41329,
        },
        {
          x: 1515456000000,
          y: 48705,
        },
        {
          x: 1515542400000,
          y: 2608,
        },
      ],
    },
    {
      cropThreshold: 9999,
      name: 'skole',
      data: [
        {
          x: 1514764800000,
          y: 124170,
        },
        {
          x: 1514851200000,
          y: 179360,
        },
        {
          x: 1514937600000,
          y: 236632,
        },
        {
          x: 1515024000000,
          y: 90893,
        },
        {
          x: 1515110400000,
          y: 76536,
        },
        {
          x: 1515196800000,
          y: 60424,
        },
        {
          x: 1515283200000,
          y: 25633,
        },
        {
          x: 1515369600000,
          y: 37464,
        },
        {
          x: 1515456000000,
          y: 40191,
        },
        {
          x: 1515542400000,
          y: 2912,
        },
      ],
    },
    {
      cropThreshold: 9999,
      name: 'barnehage',
      data: [
        {
          x: 1514764800000,
          y: 38676,
        },
        {
          x: 1514851200000,
          y: 52025,
        },
        {
          x: 1514937600000,
          y: 70806,
        },
        {
          x: 1515024000000,
          y: 28780,
        },
        {
          x: 1515110400000,
          y: 22495,
        },
        {
          x: 1515196800000,
          y: 17806,
        },
        {
          x: 1515283200000,
          y: 8562,
        },
        {
          x: 1515369600000,
          y: 15275,
        },
        {
          x: 1515456000000,
          y: 10232,
        },
        {
          x: 1515542400000,
          y: 937,
        },
      ],
    },
  ];
  const resp = { data: usage };
  mockedAxios.get.mockResolvedValue(resp);

  return energyService.getEnergyUsage(undefined, undefined)
    .then((data) => expect(data).toEqual(correctResponse));
});

test('Energy usage is transformed correctly for specific building or category', () => {
  const usage = [
    {
      date: '2018-01-01',
      value: 1137,
    },
    {
      date: '2018-01-02',
      value: 1609,
    },
    {
      date: '2018-01-03',
      value: 1711,
    },
    {
      date: '2018-01-04',
      value: 1304,
    },
    {
      date: '2018-01-05',
      value: 1065,
    },
    {
      date: '2018-01-06',
      value: 747,
    },
    {
      date: '2018-01-07',
      value: 477,
    },
    {
      date: '2018-01-08',
      value: 578,
    },
    {
      date: '2018-01-09',
      value: 405,
    },
    {
      date: '2018-01-10',
      value: 30,
    },
  ];
  const correctResponse = [
    {
      cropThreshold: 9999,
      name: 'Rye barneskole',
      data: [
        {
          x: 1514764800000,
          y: 1137,
        },
        {
          x: 1514851200000,
          y: 1609,
        },
        {
          x: 1514937600000,
          y: 1711,
        },
        {
          x: 1515024000000,
          y: 1304,
        },
        {
          x: 1515110400000,
          y: 1065,
        },
        {
          x: 1515196800000,
          y: 747,
        },
        {
          x: 1515283200000,
          y: 477,
        },
        {
          x: 1515369600000,
          y: 578,
        },
        {
          x: 1515456000000,
          y: 405,
        },
        {
          x: 1515542400000,
          y: 30,
        },
      ],
    },
  ];
  const resp = { data: usage };
  mockedAxios.get.mockResolvedValue(resp);

  return energyService.getEnergyUsage('skole', 'Rye barneskole')
    .then((data) => expect(data).toEqual(correctResponse));
});

test('Carrier is transformed correctly for sankey diagram', () => {
  const carriers = [
    {
      category: {
        _id: '6061fe1f057b0340a90c82fa',
        name: 'idrettsbygg',
      },
      carriers: [
        {
          name: 'Elkjel',
          amount: 173308,
        },
        {
          name: 'Fastkraft',
          amount: 33894076,
        },
        {
          name: 'Fjernvarme',
          amount: 20029143,
        },
        {
          name: 'Varme',
          amount: 286674,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82fc',
        name: 'annet',
      },
      carriers: [
        {
          name: 'Fjernvarme',
          amount: 17773436,
        },
        {
          name: 'Elkjel',
          amount: 1487030,
        },
        {
          name: 'Fastkraft',
          amount: 38186084,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82fb',
        name: 'helsebygg',
      },
      carriers: [
        {
          name: 'Fastkraft',
          amount: 72064753,
        },
        {
          name: 'Fjernvarme',
          amount: 64099773,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82f9',
        name: 'skole',
      },
      carriers: [
        {
          name: 'Fjernvarme',
          amount: 73895576,
        },
        {
          name: 'Varme',
          amount: 2476456,
        },
        {
          name: 'Fastkraft',
          amount: 109554673,
        },
        {
          name: 'Elkjel',
          amount: 2164643,
        },
      ],
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82f8',
        name: 'barnehage',
      },
      carriers: [
        {
          name: 'Fastkraft',
          amount: 41895512,
        },
        {
          name: 'Elkjel',
          amount: 1359504,
        },
        {
          name: 'Ikke valgt',
          amount: 92114,
        },
        {
          name: 'Fjernvarme',
          amount: 12712989,
        },
      ],
    },
  ];
  const correctResponse = [
    {
      keys: [
        'from',
        'to',
        'weight',
      ],
      data: [
        [
          'Elkjel',
          'idrettsbygg',
          173308,
        ],
        [
          'Elkjel',
          'annet',
          1487030,
        ],
        [
          'Elkjel',
          'skole',
          2164643,
        ],
        [
          'Elkjel',
          'barnehage',
          1359504,
        ],
        [
          'Fastkraft',
          'idrettsbygg',
          33894076,
        ],
        [
          'Fastkraft',
          'annet',
          38186084,
        ],
        [
          'Fastkraft',
          'helsebygg',
          72064753,
        ],
        [
          'Fastkraft',
          'skole',
          109554673,
        ],
        [
          'Fastkraft',
          'barnehage',
          41895512,
        ],
        [
          'Fjernvarme',
          'idrettsbygg',
          20029143,
        ],
        [
          'Fjernvarme',
          'annet',
          17773436,
        ],
        [
          'Fjernvarme',
          'helsebygg',
          64099773,
        ],
        [
          'Fjernvarme',
          'skole',
          73895576,
        ],
        [
          'Fjernvarme',
          'barnehage',
          12712989,
        ],
        [
          'Ikke valgt',
          'barnehage',
          92114,
        ],
        [
          'Varme',
          'idrettsbygg',
          286674,
        ],
        [
          'Varme',
          'skole',
          2476456,
        ],
      ],
      type: 'sankey',
      name: 'Energibærer',
    },
  ];
  const resp = { data: carriers };
  mockedAxios.get.mockResolvedValue(resp);

  return energyService.getEnergyCarriersAll()
    .then((data) => expect(data).toEqual(correctResponse));
});

test('Carrier is transformed correctly for pie chart', () => {
  const carriers = [
    {
      name: 'Varme',
      amount: 2476456,
    },
    {
      name: 'Fastkraft',
      amount: 109554673,
    },
    {
      name: 'Elkjel',
      amount: 2164643,
    },
    {
      name: 'Fjernvarme',
      amount: 73895576,
    },
  ];
  const correctResponse = {
    name: 'Energibærer',
    colorByPoint: true,
    data: [
      {
        name: 'Elkjel',
        y: 2164643,
      },
      {
        name: 'Fastkraft',
        y: 109554673,
      },
      {
        name: 'Fjernvarme',
        y: 73895576,
      },
      {
        name: 'Varme',
        y: 2476456,
      },
    ],
  };
  const resp = { data: carriers };
  mockedAxios.get.mockResolvedValue(resp);

  return energyService.getEnergyCarriersCategory('skole')
    .then((data) => expect(data).toEqual(correctResponse));
});

test('Energy saved is transformed correctly for column shart', () => {
  const saved = [
    {
      category: {
        _id: '6061fe1f057b0340a90c82f9',
        name: 'skole',
      },
      saved: 4.84,
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82f8',
        name: 'barnehage',
      },
      saved: 6.34,
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82fb',
        name: 'helsebygg',
      },
      saved: 5.28,
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82fc',
        name: 'annet',
      },
      saved: 6.47,
    },
    {
      category: {
        _id: '6061fe1f057b0340a90c82fa',
        name: 'idrettsbygg',
      },
      saved: 8.26,
    },
  ];
  const correctResponse = [
    {
      name: 'skole',
      y: 4.84,
    },
    {
      name: 'barnehage',
      y: 6.34,
    },
    {
      name: 'helsebygg',
      y: 5.28,
    },
    {
      name: 'annet',
      y: 6.47,
    },
    {
      name: 'idrettsbygg',
      y: 8.26,
    },
  ];
  const resp = { data: saved };
  mockedAxios.get.mockResolvedValue(resp);

  return energyService.getEnergySavedAll()
    .then((data) => expect(data).toEqual(correctResponse));
});

test('Energy saved is transformed correctly for heatmap', () => {
  const saved = [
    {
      week: '01',
      percentSaved: 12.12,
    },
    {
      week: '02',
      percentSaved: 12.06,
    },
    {
      week: '03',
      percentSaved: -3.36,
    },
    {
      week: '04',
      percentSaved: -12.67,
    },
    {
      week: '05',
      percentSaved: 3.86,
    },
    {
      week: '06',
      percentSaved: -11.76,
    },
    {
      week: '07',
      percentSaved: 45.36,
    },
    {
      week: '08',
      percentSaved: 53.22,
    },
    {
      week: '09',
      percentSaved: 50.62,
    },
    {
      week: '10',
      percentSaved: -2.08,
    },
    {
      week: '11',
      percentSaved: 46.29,
    },
    {
      week: '12',
      percentSaved: 37.98,
    },
    {
      week: '13',
      percentSaved: 17.44,
    },
    {
      week: '14',
      percentSaved: 14.8,
    },
    {
      week: '15',
      percentSaved: 14.03,
    },
    {
      week: '16',
      percentSaved: 34.22,
    },
    {
      week: '17',
      percentSaved: 29.12,
    },
    {
      week: '18',
      percentSaved: 34.91,
    },
    {
      week: '19',
      percentSaved: -21.14,
    },
    {
      week: '20',
      percentSaved: 1.45,
    },
    {
      week: '21',
      percentSaved: -23.5,
    },
    {
      week: '22',
      percentSaved: 26.37,
    },
    {
      week: '23',
      percentSaved: -11.18,
    },
    {
      week: '24',
      percentSaved: -9.13,
    },
    {
      week: '25',
      percentSaved: -0.6,
    },
    {
      week: '26',
      percentSaved: 14.68,
    },
    {
      week: '27',
      percentSaved: 15.39,
    },
    {
      week: '28',
      percentSaved: 6.82,
    },
    {
      week: '29',
      percentSaved: -24.49,
    },
    {
      week: '30',
      percentSaved: -18.76,
    },
    {
      week: '31',
      percentSaved: 29.32,
    },
    {
      week: '32',
      percentSaved: -10.24,
    },
    {
      week: '33',
      percentSaved: -25.1,
    },
    {
      week: '34',
      percentSaved: -37.09,
    },
    {
      week: '35',
      percentSaved: 4.49,
    },
    {
      week: '36',
      percentSaved: 1.88,
    },
    {
      week: '37',
      percentSaved: -6.02,
    },
    {
      week: '38',
      percentSaved: -6.27,
    },
    {
      week: '39',
      percentSaved: 2.1,
    },
    {
      week: '40',
      percentSaved: 0.03,
    },
    {
      week: '41',
      percentSaved: -5.17,
    },
    {
      week: '42',
      percentSaved: -14.4,
    },
    {
      week: '43',
      percentSaved: 20.45,
    },
    {
      week: '44',
      percentSaved: 23.33,
    },
    {
      week: '45',
      percentSaved: -15.79,
    },
    {
      week: '46',
      percentSaved: -14.25,
    },
    {
      week: '47',
      percentSaved: 18.73,
    },
    {
      week: '48',
      percentSaved: 20.48,
    },
    {
      week: '49',
      percentSaved: 9.39,
    },
    {
      week: '50',
      percentSaved: 25.96,
    },
    {
      week: '51',
      percentSaved: 22.25,
    },
    {
      week: '52',
      percentSaved: 9.36,
    },
  ];
  const correctResponse = [
    [
      12.12,
      3.86,
      50.62,
      17.44,
      29.12,
      -23.5,
      -0.6,
      -24.49,
      -25.1,
      -6.02,
      -5.17,
      -15.79,
      9.39,
    ],
    [
      12.06,
      -11.76,
      -2.08,
      14.8,
      34.91,
      26.37,
      14.68,
      -18.76,
      -37.09,
      -6.27,
      -14.4,
      -14.25,
      25.96,
    ],
    [
      -3.36,
      45.36,
      46.29,
      14.03,
      -21.14,
      -11.18,
      15.39,
      29.32,
      4.49,
      2.1,
      20.45,
      18.73,
      22.25,
    ],
    [
      -12.67,
      53.22,
      37.98,
      34.22,
      1.45,
      -9.13,
      6.82,
      -10.24,
      1.88,
      0.03,
      23.33,
      20.48,
      9.36,
    ],
    [],
  ];
  const resp = { data: saved };
  mockedAxios.get.mockResolvedValue(resp);

  return energyService.getEnergySavedWeekly('Rye barneskole')
    .then((data) => expect(data).toEqual(correctResponse));
});
