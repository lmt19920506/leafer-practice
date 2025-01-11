<template>
  <div class="box">
    <section class="left">
      <div v-for="node in nodes" :key="node.type">
        <el-button
          draggable="true"
          @dragstart="startDrag($event, node)"
          :style="{ width: btnWidth + 'px', height: btnHeight + 'px' }"
          >{{ node.name }}</el-button
        >
      </div>
    </section>
    <section class="right">
      <div
        class="leafer-canvas"
        id="canvas-main"
        @drop="onDragEnd"
        @dragover="dragover"
      ></div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import {
  App,
  Leafer,
  Rect,
  Text,
  Box,
  Group,
  DropEvent,
  DragEvent,
  Bounds,
  Point,
  UI,
  PointerEvent,
} from "leafer-ui";
import "@leafer-in/editor";
import "@leafer-in/text-editor";
const nodes = [
  {
    name: "矩形",
    type: "rect",
  },
  {
    name: "文本",
    type: "text",
  },
  {
    name: "图片",
    type: "image",
  },
];
let selectItem = null;
let leafer = ref(null);
let mousePoint = {
  x: 0,
  y: 0,
};
const initCanvas = () => {
  const app = new App({
    view: "canvas-main",
    ground: { type: 'design' }, // 可选
    editor: {},
  });
  // app.ground = app.addLeafer({ type: 'design' })
  // app.ground.add(background)
  leafer.value = app;
};
const startDrag = (e, node) => {
  selectItem = node;
  e.dataTransfer.setData("text", JSON.stringify(selectItem));
  mousePoint = {
    x: e.offsetX,
    y: e.offsetY,
  };
};
const dragover = (e) => {
  e.preventDefault();
};
const onDragEnd = (e) => {
  e.preventDefault();
  const dt = e.dataTransfer.getData("text");
  const node = JSON.parse(dt);

  let item = null;
  console.log("node---", node);
  switch (node.type) {
    case "rect":
      // item = new Rect({
      //   fill: "skyblue",
      //   stroke: "blue",
      //   strokeWidth: 1,
      //   editable: true,
      // });
      leafer.value.tree.add(
        Rect.one(
          { editable: true, fill: "#FEB027", cornerRadius: [20, 0, 0, 20] },
          e.offsetX,
          e.offsetY
        )
      );
      break;
    case "text":
      leafer.value.tree.add(
        new Text({
          x: e.offsetX,
          y: e.offsetY,
          fill: "rgb(50,205,121)",
          text: "Welcome to LeaferJS",
          draggable: true,
          editable: true,
        })
      );
      break;
    case "image":
      leafer.value.tree.add(
        new Rect({
          x: e.offsetX,
          y: e.offsetY,
          width: 200,
          height: 200,
          fill: {
            type: "image",
            url: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
            mode: "stretch",
          },
          draggable: true,
          editable: true,
        })
      );
  }

  selectItem = null;
};

onMounted(() => {
  initCanvas();
});
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  /* background: pink; */
  display: flex;
  justify-content: space-between;
  .left {
    width: 200px;
    height: 100%;
    border: 1px solid #dedede;
  }
  .right {
    width: calc(100% - 210px);
    height: 100%;
    border: 1px solid #dedede;
    display: flex;
    justify-content: center;
    align-items: center;
    .leafer-canvas {
      width: 800px;
      height: 800px;
      border: 1px solid red;
    }
  }
}
</style>
