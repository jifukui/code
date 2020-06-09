<template>
  <div>
    <h3>简单的场景</h3>
    <div id="sence"></div>
    <input type="button" @click="display" value="显示场景" />
  </div>
</template>
<script>
import * as THREE from "three";
export default {
  methods: {
    display: function() {
      let dom = document.getElementById("sence");
      let sense = new THREE.Scene();
      //相机
      let camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      //渲染器
      let renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xeeeeee);
      renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);
      let axes = new THREE.AxesHelper(20);
      sense.add(axes);
      let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
      let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
      //平面
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 15;
      plane.position.y = 0;
      plane.position.z = 0;
      sense.add(plane);
      let cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
      let cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });
      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = -4;
      cube.position.y = 3;
      cube.position.z = 0;
      sense.add(cube);
      let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      let sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
      });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.x = 20;
      sphere.position.y = 4;
      sphere.position.z = 2;
      sense.add(sphere);
      camera.position.x = -30;
      camera.position.y = 40;
      camera.position.z = 30;
      camera.lookAt(sense.position);
      dom.append(renderer.domElement);
      renderer.render(sense, camera);
    }
  }
};
</script>
