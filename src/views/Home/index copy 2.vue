<template>
  <div class="box">
    <section class="left">
      <div v-for="node in nodes" :key="node.code">
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
        id="canvas"
        @drop="onDragEnd"
        @dragover="dragover"
      ></div>
    </section>
  </div>
</template>

<script>
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

export default {
  data() {
    return {
      nodes: [
        {
          name: "矩形",
          code: "rect",
        },
        {
          name: "文本",
          code: "text",
        },
      ],
      selectItem: null,
      leafer: null,
      btnWidth: 100,
      btnHeight: 60,
      mousePoint: {
        x: 0,
        y: 0,
      },
      nextId: 0,
    };
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const dom = document.getElementById("canvas");
      const app = new App({
        view: dom,
        // width: 800,
        // height: 700,
        editor: {},
      });
      const box = new Box({
        x: 0,
        y: 0,
        // width: 800,
        // height: 650,
        // stroke: "blue",
        children: [
          {
            tag: "Text",
            width: 800,
            height: 100,
            text: "我是Leafer实例",
            fill: "gray",
            padding: [5, 5],
            textAlign: "center",
            verticalAlign: "middle",
          },
          {
            tag: "Text",
            x: 0,
            y: 25,
            width: 800,
            height: 100,
            text: "请从左侧拖拽元素到页面上",
            fill: "gray",
            padding: [5, 5],
            textAlign: "center",
            verticalAlign: "middle",
          },
        ],
      });
      // leafer.add(box);

      this.leafer = app;
    },
    startDrag(e, node) {
      this.selectItem = node;
      e.dataTransfer.setData("text", JSON.stringify(this.selectItem));
      this.mousePoint = {
        x: e.offsetX,
        y: e.offsetY,
      };
    },
    dragover(e) {
      e.preventDefault();
    },
    onDragEnd(e) {
      e.preventDefault();
      const dt = e.dataTransfer.getData("text");
      const node = JSON.parse(dt);

      let item = null;
      console.log("node---", node);
      switch (node.code) {
        case "rect":
          // item = new Rect({
          //   fill: "skyblue",
          //   stroke: "blue",
          //   strokeWidth: 1,
          //   editable: true,
          // });
          this.leafer.tree.add(
            Rect.one(
              { editable: true, fill: "#FEB027", cornerRadius: [20, 0, 0, 20] },
              e.offsetX,
              e.offsetY,
            )
          );
          break;
        case "text":
          item = new Text({
            text: "文本",
          });
          break;
      }
      // item.set({
      //   id: ++this.nextId,
      //   x: e.offsetX,
      //   y: e.offsetY,
      //   width: 100,
      //   height: 60,
      //   cornerRadius: 5,
      //   editable: true,
      //   draggable: true,
      // });

      // this.leafer.add(item);

      this.selectItem = null;
    },
  },
};
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
