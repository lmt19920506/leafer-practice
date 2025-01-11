<template>
  <el-container>
    <el-aside style="border: 1px solid skyblue; padding: 10px">
      <el-space>
        <template v-for="node in nodes" :key="node.code">
          <el-button
            draggable="true"
            @dragstart="startDrag($event, node)"
            :style="{ width: btnWidth + 'px', height: btnHeight + 'px' }"
            >{{ node.name }}</el-button
          >
        </template>
      </el-space>
    </el-aside>
    <el-main style="padding-top: 0px">
      <canvas
        id="pageDesigner2"
        :width="pageWidth"
        height="650"
        @drop="onDragEnd"
        @dragover="dragover"
      ></canvas>
    </el-main>
  </el-container>
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
      pageWidth: 1080,
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
      const leafer = new Leafer({
        view: "pageDesigner2",
        width: 800,
        height: 700,
        editor: {},
      }); //触发不了drop事件
      const box = new Box({
        x: 0,
        y: 0,
        width: 800,
        height: 650,
        stroke: "blue",
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
      leafer.add(box);

      this.leafer = leafer;
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
      switch (node.code) {
        case "rect":
          item = new Rect({
            fill: "skyblue",
            stroke: "blue",
            strokeWidth: 1,
          });
          break;
        case "text":
          item = new Text({
            text: "文本",
          });
          break;
      }
      item.set({
        id: ++this.nextId,
        x: e.offsetX,
        y: e.offsetY,
        width: 100,
        height: 60,
        cornerRadius: 5,
        editable: true,
        draggable: true,
      });

      this.leafer.add(item);

      this.selectItem = null;
    },
  },
};
</script>
