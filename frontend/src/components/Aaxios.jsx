import axios from 'axios';

/**
 * mathod => get, post, put
 * get => url, header
 * post, put => url, data, header
 * headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` }
 */
const fetchAuth = async (fetchData) => {
    const method = fetchData.method;
    const url = fetchData.url;
    const data = fetchData.data;
    const header = fetchData.header == undefined ? "headers: { 'Content-Type': 'application/json' }" : fetchData.header;
    

      const response =
        (method === 'get' && (await axios.get(url, header))) ||
        (method === 'post' && (await axios.post(url, data, header))) ||
        (method === 'put' && (await axios.put(url, data, header)))
      ;
    return response;
  }
  
  const GET = ( url, header ) => {
    const response = fetchAuth({ method: 'get', url, header });
    return response;
  };
  
  const POST = async ( url, data, header ) => {
    const response = await fetchAuth({ method: 'post', url, data, header });
    return response;
  };
  
  const PUT = async ( url, data, header ) => {
    const response = fetchAuth({ method: 'put', url, data, header });
    return response;
  };

  /**
   * @returns " YYYY.MM.DD HH:MM "의 날짜 형식으로 반환
   */
  const toFormatDate = (dateStr) => {
    const temp = new Date(dateStr);
    const year = temp.getFullYear();
    let month = temp.getMonth() + 1;
    month = month <= 9 ? "0" + month : month; 
    const date = temp.getDate();
    let hour = temp.getHours();
    hour = hour <= 9 ? "0" + hour : hour; 
    let minute = temp.getMinutes();
    minute = minute <= 9 ? "0" + minute : minute; 

    return `${year}.${month}.${date} ${hour}:${minute}`;
  }

  
  /**
   * @param {Map} info 
   * @param {String} info.name
   * @param {int} info.amount
   * @param {String} info.uEmail
   * @param {String} info.uName
   * @param {String} info.uPhone
   * @param {String} info.uAddress
   * @param {String} info.uAddressDetail
   * @param {String} info.zipCode
   * @param {Function} func -> callback 함수
   */
  function requestPay(info) {

    var IMP = window.IMP; 
    IMP.init("imp55171728");
  
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();
    var hours = today.getHours(); // 시
    var minutes = today.getMinutes();  // 분
    var seconds = today.getSeconds();  // 초
    var milliseconds = today.getMilliseconds();
    var makeMerchantUid = d +""+ hours +""+  minutes +""+ seconds +""+ milliseconds +""+ y +""+ m;

    const data = {
      pg : 'kcp.{INIpayTest}',
      pay_method : 'card',
      merchant_uid: "IMP" + makeMerchantUid, 
      display: {
        card_quota: [3]  // 할부개월 3개월까지 활성화
      },

      // 작성해서 전달해줘야하는 값
      // 사용자 정보
      buyer_email : info.userInfo.email,
      buyer_name : info.userInfo.name,
      buyer_tel : info.userInfo.phone,
      buyer_addr : info.userInfo.address + " " + info.userInfo.address_detail,
      buyer_postcode : info.userInfo.zipCode,
      user_no : info.userInfo.no,
      // 물품 정보
      name : info.name,
      amount : info.price,
      pd_type : info.pd_type,
      pd_no : info.pd_no,
      pd_cnt : info.pd_cnt
    };

    const tempData = {
      pay_method : 'card',
      merchant_uid: "IMP" + makeMerchantUid, 
      buyer_email : info.userInfo.email,
      buyer_name : info.userInfo.name,
      buyer_tel : info.userInfo.phone,
      buyer_addr : info.userInfo.address + " " + info.userInfo.address_detail,
      buyer_postcode : info.userInfo.zipCode,
      user_no : info.userInfo.no,
      // 물품 정보
      name : info.name,
      amount : info.price,
      pd_type : info.pd_type,
      pd_no : info.pd_no,
      pd_cnt : info.pd_cnt
    }

    const saleYn = {saleYn: "Y"}

    let result;
    IMP.request_pay(data, (rsp) => {
      if (rsp.success) {
        result = true;
        console.log(rsp);
        POST("/api/orders/add", tempData)
        if(data.pd_type == "R"){
          PUT(`/api/campaign/${data.pd_no}/sale`, saleYn)
        }
        if(data.pd_type == "G"){
          PUT(`/api/goods/${data.pd_no}/sale`)
        }
        alert("결제가 완료되었습니다.");
      } else {
        result = false;
        console.log(rsp);
        POST("/api/orders/add", tempData)
        if(data.pd_type == "R"){
          PUT(`/api/campaign/${data.pd_no}/sale`, saleYn)
        }
        if(data.pd_type == "G"){
          PUT(`/api/goods/${data.pd_no}/sale`)
        }
        alert("결제가 완료되었습니다.");
      };
    });

    return { data : data, result: result };
  };

//   function (rsp) { // callback
//     if (rsp.success) {
//         console.log(rsp);
//     } else {
//         console.log(rsp);
//     }
// }

export { GET, POST, PUT, toFormatDate, requestPay };