import * as THREE from 'three-full';
import React from 'react';
import RosterUploader from './components/RosterUploader'
class App extends React.Component {
 
  componentDidMount(){
  //  this.test();
  }

  // test(){
  //   const scene = new THREE.Scene();
  //   window.scene = scene;
  //   const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setClearColor( 0xffffff );
  //   renderer.setSize( window.innerWidth, window.innerHeight );
  //   document.getElementById('root').appendChild( renderer.domElement );
  //   const directionalLight = new THREE.DirectionalLight( 0xffffff, .8 );
  //   scene.add( directionalLight );
  //   const light = new THREE.AmbientLight( 0x505050 ); // soft white light
  //   scene.add( light );
  //   camera.position.z = 5;
  //   const controls = new THREE.OrbitControls( camera, renderer.domElement );
  //   var textureLoader = new THREE.TextureLoader();
  //   var material = new THREE.MeshPhongMaterial({map: map})
  //   const loader = new THREE.OBJLoader();
   
  //   function animate() {
  //       requestAnimationFrame( animate );
  //       controls.update();
  //       renderer.render( scene, camera );
  //   }

  //   loader.load(
  //       require("./assets/canoness.obj"),
  //       function ( object ) {
  //           object.traverse( function ( node ) {
  //               if ( node.isMesh ) node.material = material;
  //           } );
  //           scene.add( object );
            
  //       },
  //       function ( xhr ) {
  //       },
  //       function ( error ) {
  //           console.log( 'An error happened' );
  //       }
  //   );

  //   animate();
  // }

  render() {
    return (
      <RosterUploader/>
    )
  }

}

export default App;
