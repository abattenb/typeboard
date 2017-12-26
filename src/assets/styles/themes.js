
/* 0.996 (255/256) do to Chrome forcing transparency on text selection */

const themes = [
  {
    label: 'Light Themes',
    data: [
      {
        id: 'black_white',
        name: 'Black / White',
        palette: {
          '--background-color': 'rgba(255, 255, 255, 0.996)',
          '--text-color': 'rgba(17, 17, 17, 0.996)',
          '--accent-color': 'rgba(205, 205, 205, 0.996)',
        },
      },
      {
        id: 'blue_white',
        name: 'Blue / White',
        palette: {
          '--background-color': 'rgba(252, 252, 255, 0.996)',
          '--text-color': 'rgba(65, 95, 210, 0.996)',
          '--accent-color': 'rgba(180, 190, 240, 0.996)',
        },
      },
      {
        id: 'tangerine_grey',
        name: 'Tangerine / Grey',
        palette: {
          '--background-color': 'rgba(245, 247, 247, 0.996)',
          '--text-color': 'rgba(250, 70, 10, 0.996)',
          '--accent-color': 'rgba(240, 220, 225, 0.996)',
        },
      },
      {
        id: 'grey_grey',
        name: 'Grey /',
        palette: {
          '--background-color': 'rgba(248, 250, 245, 0.996)',
          '--text-color': 'rgba(100, 100, 100, 0.996)',
          '--accent-color': 'rgba(205, 205, 205, 0.996)',
        },
      },
    ],
  },
  {
    label: 'Dark Themes',
    data: [
      {
        id: 'white_black',
        name: 'White / Black',
        palette: {
          '--background-color': 'rgba(17, 17, 17, 0.996)',
          '--text-color': 'rgba(255, 255, 255, 0.996)',
          '--accent-color': 'rgba(100, 100, 100, 0.996)',
        },
      },
      {
        id: 'red_midnight',
        name: 'Red / Midnight',
        palette: {
          '--background-color': 'rgba(15, 15, 32, 0.996)',
          '--text-color': 'rgba(255, 20, 0, 0.996)',
          '--accent-color': 'rgba(70, 55, 50, 0.996)',
        },
      },
      {
        id: 'yellow_coal',
        name: 'Yellow / Coal',
        palette: {
          '--background-color': 'rgba(32, 32, 32, 0.996)',
          '--text-color': 'rgba(255, 238, 0, 0.996)',
          '--accent-color': 'rgba(90, 90, 75, 0.996)',
        },
      },
      {
        id: 'green_black',
        name: 'Green / Black',
        palette: {
          '--background-color': 'rgba(0, 0, 0, 0.996)',
          '--text-color': 'rgba(0, 255, 0, 0.996)',
          '--accent-color': 'rgba(90, 90, 75, 0.996)',
        },
      },
    ],
  },
  {
    label: 'Color Themes',
    data: [
      {
        id: 'grey_tan',
        name: 'Grey / tan',
        palette: {
          '--background-color': 'rgba(204, 200, 175, 0.996)',
          '--text-color': 'rgba(73, 71, 59, 0.996)',
          '--accent-color': 'rgba(177, 172, 152, 0.996)',
        },
      },
      {
        id: 'yellow_pink',
        name: 'Yellow / Pink',
        palette: {
          '--background-color': 'rgba(255, 0, 100, 0.996)',
          '--text-color': 'rgba(255, 255, 0, 0.996)',
          '--accent-color': 'rgba(155, 30, 80, 0.996)',
        },
      },
      {
        id: 'lime_forest',
        name: 'Lime / Forest',
        palette: {
          '--background-color': 'rgba(15, 56, 15, 0.996)',
          '--text-color': 'rgba(155, 188, 15, 0.996)',
          '--accent-color': 'rgba(48, 98, 48, 0.996)',
        },
      },
      {
        id: 'navy_sea',
        name: 'Navy / Sea',
        palette: {
          '--background-color': 'rgba(64, 255, 174, 0.996)',
          '--text-color': 'rgba(20, 17, 91, 0.996)',
          '--accent-color': 'rgba(182, 187, 74, 0.996)',
        },
      },
      {
        id: 'gold_teal',
        name: 'Gold / Teal',
        palette: {
          '--background-color': 'rgba(230, 237, 123, 0.996)',
          '--text-color': 'rgba(3, 133, 163, 0.996)',
          '--accent-color': 'rgba(70, 97, 45, 0.996)',
        },
      },
      {
        id: 'navy_gold',
        name: 'Navy / Gold',
        palette: {
          '--background-color': 'rgba(228, 180, 20, 0.996)',
          '--text-color': 'rgba(15, 80, 135, 0.996)',
          '--accent-color': 'rgba(228, 73, 98, 0.996)',
        },
      },
      {
        id: 'lime_mauve',
        name: 'Lime / Mauve',
        palette: {
          '--background-color': 'rgba(187, 215, 52, 0.996)',
          '--text-color': 'rgba(64, 44, 53, 0.996)',
          '--accent-color': 'rgba(217, 7, 118, 0.996)',
        },
      },
      {
        id: 'sea_royal',
        name: 'Sea / Royal',
        palette: {
          '--background-color': 'rgba(131, 230, 179, 0.996)',
          '--text-color': 'rgba(88, 28, 53, 0.996)',
          '--accent-color': 'rgba(87, 123, 49, 0.996)',
        },
      },
    ],
  },
];

export default themes;
