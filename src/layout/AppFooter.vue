<template>
  <footer>
    <div class="tabs">
      <input type="radio" id="radio-1" name="tabs">
      <label class="tab" for="radio-1" @click="selectTab('person_add')">
        <span class="material-symbols-outlined">
          person_add
        </span>
      </label>

      <input type="radio" id="radio-2" name="tabs" checked>
      <label class="tab" for="radio-2" @click="selectTab('home')">
        <div class="mainBtn-container" :class="{ active: selectedTab === 'home' }">
          <div class="sphere-core"></div>
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
    return {
      selectedTab: 'home'
    }
  },
  methods: {
    selectTab(name) {
      this.selectedTab = name
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

    .sphere-core {
      position: absolute;
      width: 24px;
      height: 24px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle at 40% 40%, #00eaff, #0066ff);
      border-radius: 50%;
      box-shadow: 0 0 25px rgba(0, 234, 255, 0.5);
      animation: pulse 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }

    .ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 234, 255, 0.7);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(0, 234, 255, 0.3);
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
      border-color: rgba(0, 234, 255, 0.5);
    }

    .ring-3 {
      animation: rotateXY 3s cubic-bezier(0.7, 0, 0.3, 1) infinite;
      width: 40px;
      height: 40px;
      top: -4px;
      left: -4px;
      border-color: rgba(0, 234, 255, 0.3);
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
        transform: translate(-50%, -50%) scale(1);
        box-shadow: 0 0 25px rgba(0, 234, 255, 0.5);
      }

      50% {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 0 35px rgba(0, 234, 255, 0.7);
      }
    }

    &.active {
      .sphere-core {
        background: radial-gradient(circle at 40% 40%, #6669ff, #001aff);
        box-shadow: 0 0 35px rgba(105, 102, 255, 0.7);
      }

      .ring {
        border-color: rgba(105, 102, 255, 0.7);
        box-shadow: 0 0 20px rgba(102, 105, 255, 0.5);
      }
    }
  }



}
</style>