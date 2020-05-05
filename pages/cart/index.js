Page({
  data: {
    tabs:[
      {
        id:0,
        name:"Lpick",
        isActive:true
      },
      {
        id:1,
        name:"Forum",
        isActive:false
      }
    ]
  },
  handleItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs});
  }
})