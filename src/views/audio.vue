<template>
  <div class="about">
    <h1>测试录音</h1>
    <div class="record-c">
      <transition name="fade" mode="out-in">
        <button class="btn" @click="startRecord" v-if="!recording" key="start">开始录音</button>
        <button class="btn mgl" @click="stopRecord" v-else key="stop" >结束录音</button>
      </transition>
    </div>
    <div id="audio" class="audio">
    </div>
  </div>
</template>

<script>
import RecordRTC from 'recordrtc'
let audio
let mp3SizeContent
export default {
  data () {
    return {
      recording: false
    }
  },
  created () {

  },
  methods: {
    record () {
      const media = navigator.mediaDevices.getUserMedia({ audio: true })
      media.then(this.startUserMedia.bind(this)).catch(this.onUserMediaError.bind(this))
      return media
    },
    startUserMedia (stream) {
      this.RecordRTC = RecordRTC(stream, { type: 'audio' })
      return stream
    },
    onUserMediaError () {},
    startRecord () {
      this.recording = true
      this.record().then(() => {
        this.RecordRTC.startRecording()
      })
    },
    stopRecord () {
      this.recording = false
      this.RecordRTC.stopRecording((data) => {
        console.log(data)
        const blob = this.RecordRTC.getBlob()
        this.voiceData(blob)
      })
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
  .record-c {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
  }
  .btn {
    border: 0;
    outline: 0;
    padding: 20px 20px;
    color: #fff;
    border-radius: 15px;
    background: rgb(112, 79, 79);
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    left: 0;
    right: 0;
    top: 200px;
  }
</style>
