app.disbaleZoom();
debugger;
document
  .querySelector(':root')
  .style.setProperty('--view-height', window.innerHeight + 'px');
window.addEventListener('resize', () =>
  document
    .querySelector(':root')
    .style.setProperty('--view-height', window.innerHeight + 'px')
);

console.log({
  app,
  version,
  fsx,
  utils,
  InputDevice,
  InputListener,
  SensorChannel,
  InkController,
  Brush2D,
  BrushPrototype,
  ShapeFactory,
  BrushGL,
  URIResolver,
  Intersector,
  Selector,
  PathPoint,
  PathPointContext,
  InkBuilder,
  Path,
  InkPath2D,
  Stroke,
  InkModel,
  SpatialContext,
  InkCodec,
  RMSEBasedPrecisionCalculator,
  InkToolCodec,
  Color,
  Polygon,
  Rect,
  Point,
  Matrix,
  PipelineStage,
  BlendMode,
  InkCanvas2D,
  StrokeRenderer2D,
  InkCanvasGL,
  StrokeRendererGL,
  InkPathProducer,
  SplitPointsProducer,
});

addEventListener('DOMContentLoaded', async event => {
  let pkg = await fsx.loadFile('/package.json', 'json');

  document.getElementById('APPName').textContent = pkg.productName;
  document.getElementById('APPVersion').textContent = pkg.version;
  document.getElementById('SDKVersion').textContent = version;

  $('.app').css('visibility', 'hidden');
  await app.init();

  if (!localStorage.getItem('sample')) return;

  layout.init();

  await app.initInkController();
  $('.app').css('visibility', '');
});
