let select = document.getElementById("years_select");

// 最大偿还期限设置为30年
let maxRepaymentPeriod = 30


for(let i = 1; i <= maxRepaymentPeriod; i++){
  let opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i + "年" + i * 12 + "期";
  select.appendChild(opt);
}


// 全局定义过滤器:价钱单位
Vue.filter('yuan',function (val,unit) {
  if(unit == 'wan')
    return val + '万元';
  else 
    return val + '元';
})

// 设置$echarts
Vue.prototype.$echarts = echarts;

// 创建Vue实例：房贷计算器
let calculator = new Vue({
  // 指定当前Vue实例为id选择器calculator服务
  el: '#calculator',
  // data存储数据，由calculator使用
  data(){
    return{
        // 房产价格
        housePrice: '',
    
        // 首付比例默认值设为30%
        downPaymentRatio: 30,
    
        // 公积金贷款金额   
        providentFundLoanAmount: '',
    
        // 公积金贷款利率 默认设置为3.25
        providentFundLoanRate: 3.25,
    
        // 商业贷款金额
        commercialLoanAmount: '',
    
        // 商业贷款利率 默认设置为4.9
        commercialLoanRate: 4.9,
    
        // 贷款年限 默认设置为3年36期
        loanPeriod: 3,
    
        /* 两种不同的贷款方式:
            1.等额本息equal loan payment  以下用ELP简写
            2.等额本金equal principal payment  以下用EPP简写
           默认值设为 ELP
        */
        repayType: 'ELP',
    
        /* 每月数据集合 */
        monthdataArray: [],
    
        /* 贷款类型 默认设置为组合贷款syndicated
          另外有公积金贷款provident  商业贷款commercial */
        typeOfLoan: 'syndicated', 
    
        option:{
            title:{
                // 为图表添加一个标题
                text:'还贷方案可视化'
            },
            tooltip:{
              trigger: 'axis', // 鼠标悬浮会有竖线
            },
            legend:{ 
              // 设置区分（哪条线属于什么）
              data: ['monthlyInterest', 'monthlyPrincipal', 'monthlyPayment','remindingPayments']
            },
            dataset: {
            // 提供一份数据。
                dimesions:['order', 'monthlyInterest', 'monthlyPrincipal', 'monthlyPayment','remindingPayments'],
                source:[
                   {order: 1, monthlyInterest: '25833.33', monthlyPrincipal: '182179.80', monthlyPayment: '208013.13', remindingPayments: '7280459.56'},
 {order: 2, monthlyInterest: '25162.26', monthlyPrincipal: '182850.87', monthlyPayment: '208013.13', remindingPayments: '7072446.43'},
 {order: 3, monthlyInterest: '24488.65', monthlyPrincipal: '183524.48', monthlyPayment: '208013.13', remindingPayments: '6864433.30'},
 {order: 4, monthlyInterest: '23812.48', monthlyPrincipal: '184200.65', monthlyPayment: '208013.13', remindingPayments: '6656420.17'},
 {order: 5, monthlyInterest: '23133.75', monthlyPrincipal: '184879.38', monthlyPayment: '208013.13', remindingPayments: '6448407.04'},
 {order: 6, monthlyInterest: '22452.44', monthlyPrincipal: '185560.69', monthlyPayment: '208013.13', remindingPayments: '6240393.91'},
 {order: 7, monthlyInterest: '21768.56', monthlyPrincipal: '186244.57', monthlyPayment: '208013.13', remindingPayments: '6032380.78'},
 {order: 8, monthlyInterest: '21082.08', monthlyPrincipal: '186931.05', monthlyPayment: '208013.13', remindingPayments: '5824367.65'},
 {order: 9, monthlyInterest: '20393.00', monthlyPrincipal: '187620.13', monthlyPayment: '208013.13', remindingPayments: '5616354.52'},
 {order: 10, monthlyInterest: '19701.31', monthlyPrincipal: '188311.82', monthlyPayment: '208013.13', remindingPayments: '5408341.39'},
 {order: 11, monthlyInterest: '19006.99', monthlyPrincipal: '189006.14', monthlyPayment: '208013.13', remindingPayments: '5200328.26'},
 {order: 12, monthlyInterest: '18310.04', monthlyPrincipal: '189703.09', monthlyPayment: '208013.13', remindingPayments: '4992315.13'},
 {order: 13, monthlyInterest: '17610.45', monthlyPrincipal: '190402.68', monthlyPayment: '208013.13', remindingPayments: '4784302.00'},
 {order: 14, monthlyInterest: '16908.20', monthlyPrincipal: '191104.93', monthlyPayment: '208013.13', remindingPayments: '4576288.87'},
 {order: 15, monthlyInterest: '16203.29', monthlyPrincipal: '191809.84', monthlyPayment: '208013.13', remindingPayments: '4368275.74'},
 {order: 16, monthlyInterest: '15495.71', monthlyPrincipal: '192517.42', monthlyPayment: '208013.13', remindingPayments: '4160262.60'},
 {order: 17, monthlyInterest: '14785.44', monthlyPrincipal: '193227.69', monthlyPayment: '208013.13', remindingPayments: '3952249.47'},
 {order: 18, monthlyInterest: '14072.47', monthlyPrincipal: '193940.66', monthlyPayment: '208013.13', remindingPayments: '3744236.34'},
 {order: 19, monthlyInterest: '13356.80', monthlyPrincipal: '194656.33', monthlyPayment: '208013.13', remindingPayments: '3536223.21'},
 {order: 20, monthlyInterest: '12638.42', monthlyPrincipal: '195374.71', monthlyPayment: '208013.13', remindingPayments: '3328210.08'},
 {order: 21, monthlyInterest: '11917.31', monthlyPrincipal: '196095.82', monthlyPayment: '208013.13', remindingPayments: '3120196.95'},
 {order: 22, monthlyInterest: '11193.46', monthlyPrincipal: '196819.67', monthlyPayment: '208013.13', remindingPayments: '2912183.82'},
 {order: 23, monthlyInterest: '10466.87', monthlyPrincipal: '197546.26', monthlyPayment: '208013.13', remindingPayments: '2704170.69'},
 {order: 24, monthlyInterest: '9737.51', monthlyPrincipal: '198275.62', monthlyPayment: '208013.13', remindingPayments: '2496157.56'},
 {order: 25, monthlyInterest: '9005.39', monthlyPrincipal: '199007.74', monthlyPayment: '208013.13', remindingPayments: '2288144.43'},
 {order: 26, monthlyInterest: '8270.49', monthlyPrincipal: '199742.64', monthlyPayment: '208013.13', remindingPayments: '2080131.30'},
 {order: 27, monthlyInterest: '7532.80', monthlyPrincipal: '200480.33', monthlyPayment: '208013.13', remindingPayments: '1872118.17'},
 {order: 28, monthlyInterest: '6792.30', monthlyPrincipal: '201220.83', monthlyPayment: '208013.13', remindingPayments: '1664105.04'},
 {order: 29, monthlyInterest: '6049.00', monthlyPrincipal: '201964.13', monthlyPayment: '208013.13', remindingPayments: '1456091.91'},
 {order: 30, monthlyInterest: '5302.87', monthlyPrincipal: '202710.26', monthlyPayment: '208013.13', remindingPayments: '1248078.78'},
{order: 31, monthlyInterest: '4553.91', monthlyPrincipal: '203459.22', monthlyPayment: '208013.13', remindingPayments: '1040065.65'},
 {order: 32, monthlyInterest: '3802.10', monthlyPrincipal: '204211.03', monthlyPayment: '208013.13', remindingPayments: '832052.52'},
 {order: 33, monthlyInterest: '3047.44', monthlyPrincipal: '204965.69', monthlyPayment: '208013.13', remindingPayments: '624039.39'},
    {order: 34, monthlyInterest: '2289.90', monthlyPrincipal: '205723.23', monthlyPayment: '208013.13', remindingPayments: '416026.26'},
    {order: 35, monthlyInterest: '1529.50', monthlyPrincipal: '206483.63', monthlyPayment: '208013.13', remindingPayments: '208013.13'},
    {order: 36, monthlyInterest: '766.20', monthlyPrincipal: '207246.93', monthlyPayment: '208013.13', remindingPayments: '0.00'},
                  
                ]
            },
            xAxis: {
              // 设置x轴
              type:'category',
            },
            yAxis: {},
            series:[
              {
                type: 'line',
                smooth:true,
                areaStyle: {}
              },
              {
                type: 'line',
                smooth:true,
                areaStyle: {}
              },
              {
                type: 'line',
                smooth:true,
                areaStyle: {}
              },
              {
                type: 'line',
                smooth:true,
                areaStyle: {}
              },
            ]
        }
    }
  },
  watch:{ // 监听属性
    
    /* 贷款总额totalLoan = 房价housePrice - 首付downPayments 
                         = 公积金贷款providentFundLoanAmount + 商业贷款commercialLoanAmount*/
    typeOfLoan: function () {
      if (this.typeOfLoan=='commercial'){
        this.providentFundLoanAmount=0;
        this.commercialLoanAmount=this.totalLoan;
      }else if (this.loanType=='provident') {
        this.commercialLoanAmount=0;
        this.providentFundLoanAmount=this.totalLoan;
      }
    },
    providentFundLoanAmount:function () {
      if (this.typeOfLoan == 'syndicated') 
      {
        // 组合贷款模式
        if (this.providentFundLoanAmount) 
        {
          (this.commercialLoanAmount = this.totalLoan - this.providentFundLoanAmount).toFixed(2);
          if(this.commercialLoanAmount <= 0)
            this.commercialLoanAmount = 0;
        }
      }
    },
    commercialLoanAmount:function () {
      if (this.typeOfLoan=='syndicated'){
        if (this.commercialLoanAmount){
          (this.providentFundLoanAmount = this.totalLoan - this.commercialLoanAmount).toFixed(2);
          if(this.providentFundLoanAmount <= 0)
            this.providentFundLoanAmount = 0;
        }
      }
    },

    dataList() {    
      this.getChartData(); // 当数据变化时重新赋值图线
    }
  },
  computed: {
    // 首付 = 房价 * 首付比例
    downPayments:function(){
      return this.housePrice * this.downPaymentRatio / 100;
    },
    // 贷款总额 = 房价 - 首付 = 公积金贷款 + 商业贷款
    totalLoan: function () {
      return (this.housePrice - this.downPayments).toFixed(2)
    },
    // 将贷款年限换算为月份
    month: function () {
      return this.loanPeriod*12;
    },

    highestMonthlyPayment: function () {
      switch (this.repayType) {
        case 'ELP':
          return this.ELP_MonthlyPay()[0].monthlyPayment; 
        case 'EPP':
          return this.EPP_monthlyPay()[0].monthlyPayment; 
      }
    },
    totalPay: function () {
      switch (this.repayType) {
        case 'ELP':
          return this.ELP_totalPayments();
        case 'EPP':
          return this.EPP_totalPayments();
      }
    },
  },
  mounted () {
    this.chartChange()
  },
  // calculator的方法属性
  methods: {
    // 月利率
    monthRate: function (type) {
      return this[type + 'LoanRate'] / 100 / 12;
    },

    // 等额本息每月还款
    ELP_MonthPay: function () {
      let commercialMonthPay,providentMonthPay;
      commercialMonthPay = (this.commercialLoanAmount * 10000 * this.monthRate('commercial')* Math.pow((1 + this.monthRate('commercial')),this.month)) / (Math.pow((1 + this.monthRate('commercial')), this.month) - 1);
      providentMonthPay = (this.providentFundLoanAmount * 10000 * this.monthRate('providentFund')* Math.pow((1 + this.monthRate('providentFund')),this.month)) / (Math.pow((1 + this.monthRate('providentFund')), this.month) - 1);
      return commercialMonthPay + providentMonthPay;
    },

    // 等额本息每月利息
    ELP_monthlyInterest: function (count) {
      let commercial_ELP_monthlyInterest,provident_ELP_monthlyInterest;
      commercial_ELP_monthlyInterest = this.commercialLoanAmount * 10000 * this.monthRate('commercial') * (Math.pow((1 + this.monthRate('commercial')), this.month) - Math.pow((1 + this.monthRate('commercial')), count - 1)) / (Math.pow((1 + this.monthRate('commercial')), this.month) - 1);
      provident_ELP_monthlyInterest = this.providentFundLoanAmount * 10000 * this.monthRate('providentFund') * (Math.pow((1 + this.monthRate('providentFund')), this.month) - Math.pow((1 + this.monthRate('providentFund')), count - 1)) / (Math.pow((1 + this.monthRate('providentFund')), this.month) - 1);
      return commercial_ELP_monthlyInterest + provident_ELP_monthlyInterest;
    },
    // 等额本息每月需还本金
    ELP_monthlyPrincipal: function (count) {
      // let commercial_ELP_monthlyPrincipal,provident_ELP_monthlyPrincipal;
      let commercial_ELP_monthlyPrincipal = this.commercialLoanAmount * 10000 * this.monthRate('commercial') * Math.pow((1 + this.monthRate('commercial')), count - 1) / (Math.pow((1 + this.monthRate('commercial')), this.month) - 1);
      let provident_ELP_monthlyPrincipal = this.providentFundLoanAmount * 10000 * this.monthRate('providentFund') * Math.pow((1 + this.monthRate('providentFund')), count - 1) / (Math.pow((1 + this.monthRate('providentFund')), this.month) - 1);
      return commercial_ELP_monthlyPrincipal + provident_ELP_monthlyPrincipal;
    },
    // 等额本息每月还款
    ELP_MonthlyPay: function () {
      this.monthdataArray = [];
      
      let monthlyInterest, // 月利息
          monthlyPrincipal, // 月本金
          monthlyPayment, // 月供
          remindingPayments; // 剩余还款

      remindingPayments = this.ELP_totalPayments();
      for (let i = 1; i <= this.month; i++) {
        //每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
        monthlyInterest = this.ELP_monthlyInterest(i);
        //每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
        monthlyPrincipal = this.ELP_monthlyPrincipal(i);
        monthlyPayment  = monthlyInterest + monthlyPrincipal;
        remindingPayments = remindingPayments - monthlyPayment; 
        
        if (remindingPayments < 0) {
                remindingPayments = 0
        }
        
        this.monthdataArray[i-1] = {
          order: i,
          monthlyInterest: monthlyInterest.toFixed(2),
          monthlyPrincipal: monthlyPrincipal.toFixed(2),
          monthlyPayment:  monthlyPayment. toFixed(2),
          remindingPayments: remindingPayments.toFixed(2)
        }
      };
      return this.monthdataArray;
    },
    // 等额本息总还款
    ELP_totalPayments: function () {
      return (this.ELP_MonthPay() * this.month).toFixed(2);
    },

    // 等额本金每月需还本金
    EPP_MonthPay: function () {
      let commercial_EPP_MonthPay,provident_EPP_MonthPay;
      commercial_EPP_MonthPay = this.commercialLoanAmount * 10000 / this.month;
      provident_EPP_MonthPay = this.providentFundLoanAmount * 10000 / this.month;
      return commercial_EPP_MonthPay + provident_EPP_MonthPay;
    },

    // 等额本金每月利息
    EPP_monthlyInterest: function (count) {
      let commercialEPP_monthlyInterest,fundEPP_monthlyInterest;
      commercialEPP_monthlyInterest = (this.commercialLoanAmount * 10000 - this.commercialLoanAmount * 10000 / this.month * (count-1)) * this.monthRate('commercial');
      fundEPP_monthlyInterest = (this.providentFundLoanAmount * 10000 - this.providentFundLoanAmount * 10000 / this.month * (count-1)) * this.monthRate('providentFund');
      return commercialEPP_monthlyInterest + fundEPP_monthlyInterest;
    },

    // 等额本金每月需还本金
    EPP_monthlyPay: function () {
      this.monthdataArray = [];
      let monthlyInterest,
          monthlyPrincipal,
          monthlyPayment, 
          remindingPayments = this.EPP_totalPayments(),
          i=1;

      monthlyPrincipal=this.EPP_MonthPay();
      
      for (i; i <= this.month; i++){
        monthlyInterest = this.EPP_monthlyInterest(i);
        monthlyPayment  = monthlyPrincipal + monthlyInterest;
        remindingPayments = remindingPayments - monthlyPayment; 
        if (remindingPayments < 0 )
          remindingPayments = 0 ;
        this.monthdataArray[i-1]={
          order: i,
          monthlyInterest: monthlyInterest.toFixed(2),
          monthlyPrincipal: monthlyPrincipal.toFixed(2),
          monthlyPayment:  monthlyPayment. toFixed(2),
          remindingPayments: remindingPayments.toFixed(2)
        };
      }
      return this.monthdataArray;
    },

    // 等额本金总利息
    EPP_totalInterest: function () {
      //总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
      let commercialTotalInterest,
          providentTotalInterest;

      commercialTotalInterest = ((this.commercialLoanAmount * 10000 / this.month + this.commercialLoanAmount * 10000 * this.monthRate('commercial')) + this.commercialLoanAmount * 10000 / this.month * (1 + this.monthRate('commercial'))) / 2 * this.month - this.commercialLoanAmount * 10000 ;
      providentTotalInterest = ((this.providentFundLoanAmount * 10000 / this.month + this.providentFundLoanAmount * 10000 * this.monthRate('providentFund')) + this.providentFundLoanAmount * 10000 / this.month * (1 + this.monthRate('providentFund'))) / 2 * this.month - this.providentFundLoanAmount * 10000 ;
      return (commercialTotalInterest + providentTotalInterest).toFixed(2);
    },

    // 等额本金总还款
    EPP_totalPayments: function () {
      let EPP_totalInterest = parseFloat(this.EPP_totalInterest());
      return (this.providentFundLoanAmount * 10000) + (this.commercialLoanAmount * 10000) + EPP_totalInterest;
    },

    // 更新图表数据
    getChartData(){
        myChart.setOption({
          option:{
          dataset:{
            source:this.monthdataArray, // 更新数据
          }},
        })
    },

    // 可视化图标变化函数
    chartChange(){
      const myChart = this.$echarts.init(document.getElementById('charts'));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.$data.option,true);
    }
  }
})



// 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('charts'));

// 指定图表的配置项和数据
// var option = {
//   title:{
//       text:'还贷方案可视化'
//   },
//   legend:{
//     data: ['月还利息', '月还本金', '月供','剩余还款']
//   },
//   dataset: {
//     // 提供一份数据。
//     source: [
//       ['items', '月还利息', '月还本金', '月供','剩余还款'],
      
//     ]
//   },
//   xAxis: {
//     type:'category'
//   },
//   yAxis: {},
//   series: [
//     {
      
//       type: 'line',
      
//       areaStyle: {}
//     },
//     {
      
//       type: 'line',
      
//       areaStyle: {}
//     },
//     {
      
//       type: 'line',
      
//       areaStyle: {}
//     },{
      
//       type: 'line',
      
//       areaStyle: {}
//     }
//   ]
// };

// 使用刚指定的配置项和数据显示图表。
// myChart.setOption(option);