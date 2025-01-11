<template>
  <div class="box">
    <section class="left">
      <div v-for="node in nodes" :key="node.type">
        <el-button draggable="true" @dragstart="startDrag($event, node)">{{
          node.name
        }}</el-button>
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
  ZoomEvent,
  RotateEvent,
} from "leafer-ui";
import "@leafer-in/editor";
import "@leafer-in/text-editor";
import "@leafer-in/view";
import "@leafer-in/viewport"; // 导入视口插件
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
    url: "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
    width: 100,
    height: 100
  },
  {
    name: "图片",
    type: "image",
    url: "http://gips1.baidu.com/it/u=1658389554,617110073&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960",
    width: 200,
    height: 200
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
    tree: {
      type: "viewport", // 给tree层添加视口
    },
    zoom: {
      min: 0.9,
      max: 2,
    },
    wheel: {
      zoomMode: true,
    },
    editor: {},
  });
  // 获取画布缩放比例
  app.on(ZoomEvent.ZOOM, function (e) {
    console.log("zoom---", e.scale);
  });
  leafer.value = app;

  // leafer.value.editor.on(EditorEvent.SELECT, (e) =>{
  //   console.log('select---', e.editor)
  // })
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
      addRect(e);
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
      addImage(e, node.width, node.height, node.url);
  }

  selectItem = null;
};

const addRect = (e) => {
  leafer.value.tree.add(
    Rect.one(
      {
        editable: true,
        fill: "red",
        cornerRadius: [20, 0, 0, 20],
        event: {
          click: function (e) {
            console.log("click---", e.current);
            e.current.fill = "blue";
          },
        },
      },
      e.offsetX,
      e.offsetY
    )
  );
};
const addImage = (e, width, height, url) => {
  const rect = new Rect({
    x: e.offsetX,
    y: e.offsetY,
    width: width,
    height: height,
    fill: {
      type: "image",
      url: url,
      mode: "stretch",
    },
    event: {
      // 点击事件
      click: function (e) {
        const rect = e.current;
        console.log("Rect信息:", {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          fill: rect.fill,
          cornerRadius: rect.cornerRadius,
        });
      },
      // 拖拽事件
      drag: function (e) {
        console.log("drag---", e.current.x, e.current.offsetX);
      },
      rotate: function (e) {
        console.log("rotate---", e);
      },
    },
    draggable: true,
    editable: true,
  });
  leafer.value.tree.add(rect);
  rect.on(RotateEvent.ROTATE, (e) => {
    console.log("rotate", e);
  });
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
