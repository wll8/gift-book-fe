// pages/index/index.js
const bookService = require('@/services/book');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    keyword: '',
    pageNo: 0,
    giftBooks: [],
    showBookAction: false,
    bookActions: [
      {
        name: '编辑',
      },
      {
        name: '删除',
        subname: '该礼簿所有来往记录都将被删除',
      },
    ],
    bookActionDetail: {},
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
  onSearch() {
    wx.showToast({
      title: '搜索...马上写完，真的',
      icon: 'none',
    });
  },
  // 添加收礼
  onAddGift() {
    wx.navigateTo({
      url: '/pages/giftReceive/edit/index',
    });
  },
  // 添加礼簿
  onAddBook() {
    wx.navigateTo({
      url: '/pages/book/edit/index',
    });
  },
  // 点击礼簿
  onBookClick(e) {
    wx.navigateTo({
      url: `/pages/book/details/index?id=${e.currentTarget.dataset.book.id}`,
    });
  },
  // 长按礼簿
  onBookLongPress(e) {
    this.setData({
      showBookAction: true,
      bookActionDetail: e.currentTarget.dataset.book,
    });
  },
  // 长按礼簿-关闭
  onCloseBookAction() {
    this.setData({
      showBookAction: false,
    });
  },
  // 长按礼簿-动作
  onSelectBookAction(event) {
    const that = this;
    switch (event.detail.name) {
      case '删除':
        wx.showModal({
          title: '删除礼簿？',
          content: '该礼簿所有来往记录都将被删除，确定删除？',
          async success(result) {
            if (result.confirm) {
              const [err, res] = await bookService.deleteBook(that.data.bookActionDetail.id);
              if (!err) {
                that.loadData(1);
                wx.showToast({
                  title: '删除成功',
                });
              }
            }
          },
        });
        break;
      case '编辑':
        console.log(that.data.actionId);
        wx.navigateTo({
          url: `/pages/book/edit/index?id=${that.data.bookActionDetail.id}`,
        });
        break;
      default:
        break;
    }
  },
  // 计算礼簿收礼金额
  computeTotal(datas) {
    return datas.map((i) => {
      i.giftCount = i.giftList.length || 0;
      i.giftTotal = i.giftList.reduce(
        (total, item) => total + Number(item.money),
        0
      );
      return i;
    });
  },
  // 加载数据
  async loadData(page) {
    const [err, res] = await bookService.getBookPage({
      page,
    });
    const giftBooks = res.results
    this.setData({
      giftBooks,
      pageNo: page,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadData(1)
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
  onReachBottom() {
    this.loadData(this.data.pageNo + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '可能是东半球最好用的人情记账工具',
      path: 'pages/start/index',
      imageUrl: '/static/img/share.png',
    };
  },
});
