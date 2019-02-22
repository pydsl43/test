<template>
  <div class="home">
    <van-tabs v-model="active" type="card" sticky @click="tabChange">
      <van-tab v-for="item in articalGames" v-bind:key="item.name" :title="item.name"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="readmore"
        class="artical-list"
      >
        
          <van-cell
            v-for="item in list"
            class="artical-item van-hairline--top-bottom clearfix"
          >
          <a :href="'https://www.zbt.com/article/' + item.id + '.html'" >
            <img :src="item.image_url" alt="">
              <div class="fr title">
                <p class="van-ellipsis">{{ item.title }}</p>
                <div>
                  {{ item.overview }}
                </div>
              </div>
            </a>
          </van-cell>
        
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      res: {},
      params: {
        page: 1,
        limit: 20,
        category_id: '',
        
      },
      loading: false,
      finished: false,
      list: [],
      articalGames: [
        {name:'全部','appid': 1, category_id: ''},
        {name:'DOTA2','appid': 570, category_id: 2},
        {name:'CSGO','appid': 730, category_id: 1},
        {name:'H1Z1','appid': 438080, category_id: 5},
      ],
      active: 0
    }
  },
  created() {
    console.log(this.$api.getArticalList(this.params))
    
    this.getList()
    // this.$api.getUserInfo().then(
    //   res => {
    //     console.log(res)
    //   }
    // )
  },
  methods: {
    tabChange (index) {
      this.list = []
      this.params.page = 1
      this.params.category_id = this.articalGames[index].category_id
      this.getList()
    },
    refresh () {
      this.params.page = 1
      this.getList()
    },
    readmore () {
      this.params.page += 1
      this.getList()
    },
    getList () {
      var self = this
      self.loading = true
      self.$api.getArticalList(self.params).then(
        res => {
          self.res = res.data.data
          self.list = self.list.concat(res.data.data.list)
          self.loading = false
          if (self.list.length >= res.data.data.count * 1) {
            self.finished = true
          } else {
            self.finished = false
          }
        }
      )
    }
  },
}
</script>

<style lang="scss">
  .home {
    background: #1B1F2B;
    height:100%;
    padding-top:0.2rem;
    .artical-list {
      padding:0 0.2rem;
      
      .artical-item {
        // margin-top: 0.1rem;
        // margin-bottom: 0.1rem;
        border-bottom: 1px solid #454a60 !important;
        background: transparent !important;
        img {
          width: 2.6rem;
          height:1.62rem;
        }
        .title {
          width: 4rem;
          p {
            padding-top: 0.1rem;
            max-height: 0.5rem;
            margin-bottom: 0.2rem;
            color: #fff;
          }
          div {
            max-height:1rem;
            font-size: 12px;
            color: gray;
          }
        }
      }
    }
  }
  // .fl {
  //   float: left !important;
  // }
</style>
