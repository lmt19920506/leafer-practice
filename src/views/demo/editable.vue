<template>
  <div class="canvas" id="canvas"></div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { Rect, App, Leafer } from "leafer-ui";
import "@leafer-in/editor"; // 导入图形编辑器插件
import '@leafer-in/view'

const init = () => {
  let dom = document.getElementById("canvas");
  const app = new App({
    view: dom,
    editor: {},
    // ground: { type: 'design' }, // 可选
    // tree: {},
    // sky: { type: 'design', usePartRender: false }
  });
  // const background = new Rect({ width: 800, height: 600, fill: 'gray' })
  // const border = new Rect({ x: 200, y: 200, stroke: 'blue', draggable: true, editable: true })
  // app.ground.add(background)
  // app.tree.add(
  //   Rect.one(
  //     { editable: true, fill: "#FEB027", cornerRadius: [20, 0, 0, 20] },
  //     100,
  //     100
  //   )
  // );
  // app.tree.add(
  //   Rect.one(
  //     { editable: true, fill: "#FFE04B", cornerRadius: [0, 20, 20, 0] },
  //     300,
  //     100
  //   )
  // );
  // app.sky.add(border)
  app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))
  setTimeout(() => {

app.tree.zoom('out') 

}, 1000)
};

onMounted(() => {
  nextTick(() => {
    init();
  });
});
</script>

<style lang="scss" scoped>
.canvas {
  width: 900px;
  height: 900px;
  border: 1px solid red;
}
</style>
