<template>
  <div style="min-height: 80px; flex-shrink: 0;" v-if="$s.isLogged"></div>
  <footer v-if="$s.isLogged">
    <div class="tabs">
      <input type="radio" id="radio-1" name="tabs">
      <label class="tab" for="radio-1" @click="selectTab('players')">
        <span class="material-symbols-outlined">
          person_add
        </span>
      </label>

      <input type="radio" id="radio-2" name="tabs" checked>
      <label class="tab" for="radio-2" @click="selectTab('home')">
        <div class="mainBtn-container" :class="{ active: $route.name === 'home' }">
          <div class="sphere-tennis"></div>
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
        </div>

      </label>

      <input type="radio" id="radio-3" name="tabs">
      <label class="tab" for="radio-3" @click="selectTab('settings')">
        <span class="material-symbols-outlined">
          settings
        </span>
      </label>

      <span class="glider"></span>
    </div>
  </footer>
</template>


<script>
export default {
  data() {
    return {}
  },
  methods: {
    selectTab(name) {
      this.$s.selectedTab = name
      this.$router.push({ name });
    }
  }
}
</script>


<style lang="scss" scoped>
footer {
  .tabs {
    display: flex;
    position: relative;
    justify-content: space-evenly;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
    padding: 0.75rem;
    border-radius: 99px;
    width: fit-content;
    margin: 0 auto;
  }

  .tabs * {
    z-index: 2;
  }

  input[type="radio"] {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 80px;
    font-size: .8rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
    position: relative;
    z-index: 2;
  }

  input[type="radio"]:checked+label {
    color: #0866E3;
  }

  input#radio-1:checked~.glider {
    left: calc(0% + 52px); // 40 = metà tab
    transform: translate(-50%, -50%);
  }

  input#radio-2:checked~.glider {
    left: calc(50%); // centro del contenitore
    transform: translate(-50%, -50%);
  }

  input#radio-3:checked~.glider {
    left: calc(100% - 52px); // 100% meno metà tab
    transform: translate(-50%, -50%);
  }

  .glider {
    position: absolute;
    height: 40px;
    width: 40px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  .mainBtn-container {
    position: relative;
    width: 32px;
    height: 32px;
    perspective: 100px;
    transform-style: preserve-3d;

    .sphere-tennis {
      position: absolute;
      overflow: hidden;
      height: 24px;
      width: 24px;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      background-color: #cccc00;
      background: radial-gradient(ellipse at center, #cccc00 0%, darken(#cccc00, 15) 100%);
      box-sizing: border-box;
      transform: translate(-50%, -50%) rotate(30deg);
      box-shadow: 10px 20px 25px 10px rgba(#000, .2);

      animation: pulse 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:before,
      &:after {
        content: '';
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
        border: 1.4px solid #fff;
        border-radius: 50%;
        box-sizing: border-box;
      }

      &:before {
        right: 70%;
      }

      &:after {
        left: 70%;
      }
    }

    .ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(204, 204, 0, 0.7);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(204, 204, 0, 0.3);
      transform-style: preserve-3d;
    }

    .ring-1 {
      animation: rotateX 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }

    .ring-2 {
      animation: rotateY 2s cubic-bezier(0.55, 0, 0.45, 1) infinite;
      width: 36px;
      height: 36px;
      top: -2px;
      left: -2px;
      border-color: rgba(204, 204, 0, 0.5);
    }

    .ring-3 {
      animation: rotateXY 3s cubic-bezier(0.7, 0, 0.3, 1) infinite;
      width: 40px;
      height: 40px;
      top: -4px;
      left: -4px;
      border-color: rgba(204, 204, 0, 0.3);
    }

    @keyframes rotateX {
      0% {
        transform: rotateX(0deg);
      }

      50% {
        transform: rotateX(180deg);
      }

      100% {
        transform: rotateX(360deg);
      }
    }

    @keyframes rotateY {
      0% {
        transform: rotateY(0deg);
      }

      50% {
        transform: rotateY(180deg);
      }

      100% {
        transform: rotateY(360deg);
      }
    }

    @keyframes rotateXY {
      0% {
        transform: rotateX(0deg) rotateY(0deg);
      }

      50% {
        transform: rotateX(90deg) rotateY(180deg);
      }

      100% {
        transform: rotateX(360deg) rotateY(360deg);
      }
    }

    @keyframes pulse {

      0%,
      100% {
        transform: translate(-50%, -50%) rotate(30deg) scale(1);
        box-shadow: 0 0 25px rgba(204, 204, 0, 0.5);
      }

      50% {
        transform: translate(-50%, -50%) rotate(30deg) scale(1.1);
        box-shadow: 0 0 35px rgba(204, 204, 0, 0.7);
      }
    }

    &.active {
      .sphere-tennis {
        background-color: #1267b6;
        background: radial-gradient(ellipse at center, #1267b6 0%, darken(#1267b6, 15) 100%);
      }

      .ring {
        border-color: rgba(28, 94, 155, 0.7);
        box-shadow: 0 0 20px rgba(28, 94, 155, 0.5);
      }
    }
  }



}
</style>