<template>
  <div id="background-container" :class="containerClass">
    <flat-surface-shader
      class="shader"
      type="canvas"
      :mesh="{
        ambient: '#BFA7DB', // Default
        diffuse: '#F2B385', // Default
        width: this.myMesh.width, // Triangle Width
        height: this.myMesh.height, // Triangle Height
        depth: 10, // Transparency of the triangles
        segments: this.myMesh.segments, // Number of triangles to display in 1 row
        slices: this.myMesh.slices, // Number of triangles to display in 1 column
        xRange: 0.6, // Wideness of the triangles in X Position
        yRange: 0.5, // Wideness of the triangles in Y Position
        zRange: 1.0, // Wideness of the triangles in Z Position
        speed: 0.00025, // Speed of the moving traingles
      }"
      :light="{
        autopilot: true, // Set this to true if you want the light to follow your mouse cursor
        ambient: '#F9BB22',
        diffuse: '#FFC22C',
        count: 1, // Contrast
        zOffset: 180,
        xyScalar: 1,
        speed: 0.0005,
        gravity: 1200,
        dampening: 0.15,
        minLimit: 8,
        maxLimit: null,
        minDistance: 20,
        maxDistance: 400,
        draw: false, // Set to true if you want to just draw a background image (static).
      }"
    >
    </flat-surface-shader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class FssHome extends Vue {
  window = {
    width: 0,
    height: 0,
    ratio: 0,
  };
  myMesh = {
    width: 0,
    height: 0,
    segments: 0,
    slices: 0,
  };
  containerClass: string = '';

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
    this.window.ratio = this.window.width / this.window.height;
    if (this.window.width >= 960) {
      (this.containerClass = 'containerLeft'),
        (this.myMesh.width = 0.5),
        (this.myMesh.height = 1.2),
        (this.myMesh.segments = 6),
        (this.myMesh.slices = 8);
    }
    if (this.window.width < 960) {
      (this.containerClass = 'containerTop'),
        (this.myMesh.width = 1.2),
        (this.myMesh.height = 0.5),
        (this.myMesh.segments = 8),
        (this.myMesh.slices = 6);
    }
  }
}
</script>

<style scoped>
.shader {
  width: 100vw;
  height: 100vh;
}
noindex:-o-prefocus,
.background-container {
  display: none;
} /* Hide background in old Opera because of lags */

#background-container {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
}
.containerLeft {
  -webkit-transform: translate(-33%, 0px);
  -ms-transform: translate(-33%, 0px);
  transform: translate(-33%, 0px);
}
.containerTop {
  -webkit-transform: translate(0%, -29vh);
  -ms-transform: translate(0%, -29vh);
  transform: translate(0%, -29vh);
}
</style>
