<template>
  <section class="visual">
    <!-- {{visualData}} -->

      <!-- Swiper -->  
      <Swiper
      class="sw-visual"
      :modules="modules"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }"
      :loop="true"
      :pagination="{
        el: '.sw-visual-pg',
        clickable: 'true'
        }"
      :effect="'fade'"
      @swiper="swVisual"
      >
      
        <SwiperSlide v-for="(item, index) in visualData" :key="index" class="swiper-slide">
          <a :href="item.link"
          :style="{
            backgroundImage:`url(${ resW ? item.imgurl : item.mb_imgurl })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
          :data-bg-mb="item.mb_imgurl"
          :data-bg="item.imgurl"
          >
          </a>
        </SwiperSlide>


        <div class="sw-visual-control">
          <div class="sw-visual-pg"></div>
          <button class="sw-visual-bt">
            <span class="material-icons-outlined" @click="controlSlide">
              {{slideState}}
            </span>
          </button>
        </div>

      </Swiper>

    </section>
</template>

<script>
import {computed, onMounted, ref} from 'vue'

import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, Pagination, EffectFade} from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import {useStore} from 'vuex'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup(){
    // visualData 를 받아오고 :style 로 구현
    const store = useStore();
    const visualData = computed(() => store.getters.visualData)

    const slide = ref(null);
    const swVisual = (swiper) => {
      slide.value = swiper;
      slide.value.slideTo(1); 
    }
    const slideState = ref('pause');
    const controlSlide = () => {
      if(slide.value.autoplay.running == true){
        slide.value.autoplay.stop();
        slideState.value = 'play_arrow'
      }else{
        slide.value.autoplay.start();
        slideState.value = 'pause'
      }
    }

      // 현재 1400보다 크면 true, 작으면 false
      const resW = ref(true);

      onMounted( () => {
        const checkWin = () => {
          let w = window.innerWidth;
          if(w <= 1400) {
            resW.value = false;            
          }else{
            resW.value = true;            
          }
        }
        window.addEventListener('resize', checkWin);
        
        checkWin();
      })


    return{
      modules: [Autoplay,Pagination, EffectFade],
      swVisual,
      controlSlide,
      slideState,

      visualData,
      resW
    }
  }
}
</script>


<style>
/* 비주얼 영역 */
.visual {
  position: relative;
  display: block;
  height: 477px;
}

.sw-visual {
  width: 100%;
  height: 100%;
}

.sw-visual a {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.vs-1 {
  background: url('@/assets/images/banner_1_20200915_0.jpg') no-repeat center;
  background-size: cover;
}

.vs-2 {
  background: url('@/assets/images/banner_2_20200915_0.jpg') no-repeat center;
  background-size: cover;
}

.vs-3 {
  background: url('@/assets/images/banner_4_20200915_0.jpg') no-repeat center;
  background-size: cover;
}

.sw-visual-control {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;

  display: block;
  z-index: 9;
}

.sw-visual-pg .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: #fff;
  opacity: 0.5;
  margin-right: 10px;
}

.sw-visual-pg {
  float: left;
}

.sw-visual-pg .swiper-pagination-bullet-active {
  opacity: 1.0;
}

.sw-visual-bt {
  position: absolute;
  right: -20px;
  width: 23px;
  height: 22px;
  background: transparent;
  /* background: url('@/assets/images/pause.png') no-repeat center; */
  cursor: pointer;
  border: 0;

  font-family: 'Material Icons';
  color: #fff;
  font-size: 10px;
}

.sw-visual-bt-play {
  background: url('@/assets/images/play.png') no-repeat center;
}

/* visual PC 버전 */
/* visual 반응형 버전 */
@media all and (max-width: 1400px) {
  .visual {
    height: 50vw;
  }
}
</style>