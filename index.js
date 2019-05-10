var pexNodes = require('pex-nodes')
var fs = require('fs')

var projectModules = {
  '@thi.ng/paths': require('@thi.ng/paths'),
  '@thi.ng/hdom': require('@thi.ng/hdom'),
  'canvas-screenshot': require('canvas-screenshot'),
  'fit-rect': require('fit-rect'),
  'pex-cam': require('pex-cam'),
  'pex-color': require('pex-color'),
  'pex-context': require('pex-context'),
  'pex-geom': require('pex-geom'),
  'pex-gui': require('pex-gui'),
  'pex-io': require('pex-io'),
  'pex-math': require('pex-math'),
  'pex-nodes': require('pex-nodes'),
  'pex-random': require('pex-random'),
  'pex-renderer': require('pex-renderer'),
  'primitive-cube': require('primitive-cube'),
  'primitive-sphere': require('primitive-sphere'),
}

var projectTemplates = [

]

var customNodes = [
  {
      id: 'LOGUPwAeGL',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Add.LOGUPwAeGL.js', 'utf8')
    },
  {
      id: 'ViZ_R-BjRJ',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Camera.ViZ_R-BjRJ.js', 'utf8')
    },
  {
      id: 'iTkXINlqB',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Camera.iTkXINlqB.js', 'utf8')
    },
  {
      id: 'lfvoZf6YcH',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ClickHandler.lfvoZf6YcH.js', 'utf8')
    },
  {
      id: 'AID2CKnOo',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Context.AID2CKnOo.js', 'utf8')
    },
  {
      id: 'ItWiWIyUOr',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Cube.ItWiWIyUOr.js', 'utf8')
    },
  {
      id: 'qstFZ3ND1N',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Cube.qstFZ3ND1N.js', 'utf8')
    },
  {
      id: 'kfmT-VyWHf',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Debug.kfmT-VyWHf.js', 'utf8')
    },
  {
      id: 'TfqL0XnSj',
      code: fs.readFileSync(__dirname + '/custom/particles-01/DirectionalLight.TfqL0XnSj.js', 'utf8')
    },
  {
      id: 'p6zfpEiRx',
      code: fs.readFileSync(__dirname + '/custom/particles-01/DirectionalLight.p6zfpEiRx.js', 'utf8')
    },
  {
      id: 'W-5_YiFRa',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Dom Renderer.W-5_YiFRa.js', 'utf8')
    },
  {
      id: 'EgRWSwy1Q',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Find Animation By Mesh Name.EgRWSwy1Q.js', 'utf8')
    },
  {
      id: '0CAbaIHKtq',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Find Entity By Component.0CAbaIHKtq.js', 'utf8')
    },
  {
      id: '3L-JO258b',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Find Entity By Component.3L-JO258b.js', 'utf8')
    },
  {
      id: 'ay1WFBlgO',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Find Entity By Component.ay1WFBlgO.js', 'utf8')
    },
  {
      id: '0Q-DaCaqG',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Find Entity By Name.0Q-DaCaqG.js', 'utf8')
    },
  {
      id: 'bN_TPJUmkx',
      code: fs.readFileSync(__dirname + '/custom/particles-01/GUI.bN_TPJUmkx.js', 'utf8')
    },
  {
      id: '50TwoUPpb',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Geometry.50TwoUPpb.js', 'utf8')
    },
  {
      id: 'ACWJ0v2zy',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Geometry.ACWJ0v2zy.js', 'utf8')
    },
  {
      id: 'QxGk9NDyBu',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Geometry.QxGk9NDyBu.js', 'utf8')
    },
  {
      id: 'mFqmeJMvKB',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Geometry.mFqmeJMvKB.js', 'utf8')
    },
  {
      id: '8dEAG2le1',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Get Entity Component.8dEAG2le1.js', 'utf8')
    },
  {
      id: 'NYYj7Bt3G',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Get Entity Component.NYYj7Bt3G.js', 'utf8')
    },
  {
      id: 'Pxcq395gV',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Get Entity Component.Pxcq395gV.js', 'utf8')
    },
  {
      id: 'd5pJMZ84g',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Get Entity Component.d5pJMZ84g.js', 'utf8')
    },
  {
      id: 'oEv8tyhV_',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Get Entity Component.oEv8tyhV_.js', 'utf8')
    },
  {
      id: 'LmiNHAvQn',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Instances from Texture vert.LmiNHAvQn.js', 'utf8')
    },
  {
      id: 'q7QFF56vh',
      code: fs.readFileSync(__dirname + '/custom/particles-01/LoadGLTF.q7QFF56vh.js', 'utf8')
    },
  {
      id: '9YCQkxrSw',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Material.9YCQkxrSw.js', 'utf8')
    },
  {
      id: 'Fac77vXLm',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Material.Fac77vXLm.js', 'utf8')
    },
  {
      id: 'R45ptrRXz',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Material.R45ptrRXz.js', 'utf8')
    },
  {
      id: 'yydyP3kPmt',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Material.yydyP3kPmt.js', 'utf8')
    },
  {
      id: 'q6XSMOOEpQ',
      code: fs.readFileSync(__dirname + '/custom/particles-01/MipBloom.q6XSMOOEpQ.js', 'utf8')
    },
  {
      id: 'vCX-UMsiT',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Panel.vCX-UMsiT.js', 'utf8')
    },
  {
      id: 'xvJwM5yDv',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Panel.xvJwM5yDv.js', 'utf8')
    },
  {
      id: 'EoXePk7Li',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Particle Mesh Emitter.EoXePk7Li.js', 'utf8')
    },
  {
      id: 'w2H9_iUCJW',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Particles.w2H9_iUCJW.js', 'utf8')
    },
  {
      id: 'pdnE2A28V-',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ReflectionProbe.pdnE2A28V-.js', 'utf8')
    },
  {
      id: 'kmeUdRPYe',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Render Vertices To Screen.kmeUdRPYe.js', 'utf8')
    },
  {
      id: '371lPzglU',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Render Vertices To Texture.371lPzglU.js', 'utf8')
    },
  {
      id: 'pevpfF8qRN',
      code: fs.readFileSync(__dirname + '/custom/particles-01/RenderToTexture.pevpfF8qRN.js', 'utf8')
    },
  {
      id: 'h_iXQdLT6',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Renderer.h_iXQdLT6.js', 'utf8')
    },
  {
      id: '9ecDLG0GQk',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Resource Manager.9ecDLG0GQk.js', 'utf8')
    },
  {
      id: '-B-qqbe1MT',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Sequence.-B-qqbe1MT.js', 'utf8')
    },
  {
      id: '8U0sxHq_mz',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Sequence.8U0sxHq_mz.js', 'utf8')
    },
  {
      id: 'Iau6gvQO1',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Sequence.Iau6gvQO1.js', 'utf8')
    },
  {
      id: 'YNNQIAL7P',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Sequence.YNNQIAL7P.js', 'utf8')
    },
  {
      id: 'Ze7HgZ2Vq-',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Sequence.Ze7HgZ2Vq-.js', 'utf8')
    },
  {
      id: 'x32OtJbnYx',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ShowTexture.x32OtJbnYx.js', 'utf8')
    },
  {
      id: 'n7qdLwW1OX',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Skybox.n7qdLwW1OX.js', 'utf8')
    },
  {
      id: 'JSXSDA66xl',
      code: fs.readFileSync(__dirname + '/custom/particles-01/TEMPLATE Simples Draw Cmd.JSXSDA66xl.js', 'utf8')
    },
  {
      id: '_rKc1og68k',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Texture HDR._rKc1og68k.js', 'utf8')
    },
  {
      id: 'RQkbZBSqCz',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Texture.RQkbZBSqCz.js', 'utf8')
    },
  {
      id: 'jI_R_9jWnt',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Texture.jI_R_9jWnt.js', 'utf8')
    },
  {
      id: 'o76SMQkvLK',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Threshold.o76SMQkvLK.js', 'utf8')
    },
  {
      id: '_tzI7jJi_D',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Time._tzI7jJi_D.js', 'utf8')
    },
  {
      id: '5q_Xph5uJ',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Transform.5q_Xph5uJ.js', 'utf8')
    },
  {
      id: 'lLkkzDMkC',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Transform.lLkkzDMkC.js', 'utf8')
    },
  {
      id: 'rQE54YoVJ',
      code: fs.readFileSync(__dirname + '/custom/particles-01/Transform.rQE54YoVJ.js', 'utf8')
    },
  {
      id: '25buLl4N7',
      code: fs.readFileSync(__dirname + '/custom/particles-01/data-Sequence.25buLl4N7.js', 'utf8')
    },
  {
      id: 'AFt3PzD53',
      code: fs.readFileSync(__dirname + '/custom/particles-01/data-Sequence.AFt3PzD53.js', 'utf8')
    },
  {
      id: 'FguiEpreP',
      code: fs.readFileSync(__dirname + '/custom/particles-01/dataProvider.FguiEpreP.js', 'utf8')
    },
  {
      id: '4j5J702r4',
      code: fs.readFileSync(__dirname + '/custom/particles-01/state-Switch.4j5J702r4.js', 'utf8')
    },
  {
      id: 'SNq2q8Tqw',
      code: fs.readFileSync(__dirname + '/custom/particles-01/state-Switch.SNq2q8Tqw.js', 'utf8')
    },
  {
      id: 'r3Vwc7eWb',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Button.r3Vwc7eWb.js', 'utf8')
    },
  {
      id: 'ILxniEa3o5',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Column.ILxniEa3o5.js', 'utf8')
    },
  {
      id: 'Qw8g1HCsRW',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Column.Qw8g1HCsRW.js', 'utf8')
    },
  {
      id: 'yMI_dPrTEI',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Column.yMI_dPrTEI.js', 'utf8')
    },
  {
      id: '2aumIIdHNA',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Image.2aumIIdHNA.js', 'utf8')
    },
  {
      id: 'XhjmLL6Wwy',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Image.XhjmLL6Wwy.js', 'utf8')
    },
  {
      id: '0cQElQv9H',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Label.0cQElQv9H.js', 'utf8')
    },
  {
      id: '1xX4L8jDC6',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Label.1xX4L8jDC6.js', 'utf8')
    },
  {
      id: 'FVTs1LoeK',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Label.FVTs1LoeK.js', 'utf8')
    },
  {
      id: 'pIDPlbxjDo',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Label.pIDPlbxjDo.js', 'utf8')
    },
  {
      id: 'rm69kAj9r',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Label.rm69kAj9r.js', 'utf8')
    },
  {
      id: 'wOxgrwlVm',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Label.wOxgrwlVm.js', 'utf8')
    },
  {
      id: 'lcB3-MPEWJ',
      code: fs.readFileSync(__dirname + '/custom/particles-01/ui-Row.lcB3-MPEWJ.js', 'utf8')
    },
]

pexNodes({
  projectConfig: require('./project.json'),
  userConfig: require('./user.json'),
  packageJson: require('./package.json'),
  projectModules: projectModules,
  nodeTemplates: projectTemplates,
  customNodes: customNodes
})
