<template>
  <div class="about">
    <h1>测试录音</h1>
    <transition name="fade" mode="out-in">
      <button class="btn" @click="startRecord" v-if="!recording" key="start">开始录音</button>
      <button class="btn mgl" @click="stopRecord" v-else key="stop" >结束录音</button>
    </transition>
    <div id="audio" class="audio">
    </div>
  </div>
</template>

<script>
import Record from 'opus-recorder'
let audio
let mp3SizeContent
export default {
  data () {
    return {
      recording: false
    }
  },
  created () {
    this.Record = new Record({
      encoderPath: './libs/opus-recorder/dist/encoderWorker.min.js'
    })
    this.Record.ondataavailable = this.voiceData
  },
  methods: {
    startRecord () {
      this.Record.start()
      this.recording = true
    },
    stopRecord () {
      this.Record.stop()
      console.log(this.Record)
      this.recording = false
    },
    voiceData (data) {
      if (audio) {
        document.getElementById('audio').removeChild(audio)
      }
      if (mp3SizeContent) {
        document.getElementById('audio').removeChild(mp3SizeContent)
      }
      const blob = new Blob([data], { type: 'audio/mp3' })
      console.log(blob)
      audio = document.createElement('audio')
      audio.src = URL.createObjectURL(blob)
      audio.controls = true
      mp3SizeContent = document.createElement('div')
      mp3SizeContent.innerHTML = `mp3大小: ${(Number(blob.size) / 1000).toFixed(2)}kb`
      document.getElementById('audio').appendChild(audio)
      document.getElementById('audio').appendChild(mp3SizeContent)
    }
  }
}
</script>

<style scoped>
  .about {
    padding: 20px;
    position: relative;
  }
  .btn {
    border: 0;
    outline: 0;
    padding: 20px 20px;
    color: #fff;
    border-radius: 15px;
    background: rgb(112, 79, 79);
    position: absolute;
    left: 36%;
  }
  .mgl {
    /* margin-left: 20px; */
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s, transform .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade-enter {
    transform: translateX(30px);
  }
  .fade-leave-active {
    transform: translateX(-30px);
  }

  .audio {
    position: absolute;
    top: 200px;
  }
</style>
