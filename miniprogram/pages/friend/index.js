// pages/friend/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
  },
  // 监听用户滑动页面事件。
  onPageScroll(e) {
    // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
    // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
    this.setData({
      scrollTop: e.scrollTop,
    });
  },
  onSearch(e) {
    const searchVal = e.detail
    this.loadData({ searchValue: searchVal });
  },
  onFriendClick(e) {
    wx.navigateTo({
      url: `/pages/friend/details/index?id=${e.detail.id}`,
    });
  },
  onAdd() {
    wx.navigateTo({
      url: "/pages/friend/edit/index",
    });
  },
  async loadData(parameter = {}) {
    const child = this.selectComponent('#index-bar');
    child.loadData(parameter)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    await wx.$api.ok()
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: "可能是东半球最好用的人情记账工具",
      path: "pages/start/index",
      imageUrl: "/static/img/share.png",
    };
  },
});
