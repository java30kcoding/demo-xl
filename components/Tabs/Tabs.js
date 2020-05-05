// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  //  aaa:{
  //    type:String,
  //    value:""
  //  }
      tabs:{
        type:Array,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      /*
      //获取索引
      const {index} = e.currentTarget.dataset;
      //获取data数组
      let {tabs} = this.data;
      //循环数组
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      this.setData({tabs})
     //console.log(e);
     */

    const {index} = e.currentTarget.dataset;
    this.triggerEvent("itemChange",{index});
    }
  }
})
