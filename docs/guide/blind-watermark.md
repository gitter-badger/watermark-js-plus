---
layout: doc
---
# Blind watermark

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { BlindWatermark } from '../../src';
import { useData } from 'vitepress';

const { isDark } = useData();
const app = getCurrentInstance();
const decodeBlindImage = ref('');

// text blind watermark
const textBlindWatermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: 'The text blind watermark added successfully!',
      type: 'success'
    });
  }
});
const handleAddTextBlindWatermark = () => {
  if (isDark.value) {
    textBlindWatermark.options.fontColor = '#fff'
  }
  textBlindWatermark.create();
};
const handleRemoveTextBlindWatermark = () => {
  textBlindWatermark.destroy();
};

// multiline blind text watermark
const multiLineTextBlindWatermark = new BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my multiline blind watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: 'The multiline text blind watermark added successfully!',
      type: 'success'
    });
  }
});
const handleAddMultiLineTextBlindWatermark = () => {
  if (isDark.value) {
    multiLineTextBlindWatermark.options.fontColor = '#fff'
  }
  multiLineTextBlindWatermark.create();
};
const handleRemoveMultiLineTextBlindWatermark = () => {
  multiLineTextBlindWatermark.destroy();
};

// image blind watermark
const imageBlindWatermark = new BlindWatermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  imageWidth: 200,
  // imageHeight: 20,
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '!The image blind watermark added successfully',
      type: 'success'
    });
  }
});
const handleAddImageBlindWatermark = () => {
  imageBlindWatermark.create();
};
const handleRemoveImageBlindWatermark = () => {
  imageBlindWatermark.destroy();
};

// rich text blind watermark
const richTextBlindWatermark = new BlindWatermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">The watermark is so <span style="color: #f00">good</span>.</div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: 'The rich text blind watermark added successfully!',
      type: 'success'
    });
  }
});
const handleAddRichTextBlindWatermark = () => {
  richTextBlindWatermark.create();
};
const handleRemoveRichTextBlindWatermark = () => {
  richTextBlindWatermark.destroy();
};

// decode blind watermark
const handleSuccess = (uploadFile) => {
  BlindWatermark.decode({
    ...(isDark.value ? {
      compositeOperation: 'overlay',
      fillColor: '#fff',
    } : {}),
    url: uploadFile.url,
    onSuccess: (imageBase64) => {
      decodeBlindImage.value = imageBase64
    }
  });
}
</script>

## Text Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-space>
  <VPButton text="Add Text Blind Watermark" @click="handleAddTextBlindWatermark"></VPButton>
  <VPButton text="Remove Text Blind Watermark" @click="handleRemoveTextBlindWatermark"></VPButton>
</el-space>

## Multiline Text Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my multiline blind watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-space>
  <VPButton text="Add Multiline Text Blind Watermark" @click="handleAddMultiLineTextBlindWatermark"></VPButton>
  <VPButton text="Remove Multiline Text Blind Watermark" @click="handleRemoveMultiLineTextBlindWatermark"></VPButton>
</el-space>

## Image Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'image',
  content: 'http://upic-service.test.upcdn.net/uPic/github-JxMIKf.png',
  width: 300,
  height: 300,
  imageWidth: 100, // image width
  // imageHeight: 20, // image height
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-space>
  <VPButton text="Add Image Blind Watermark" @click="handleAddImageBlindWatermark"></VPButton>
  <VPButton text="Remove Image Blind Watermark" @click="handleRemoveImageBlindWatermark"></VPButton>
</el-space>

## Rich Text Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">The watermark is so <span style="color: #f00">good</span>.</div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-space>
  <VPButton text="Add RichText Blind Watermark" @click="handleAddRichTextBlindWatermark"></VPButton>
  <VPButton text="Remove Rich Text Blind Watermark" @click="handleRemoveRichTextBlindWatermark"></VPButton>
</el-space>

## Decode Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

BlindWatermark.decode({
  url: uploadFile.url, // image url
  onSuccess: (imageBase64) => {
    // success callback
  }
});
```

<div>
  <el-upload
    list-type="picture-card"
    accept="image/*"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="handleSuccess"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-image
    v-if="decodeBlindImage"
    style="width: 400px; height: 400px;margin-top: 20px;"
    :src="decodeBlindImage"
    :preview-src-list="[decodeBlindImage]"
    fit="cover"
  />
</div>

[//]: # (<div style="position: relative;">)

[//]: # (  <div style="position: absolute;top:0;bottom: 0;left: 0;right: 0;mix-blend-mode: color-burn;background: #000;"></div>)

[//]: # (  <img width="200" src="http://upic-service.test.upcdn.net/uPic/iShot_2022-11-28_10.35.29-RP6dBG.png" alt="">)

[//]: # (</div>)
