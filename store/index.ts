import { defineStore, _ActionsTree, _GettersTree } from "pinia";
import { getUserPropertyByAccount } from '@/api/user'


export interface State {
  userInfo: object
}

const initState: State = {
  userInfo: {}
}

const getters: _GettersTree<State> = {
  getUserInfo: (state) => state.userInfo,
}

const useStore = defineStore("main", {
  state : () => initState,
  getters,
  actions: {
    // addOne() {
    //   this.count++; // 就像使用vue的data一樣
    // },
    async setUserInfo() {
      const localTestAccount = 'tiya12345'
      try {
        const res = await getUserPropertyByAccount(localTestAccount)
        this.userInfo = res['data'][0]
      } catch (error) {
        console.debug(error)
      }
    }
  }
})

export default useStore

// export const useCounterStore = defineStore('counter', () => {
//   const userInfo = ref({})
//   // const name = ref('Eduardo')
//   // const doubleCount = computed(() => count.value * 2)
//   const setUserInfo = async () => {
    // const localTestAccount = 'tiya12345'
    // try {
    //   const res = await getUserPropertyByAccount(localTestAccount)
    //   userInfo.value = res
    // } catch (error) {
    //   console.debug(error)
    // }
//   }

//   return { userInfo, setUserInfo }
// })
