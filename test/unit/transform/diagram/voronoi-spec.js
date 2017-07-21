const {
  expect
} = require('chai');
const {
  DataSet,
  getTransform
} = require('../../../../index');

describe('DataView.transform(): diagram.voronoi', () => {
  const dataSet = new DataSet();
  let dataView;
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100
    });
  }

  beforeEach(() => {
    dataView = dataSet.createView('test').source(data);
  });

  it('api', () => {
    expect(getTransform('diagram.voronoi')).to.be.a('function');
    expect(getTransform('voronoi')).to.be.a('function');
  });

  it('default', () => {
    expect(() => {
      dataView.transform({
        type: 'diagram.voronoi',
        as: [ '_x', '_y' ]
      });
    }).to.throw();
    expect(() => {
      dataView.transform({
        type: 'diagram.voronoi',
        x: 'x',
        y: 'y',
        as: [ '_x', '_y', 'extra' ]
      });
    }).to.throw();
  });

  it('voronoi', () => {
    dataView.transform({
      type: 'diagram.voronoi',
      x: 'x',
      y: 'y',
      as: [ '_x', '_y' ]
    });
    const rows = dataView.rows;
    const firstRow = rows[0];
    expect(firstRow._x).to.be.an('array');
    expect(firstRow._y).to.be.an('array');
    expect(firstRow._x.length).to.equal(firstRow._y.length);
  });
});