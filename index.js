var pexNodes = require('pex-nodes')
var fs = require('fs')

var projectModules = {
  'hsluv': require('hsluv'),
  '@thi.ng/hdom': require('@thi.ng/hdom'),
  '@thi.ng/paths': require('@thi.ng/paths'),
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
  {
      id: '9WL6TmWE0C',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Add.9WL6TmWE0C.js', 'utf8')
    },
  {
      id: '-Ji1Rx_-CJ',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Camera.-Ji1Rx_-CJ.js', 'utf8')
    },
  {
      id: '2ovjBQUkK3R',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Camera.2ovjBQUkK3R.js', 'utf8')
    },
  {
      id: 'W2a1cz62MLI',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ClickHandler.W2a1cz62MLI.js', 'utf8')
    },
  {
      id: '6GasvznTB',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Context.6GasvznTB.js', 'utf8')
    },
  {
      id: 'egOCTZKZWjy',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Cube.egOCTZKZWjy.js', 'utf8')
    },
  {
      id: 'kKy_ckNLiUV',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Cube.kKy_ckNLiUV.js', 'utf8')
    },
  {
      id: 'OrbJGZ7fmX',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Debug.OrbJGZ7fmX.js', 'utf8')
    },
  {
      id: 'Ck4nPGY3mDf',
      code: fs.readFileSync(__dirname + '/custom/particles-02/DirectionalLight.Ck4nPGY3mDf.js', 'utf8')
    },
  {
      id: 'qPKDwNXCVAi',
      code: fs.readFileSync(__dirname + '/custom/particles-02/DirectionalLight.qPKDwNXCVAi.js', 'utf8')
    },
  {
      id: 'gaLEJTO917k',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Dom Renderer.gaLEJTO917k.js', 'utf8')
    },
  {
      id: 'dj_DuBjn7pZ',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Find Animation By Mesh Name.dj_DuBjn7pZ.js', 'utf8')
    },
  {
      id: '0SV2qY9vc5i',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Find Entity By Component.0SV2qY9vc5i.js', 'utf8')
    },
  {
      id: 'D_Ntqajmylm',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Find Entity By Component.D_Ntqajmylm.js', 'utf8')
    },
  {
      id: 'ZtXPbVFmceq',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Find Entity By Component.ZtXPbVFmceq.js', 'utf8')
    },
  {
      id: '9tVhXYC_I7c',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Find Entity By Name.9tVhXYC_I7c.js', 'utf8')
    },
  {
      id: 'WTKPDy2tJg',
      code: fs.readFileSync(__dirname + '/custom/particles-02/GUI.WTKPDy2tJg.js', 'utf8')
    },
  {
      id: '41Mz_fDQjDq',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Geometry.41Mz_fDQjDq.js', 'utf8')
    },
  {
      id: 'asaqgFueIWA',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Geometry.asaqgFueIWA.js', 'utf8')
    },
  {
      id: 'kTv92U_Qofa',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Geometry.kTv92U_Qofa.js', 'utf8')
    },
  {
      id: 'ytjq8c8bpND',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Geometry.ytjq8c8bpND.js', 'utf8')
    },
  {
      id: '4IyQ0pAbrPk',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Get Entity Component.4IyQ0pAbrPk.js', 'utf8')
    },
  {
      id: 'Ehs1P5PRNN6',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Get Entity Component.Ehs1P5PRNN6.js', 'utf8')
    },
  {
      id: 'fF2LERrX3He',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Get Entity Component.fF2LERrX3He.js', 'utf8')
    },
  {
      id: 'g8GCNzOw261',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Get Entity Component.g8GCNzOw261.js', 'utf8')
    },
  {
      id: 'hrwsswFADJb',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Get Entity Component.hrwsswFADJb.js', 'utf8')
    },
  {
      id: 'pnx2a--pZrV',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Instances from Texture vert.pnx2a--pZrV.js', 'utf8')
    },
  {
      id: 'Ox_EA97Wtcm',
      code: fs.readFileSync(__dirname + '/custom/particles-02/LoadGLTF.Ox_EA97Wtcm.js', 'utf8')
    },
  {
      id: 'RzMqPL1QYy1',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Material.RzMqPL1QYy1.js', 'utf8')
    },
  {
      id: 'S_qRLqhR0f2',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Material.S_qRLqhR0f2.js', 'utf8')
    },
  {
      id: 'gqJPmDN9coO',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Material.gqJPmDN9coO.js', 'utf8')
    },
  {
      id: 'yqmvk8A4Ynj',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Material.yqmvk8A4Ynj.js', 'utf8')
    },
  {
      id: '5UBwX4JvHx',
      code: fs.readFileSync(__dirname + '/custom/particles-02/MipBloom.5UBwX4JvHx.js', 'utf8')
    },
  {
      id: '02Wl8ESWduU',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Panel.02Wl8ESWduU.js', 'utf8')
    },
  {
      id: '6HfEWjf0hG8',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Panel.6HfEWjf0hG8.js', 'utf8')
    },
  {
      id: 'RqCXVEYFoLK',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Particle Mesh Emitter.RqCXVEYFoLK.js', 'utf8')
    },
  {
      id: 'uBUiYpT7py',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Particles.uBUiYpT7py.js', 'utf8')
    },
  {
      id: 'rgm32TVkEuH',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ReflectionProbe.rgm32TVkEuH.js', 'utf8')
    },
  {
      id: 'VRS6DGJ5r',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Render Vertices To Screen.VRS6DGJ5r.js', 'utf8')
    },
  {
      id: 'XiDfoMLV4MJ',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Render Vertices To Screen.XiDfoMLV4MJ.js', 'utf8')
    },
  {
      id: 'z_HCTAVlPHw',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Render Vertices To Texture.z_HCTAVlPHw.js', 'utf8')
    },
  {
      id: 'QrwO6mE3aT',
      code: fs.readFileSync(__dirname + '/custom/particles-02/RenderToTexture.QrwO6mE3aT.js', 'utf8')
    },
  {
      id: 'd0odh0elml5',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Renderer.d0odh0elml5.js', 'utf8')
    },
  {
      id: 'VrKngimwu0',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Resource Manager.VrKngimwu0.js', 'utf8')
    },
  {
      id: 'ASp9veex_Xv',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Sequence.ASp9veex_Xv.js', 'utf8')
    },
  {
      id: 'KdO10uFmDV',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Sequence.KdO10uFmDV.js', 'utf8')
    },
  {
      id: 'dqKYHVVUOQc',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Sequence.dqKYHVVUOQc.js', 'utf8')
    },
  {
      id: 'wFX58YA_4uK',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Sequence.wFX58YA_4uK.js', 'utf8')
    },
  {
      id: 'wl6yqL_oZcc',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Sequence.wl6yqL_oZcc.js', 'utf8')
    },
  {
      id: 'uW6YrtPxm7',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ShowTexture.uW6YrtPxm7.js', 'utf8')
    },
  {
      id: 'VfEg8yxLxJr',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Skybox.VfEg8yxLxJr.js', 'utf8')
    },
  {
      id: 'o5AVV7_PO6',
      code: fs.readFileSync(__dirname + '/custom/particles-02/TEMPLATE Simples Draw Cmd.o5AVV7_PO6.js', 'utf8')
    },
  {
      id: 'FCnHOGWa9In',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Texture HDR.FCnHOGWa9In.js', 'utf8')
    },
  {
      id: 'GsdLqZrcW2',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Texture.GsdLqZrcW2.js', 'utf8')
    },
  {
      id: 'nMbO8t9cRU',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Texture.nMbO8t9cRU.js', 'utf8')
    },
  {
      id: 'wrwoD_YuVw',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Threshold.wrwoD_YuVw.js', 'utf8')
    },
  {
      id: 'SBhIVL93j6',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Time.SBhIVL93j6.js', 'utf8')
    },
  {
      id: '7ptxQKmyTn1',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Transform.7ptxQKmyTn1.js', 'utf8')
    },
  {
      id: 'NEmBETDeP8P',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Transform.NEmBETDeP8P.js', 'utf8')
    },
  {
      id: 'Rg-VyEoptKE',
      code: fs.readFileSync(__dirname + '/custom/particles-02/Transform.Rg-VyEoptKE.js', 'utf8')
    },
  {
      id: 'KbxiCv17DRJ',
      code: fs.readFileSync(__dirname + '/custom/particles-02/data-Sequence.KbxiCv17DRJ.js', 'utf8')
    },
  {
      id: 'RIESdSHQjSG',
      code: fs.readFileSync(__dirname + '/custom/particles-02/data-Sequence.RIESdSHQjSG.js', 'utf8')
    },
  {
      id: 'C3PfWvan4ci',
      code: fs.readFileSync(__dirname + '/custom/particles-02/dataProvider.C3PfWvan4ci.js', 'utf8')
    },
  {
      id: 'jZkGbAZcTP5',
      code: fs.readFileSync(__dirname + '/custom/particles-02/state-Switch.jZkGbAZcTP5.js', 'utf8')
    },
  {
      id: 'yfQS7YFyx4r',
      code: fs.readFileSync(__dirname + '/custom/particles-02/state-Switch.yfQS7YFyx4r.js', 'utf8')
    },
  {
      id: 'stHrzvZUH5P',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Button.stHrzvZUH5P.js', 'utf8')
    },
  {
      id: '8HuGz0-2hdw',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Column.8HuGz0-2hdw.js', 'utf8')
    },
  {
      id: '9gBkxNYjcJV',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Column.9gBkxNYjcJV.js', 'utf8')
    },
  {
      id: 'ZJNpQcQ4qJs',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Column.ZJNpQcQ4qJs.js', 'utf8')
    },
  {
      id: '3_sJEWq1vOr',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Image.3_sJEWq1vOr.js', 'utf8')
    },
  {
      id: 'cNMYOW9cKgX',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Image.cNMYOW9cKgX.js', 'utf8')
    },
  {
      id: '2vKdXql-1dW',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Label.2vKdXql-1dW.js', 'utf8')
    },
  {
      id: 'EGhrLK4iHbc',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Label.EGhrLK4iHbc.js', 'utf8')
    },
  {
      id: 'EOrXd0O4ifx',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Label.EOrXd0O4ifx.js', 'utf8')
    },
  {
      id: 'M_DaAHpEOHn',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Label.M_DaAHpEOHn.js', 'utf8')
    },
  {
      id: 'Tgt0W9XMx8s',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Label.Tgt0W9XMx8s.js', 'utf8')
    },
  {
      id: '_f62IKNBD4b',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Label._f62IKNBD4b.js', 'utf8')
    },
  {
      id: 'wapic-oD1yP',
      code: fs.readFileSync(__dirname + '/custom/particles-02/ui-Row.wapic-oD1yP.js', 'utf8')
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
