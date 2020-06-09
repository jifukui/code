<template>
  <div>
    <h3>一个简单的动画</h3>
    <div id="sence"></div>
    <input type="button" @click="display" value="显示" />
  </div>
</template>
<script>
import * as THREE from "three";
import { Stats } from "../../js/stats.js";
export default {
  methods: {
    display: function() {
      var stats = initStats();
      let dom = document.getElementById("sence");
      //场景
      let sense = new THREE.Scene();
      //相机
      let camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      //渲染器
      let renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xeeeeee);
      renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);
      renderer.shadowMap.enabled = true;
      //var axes=new THREE.AxesHelper(20);
      //sense.add(axes);
      //设置平面
      let planeGeometry = new THREE.PlaneGeometry(60, 20);
      // eslint-disable-next-line no-undef
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 15;
      plane.position.y = 0;
      plane.position.z = 0;
      plane.receiveShadow = true;
      sense.add(plane);

      //设置方块
      let cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
      let cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
      });
      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = -4;
      cube.position.y = 3;
      cube.position.z = 0;
      cube.castShadow = true;
      sense.add(cube);
      //设置球体
      let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      let sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
      });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.x = 20;
      sphere.position.y = 4;
      sphere.position.z = 2;
      sphere.castShadow = true;
      sense.add(sphere);
      //设置光源
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, -10);
      spotLight.castShadow = true;
      sense.add(spotLight);

      //设置相机
      camera.position.x = -30;
      camera.position.y = 40;
      camera.position.z = 30;
      camera.lookAt(sense.position);

      dom.append(renderer.domElement);
      renderer.render(sense, camera);

      var step = 0;
      renderScene();

      // eslint-disable-next-line no-unused-vars
      function renderScene() {
        console.log("render");
        stats.update();
        // rotate the cube around its axes
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;

        // bounce the sphere up and down
        step += 0.04;
        sphere.position.x = 20 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);
        renderer.render(sense, camera);
      }

      function initStats() {
        var stats = new Stats();

        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        var dom = window.document.querySelector("div");
        dom.appendChild(stats.domElement);

        return stats;
      }
    }
  }
};
</script>
