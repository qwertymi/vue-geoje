import { createStore } from 'vuex'
import axios from 'axios'

// vuex 는 데이터를 보관하고, 
// 업데이트 한 이후에 
// 컴포넌트에서 필요로 한 데이터를 참조한다. 
// 공통 데이터 저장소(state)

export default createStore(
  {
    // 데이터
    state: {
      menuDataArr: [],
      visualDataArr: [],
      galleryDataArr: [],
      movieData: {},
      erumDataArr:[],
      policyDataArr:[],
      bannerDataArr:[]
    },

    // 외부 json 및 서버연동
    // axios 호출 시점
    // mutation 을 commit 으로 호출하면서 데이터를 전달한다.
    actions: {
      fetchGetMenu({commit}){
        axios.get('./data/menu.json')
        .then(res => {
          commit('UPDATE_MENU_DATA', res.data);
        })
        .catch(err => console.log(err));
      },
      fetchGetVisual({commit}){
        axios.get('./data/visual.json')
        .then(res => {
          commit('UPDATE_VISUAL_DATA', res.data);
        })
        .catch(err => console.log(err));
      },
      fetchGetGallery({commit}){
        axios.get('./data/gallery.json')
        .then(res => {
          commit('UPDATE_GALLERY_DATA', res.data);
        })
        .catch(err => console.log(err));
      },
      fetchGetMovie({commit}){
        axios.get('./data/movie.json')
        .then(res => {
          commit('UPDATE_MOVIE_DATA', res.data);
        })
        .catch(err => console.log(err));
      },
      fetchGetErum({commit}){
        axios.get('./data/erumnews.json')
        .then(res => {
          commit('UPDATE_ERUM_DATA', res.data);
        })
        .catch(err => console.log(err));
      },
      fetchGetPolicy({commit}){
        axios.get('./data/policynews.json')
        .then(res => {
          commit('UPDATE_POLICY_DATA', res.data);
        })
        .catch(err => console.log(err));
      },
      fetchGetBanner({commit}){
        axios.get('./data/banner.json')
        .then(res => {
          commit('UPDATE_BANNER_DATA', res.data);
        })
        .catch(err => console.log(err));
      }
    },

    // actions 로 부터 데이터를 전송받고 state 를 업데이트한다.
    mutations: {
      UPDATE_MENU_DATA(state, payload){
        state.menuDataArr = payload
      },
      UPDATE_VISUAL_DATA(state, payload){
        state.visualDataArr = payload
      },
      UPDATE_GALLERY_DATA(state, payload){
        state.galleryDataArr = payload
      },
      UPDATE_MOVIE_DATA(state, payload){
        state.movieData = payload
      },
      UPDATE_ERUM_DATA(state, payload){
        state.erumDataArr = payload
      },
      UPDATE_POLICY_DATA(state, payload){
        state.policyDataArr = payload
      },
      UPDATE_BANNER_DATA(state, payload){
        state.bannerDataArr = payload
      }

    },

    // 외부 컴포넌트에서 state 를 참조할때 활용
    // state 가 바뀌면 즉시 반영을 위해서 외부 컴포넌트는 
    // computed 로 처리하는 것이 일반적.
    getters: {
      menuData(state){
        return state.menuDataArr
      },
      visualData(state){
        return state.visualDataArr
      },
      galleryData(state){
        return state.galleryDataArr
      },
      movieData(state){
        return state.movieData
      },
      erumData(state){
        return state.erumDataArr
      },
      policyData(state){
        return state.policyDataArr
      },
      bannerData(state){
        return state.bannerDataArr
      }
    }
  }
)